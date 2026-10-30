"""Validate five fully read packets and extend the frozen chapter-1000 seed.

Run only after chapters-1000.json is frozen from the completed earlier integration.
This writes separate milestone/profile aggregates and never rewrites 301–1000 packets.
"""
import json
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORY = ROOT / "lib/story"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def integrate():
    hashes = read(STORY / "legacy/chapters-1000-sources.json")
    for name, expected in hashes.items():
        assert hashlib.sha256((STORY / name).read_bytes()).hexdigest() == expected, f"Chapter-1000 source changed since freeze: {name}"
    baseline = read(STORY / "legacy/chapters-1000.json")
    assert max(ch for node in baseline["nodes"] for ch in node.get("chapters", [])) == 1000
    packets = []
    for start in range(1001, 1500, 100):
        end = start + 99
        evidence = read(ROOT / f"docs/story/chapter-notes-{start}-{end}.json")["chapters"]
        packet = read(STORY / f"extensions/{start}-{end}.json")
        expected = list(range(start, end + 1))
        assert [item["chapter"] for item in evidence] == expected, f"Missing evidence {start}"
        assert all(item.get("readFully") for item in evidence), f"Unread evidence {start}"
        assert [item["chapter"] for item in packet["chapters"]] == expected, f"Missing summaries {start}"
        for item in packet["chapters"]:
            item["title"] = re.sub(r"^Chương\s+\d+\s*:\s*", "", item["title"], flags=re.I)
            assert len(item["summary"].strip()) > 30, f"Empty summary {item['chapter']}"
        for key in ["realms", "soul", "profileEvents", "titleEvents", "systemEvents", "controlEvents"]:
            for item in packet[key]:
                assert start <= item["chapter"] <= end, (key, item)
                if key not in ["realms", "soul"]:
                    assert item.get("paragraphs"), (key, item)
                if key in ["profileEvents", "titleEvents"] and item["operation"] == "upsert":
                    fields = ["id", "name", "tag", "kind", "description"] if key == "profileEvents" else ["id", "name", "skill", "description"]
                    assert all(item.get(field) for field in fields), (key, item)
        for update in packet["missionUpdates"]:
            for item in update["events"] + update.get("facts", []):
                assert start <= item["chapter"] <= end, ("mission", item)
        packets.append(packet)

    chapters = [item for item in read(STORY / "chapter-notes.json") if item["chapter"] <= 1000]
    chapters += [item for packet in packets for item in packet["chapters"]]
    assert [item["chapter"] for item in chapters] == list(range(1, 1501))
    milestones = [item for packet in packets for item in packet["milestones"]]
    old_ids = {node["id"] for node in baseline["nodes"]}
    assert not old_ids.intersection(item["id"] for item in milestones), "Milestone ID collides with previous seed"
    assert len({item["id"] for item in milestones}) == len(milestones), "Duplicate milestone IDs"
    covered = {ch for item in milestones for ch in item.get("chapters", range(item["from"], item["to"] + 1))}
    assert covered == set(range(1001, 1501)), f"Timeline coverage mismatch: {sorted(covered ^ set(range(1001,1501)))}"

    characters = {item["id"]: {"id": item["id"], "title": item["title"], "chapter": item["chapters"][0], "realm": item["realm"], "summary": item["summary"]} for item in baseline["nodes"] if item["kind"] == "character" and item["id"] != "hero"}
    retired = set(read(STORY / "retired-character-ids.json"))
    for packet in packets:
        for item in packet["characters"]:
            assert item["id"] not in retired, f"Retired character: {item['id']}"
            assert item["id"] not in characters, f"Duplicate character: {item['id']}"
            assert item["id"] not in old_ids, f"Character ID collision: {item['id']}"
            characters[item["id"]] = item.copy()
        for update in packet["characterUpdates"]:
            if update["id"] == "hero":
                continue
            assert update["id"] in characters, f"Unknown character: {update['id']}"
            characters[update["id"]]["summary"] += " " + update["text"]
    for alias in read(STORY / "character-aliases-1001-1500.json"):
        original = characters.pop(alias["from"])
        canonical = characters[alias["to"]]
        canonical["summary"] += f" Chương {alias['chapter']} xác nhận {original['title']} là cùng một người. " + original["summary"]
    for item in characters.values():
        if item["chapter"] > 1000:
            assert any(m["realm"] == item["realm"] and item["chapter"] in m.get("chapters", range(m["from"], m["to"] + 1)) for m in milestones), f"Missing introduction lane: {item['id']}"

    keys = ["realms", "soul", "profileEvents", "missionUpdates", "titleEvents", "systemEvents", "controlEvents"]
    profile = {key: [item for packet in packets for item in packet[key]] for key in keys}
    for key in keys:
        if key != "missionUpdates":
            profile[key].sort(key=lambda item: item["chapter"])
    profile["journal"] = sorted([
        {"chapter": item["to"], "title": item["title"], "description": item["summary"]} for item in milestones
    ], key=lambda item: item["chapter"])

    # No application files change until every packet and cross-packet reference passes.
    write(STORY / "chapter-notes.json", chapters)
    write(STORY / "characters.json", sorted(characters.values(), key=lambda item: item["chapter"]))
    write(STORY / "milestones-1001-1500.json", milestones)
    write(STORY / "war-god-1001-1500.json", profile)
    print(f"Integrated {len(chapters)} chapters; {len(milestones)} new milestones; {len(characters)+1} character profiles including hero")


if __name__ == "__main__":
    integrate()
