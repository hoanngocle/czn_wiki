"""Validate the seven audited packets, then build the chapter-1000 data files.

Packets are source material curated by readers, not generated from keyword hits.
The frozen chapter-300 graph makes roster updates repeatable without duplicated prose.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORY = ROOT / "lib/story"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def integrate():
    packets = []
    for start in range(301, 1000, 100):
        end = start + 99
        evidence = read(ROOT / f"docs/story/chapter-notes-{start}-{end}.json")["chapters"]
        packet = read(STORY / f"extensions/{start}-{end}.json")
        expected = list(range(start, end + 1))
        assert [item["chapter"] for item in evidence] == expected, f"Missing evidence {start}"
        assert all(item.get("readFully") for item in evidence), f"Unread evidence {start}"
        assert [item["chapter"] for item in packet["chapters"]] == expected, f"Missing summary {start}"
        for item in packet["chapters"]:
            item["title"] = re.sub(r"^Chương\s+\d+\s*:\s*", "", item["title"], flags=re.I)
            assert len(item["summary"].strip()) > 30, f"Empty summary {item['chapter']}"
        for key in ["profileEvents", "titleEvents", "systemEvents", "controlEvents"]:
            for item in packet[key]:
                assert start <= item["chapter"] <= end, (key, item)
                assert item["paragraphs"], (key, item)
                if key in ["profileEvents", "titleEvents"] and item["operation"] == "upsert":
                    required = ["id", "name", "tag", "kind", "description"] if key == "profileEvents" else ["id", "name", "skill", "description"]
                    assert all(item.get(field) for field in required), (key, item)
        packets.append(packet)

    chapters = [item for item in read(STORY / "chapter-notes.json") if item["chapter"] <= 300]
    chapters += [item for packet in packets for item in packet["chapters"]]
    assert [item["chapter"] for item in chapters] == list(range(1, 1001))
    milestones = [item for packet in packets for item in packet["milestones"]]
    assert len({item["id"] for item in milestones}) == len(milestones), "Duplicate milestone IDs"
    covered = {chapter for item in milestones for chapter in item.get("chapters", range(item["from"], item["to"] + 1))}
    assert set(range(301, 1001)) <= covered, f"Missing timeline chapters: {sorted(set(range(301,1001))-covered)}"

    baseline = read(STORY / "legacy/chapters-300.json")
    characters = {item["id"]: {"id": item["id"], "title": item["title"], "chapter": item["chapters"][0], "realm": item["realm"], "summary": item["summary"]} for item in baseline["nodes"] if item["kind"] == "character" and item["id"] != "hero"}
    retired = set(read(STORY / "retired-character-ids.json"))
    for packet in packets:
        for item in packet["characters"]:
            assert item["id"] not in retired, f"Retired character: {item['id']}"
            assert item["id"] not in characters, f"Duplicate character: {item['id']}"
            characters[item["id"]] = item.copy()
        for update in packet["characterUpdates"]:
            # Thanh Son has a separate dated profile, rather than a roster card.
            if update["id"] == "hero":
                continue
            assert update["id"] in characters, f"Unknown character: {update['id']}"
            characters[update["id"]]["summary"] += " " + update["text"]

    keys = ["realms", "soul", "profileEvents", "missionUpdates", "titleEvents", "systemEvents", "controlEvents"]
    profile = {key: [item for packet in packets for item in packet[key]] for key in keys}
    for key in keys:
        if key != "missionUpdates":
            profile[key].sort(key=lambda item: item["chapter"])
    profile["journal"] = sorted([
        {"chapter": item["to"], "title": item["title"], "description": item["summary"]} for item in milestones
    ], key=lambda item: item["chapter"])

    # All validation above completes before replacing application data.
    write(STORY / "chapter-notes.json", chapters)
    write(STORY / "characters.json", sorted(characters.values(), key=lambda item: item["chapter"]))
    write(STORY / "milestones-301-1000.json", milestones)
    write(STORY / "war-god-301-1000.json", profile)
    print(f"Integrated {len(chapters)} chapters; {len(milestones)} new milestones; {len(characters)+1} character profiles including hero")


if __name__ == "__main__":
    integrate()
