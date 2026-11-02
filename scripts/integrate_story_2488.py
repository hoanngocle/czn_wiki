"""Validate all remaining EPUB packets before extending the frozen 1500 seed."""
import hashlib
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORY = ROOT / "lib/story"
LAST = 2488


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def paragraph_count(path):
    body = path.read_text(encoding="utf-8").split('<div class="chapter-text">', 1)[1].split('</div>', 1)[0]
    body = re.sub(r"<(?:br\s*/?|/p)>", "\n", body, flags=re.I)
    return len([line for line in html.unescape(re.sub(r"<[^>]+>", "", body)).splitlines() if line.strip()])


def validate_references(value, counts, chapter=None):
    if isinstance(value, list):
        for item in value:
            validate_references(item, counts, chapter)
    elif isinstance(value, dict):
        chapter = value.get("chapter", chapter)
        if "paragraphs" in value:
            numbers = [int(number) for number in re.findall(r"\d+", value["paragraphs"])]
            assert chapter in counts and numbers and min(numbers) > 0 and max(numbers) <= counts[chapter], ("Invalid source paragraphs", chapter, value)
        for item in value.values():
            if isinstance(item, (dict, list)):
                validate_references(item, counts, chapter)


def integrate():
    for name, expected in read(STORY / "legacy/chapters-1500-sources.json").items():
        # Git checkouts may use CRLF on Windows and LF elsewhere.
        assert hashlib.sha256((STORY / name).read_bytes().replace(b"\r\n", b"\n")).hexdigest() == expected, f"Chapter-1500 source changed since freeze: {name}"
    baseline = read(STORY / "legacy/chapters-1500.json")
    assert max(ch for node in baseline["nodes"] for ch in node.get("chapters", [])) == 1500
    packets = []
    for start in range(1501, LAST + 1, 100):
        end = min(start + 99, LAST)
        evidence = read(ROOT / f"docs/story/chapter-notes-{start}-{end}.json")["chapters"]
        packet = read(STORY / f"extensions/{start}-{end}.json")
        expected = list(range(start, end + 1))
        assert [item["chapter"] for item in evidence] == expected, f"Missing evidence {start}"
        assert all(item.get("readFully") is True for item in evidence), f"Unread evidence {start}"
        assert [item["chapter"] for item in packet["chapters"]] == expected, f"Missing summaries {start}"
        counts = {}
        for item in evidence:
            expected_source = f"public/chu-gioi-tan-the-online/html/chuong-{item['chapter']:04d}.html"
            assert item["source"] == expected_source and (ROOT / expected_source).is_file(), f"Missing source {item['chapter']}"
            counts[item["chapter"]] = paragraph_count(ROOT / expected_source)
        validate_references(evidence, counts)
        validate_references(packet, counts)
        for item in packet["chapters"]:
            item["title"] = re.sub(r"^Chương\s+\d+\s*:\s*", "", item["title"], flags=re.I)
            assert len(item["summary"].strip()) > 30, f"Empty summary {item['chapter']}"
        for key in ["realms", "soul", "profileEvents", "titleEvents", "systemEvents", "controlEvents"]:
            for item in packet[key]:
                assert start <= item["chapter"] <= end, (key, item)
                if key not in ["realms", "soul"]:
                    assert item.get("paragraphs"), (key, item)
                if key in ["profileEvents", "titleEvents"]:
                    assert item["operation"] in (["upsert", "remove", "availability"] if key == "profileEvents" else ["upsert", "remove"]), (key, item)
                    if key == "profileEvents":
                        assert item["section"] in ["skills", "equipment", "inventory"], item
                    if item["operation"] == "upsert":
                        fields = ["id", "name", "tag", "kind", "description"] if key == "profileEvents" else ["id", "name", "skill", "description"]
                        assert all(item.get(field) for field in fields), (key, item)
                        if key == "profileEvents":
                            assert item["kind"] in ["weapon", "material", "manual", "skill"], item
                    elif item["operation"] == "availability":
                        assert type(item.get("available")) is bool and item.get("description"), item
                        for field in ["ids", "exceptIds"]:
                            if field in item:
                                assert isinstance(item[field], list) and all(isinstance(value, str) and value for value in item[field]), item
                    else:
                        assert item.get("id"), item
        for update in packet["missionUpdates"]:
            update.setdefault("facts", [])
            for item in update["events"] + update.get("facts", []):
                assert start <= item["chapter"] <= end, ("mission", item)
        for item in packet["characters"] + packet["characterUpdates"]:
            assert start <= item["chapter"] <= end, ("character", item)
        packets.append(packet)

    chapters = [item for item in read(STORY / "chapter-notes.json") if item["chapter"] <= 1500]
    chapters += [item for packet in packets for item in packet["chapters"]]
    assert [item["chapter"] for item in chapters] == list(range(1, LAST + 1))
    milestones = [item for packet in packets for item in packet["milestones"]]
    old_ids = {node["id"] for node in baseline["nodes"]}
    assert not old_ids.intersection(item["id"] for item in milestones), "Milestone ID collides with previous seed"
    assert len({item["id"] for item in milestones}) == len(milestones), "Duplicate milestone IDs"
    covered = {ch for item in milestones for ch in item.get("chapters", range(item["from"], item["to"] + 1))}
    assert covered == set(range(1501, LAST + 1)), f"Timeline coverage mismatch: {sorted(covered ^ set(range(1501, LAST + 1)))}"
    characters = {item["id"]: {"id": item["id"], "title": item["title"], "chapter": item["chapters"][0], "realm": item["realm"], "summary": item["summary"]} for item in baseline["nodes"] if item["kind"] == "character" and item["id"] != "hero"}
    retired = set(read(STORY / "retired-character-ids.json"))
    milestone_ids = {item["id"] for item in milestones}
    for packet in packets:
        for item in packet["characters"]:
            assert item["id"] not in retired, f"Retired character: {item['id']}"
            assert item["id"] not in characters, f"Duplicate character: {item['id']}"
            assert item["id"] not in old_ids | milestone_ids, f"Character ID collision: {item['id']}"
            characters[item["id"]] = item.copy()
        for update in packet["characterUpdates"]:
            if update["id"] == "hero":
                continue
            assert update["id"] in characters, f"Unknown character: {update['id']}"
            characters[update["id"]]["summary"] += " " + update["text"]
    for item in characters.values():
        if item["chapter"] > 1500:
            assert any(m["realm"] == item["realm"] and item["chapter"] in m.get("chapters", range(m["from"], m["to"] + 1)) for m in milestones), f"Missing introduction lane: {item['id']}"

    keys = ["realms", "soul", "profileEvents", "missionUpdates", "titleEvents", "systemEvents", "controlEvents"]
    profile = {key: [item for packet in packets for item in packet[key]] for key in keys}
    for key in keys:
        if key != "missionUpdates":
            profile[key].sort(key=lambda item: item["chapter"])
    profile["journal"] = sorted([
        {"chapter": item["to"], "title": item["title"], "description": item["summary"]} for item in milestones
    ], key=lambda item: item["chapter"])
    # Validation completes before any application aggregate changes.
    write(STORY / "chapter-notes.json", chapters)
    write(STORY / "characters.json", sorted(characters.values(), key=lambda item: item["chapter"]))
    write(STORY / "milestones-1501-2488.json", milestones)
    write(STORY / "war-god-1501-2488.json", profile)
    print(f"Integrated {len(chapters)} chapters; {len(milestones)} new milestones; {len(characters)+1} character profiles including hero")


if __name__ == "__main__":
    integrate()
