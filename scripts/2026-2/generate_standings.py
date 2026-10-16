"""Generate the Season 2026-II standings from AtCoder contest results."""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parents[1]
DEFAULT_DATA_PATH = SCRIPT_DIR / "data.json"
DEFAULT_OUTPUT_PATH = PROJECT_ROOT / "front" / "src" / "data" / "seasons" / "Season_2026_II.json"
ATCODER_BASE_URL = "https://atcoder.jp/contests"


def fetch_json(url: str) -> object:
    request = Request(url, headers={"User-Agent": "unal-takeuchi-cup-standings/1.0"})
    with urlopen(request, timeout=30) as response:
        return json.load(response)


def fetch_text(url: str) -> str:
    request = Request(url, headers={"User-Agent": "unal-takeuchi-cup-standings/1.0"})
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


class ContestTimeParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.start_time: str | None = None
        self._inside_contest_time = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        classes = attributes.get("class", "") or ""
        if tag == "time" and "fixtime-full" in classes and self.start_time is None:
            self._inside_contest_time = True

    def handle_data(self, data: str) -> None:
        if self._inside_contest_time:
            self.start_time = data.strip()
            self._inside_contest_time = False


def contest_has_started(contest_id: str, now: datetime) -> bool:
    contest_page_url = f"{ATCODER_BASE_URL}/{contest_id}"
    parser = ContestTimeParser()
    parser.feed(fetch_text(contest_page_url))
    if parser.start_time is None:
        raise ValueError(f"Missing ContestStartTime for {contest_id}")

    contest_start = datetime.strptime(parser.start_time, "%Y-%m-%d %H:%M:%S%z")
    return contest_start <= now


def fetch_contest_results(contest_id: str) -> list[dict]:
    results_url = f"{ATCODER_BASE_URL}/{contest_id}/results/json"
    results = fetch_json(results_url)
    if not isinstance(results, list):
        raise ValueError(f"Unexpected results response for {contest_id}")
    return [row for row in results if isinstance(row, dict)]


def load_data(data_path: Path) -> tuple[list[str], list[int], list[dict]]:
    with data_path.open(encoding="utf-8") as data_file:
        data = json.load(data_file)

    contests = data["contests"]
    points = data["points"]
    participants = data["participants"]

    if not isinstance(contests, list) or not all(isinstance(item, str) for item in contests):
        raise ValueError("data.json must contain a list of contest IDs")
    if not isinstance(points, list) or not all(isinstance(item, int) for item in points):
        raise ValueError("data.json must contain a list of integer points")
    if not isinstance(participants, list):
        raise ValueError("data.json must contain a participants list")

    return contests, points, participants


def build_standings(data_path: Path) -> list[dict]:
    contests, points, participant_data = load_data(data_path)
    participants = []
    participant_by_handle = {}

    for participant in participant_data:
        handle = participant["handle"]
        division = participant["division"]
        if division not in (1, 2):
            raise ValueError(f"Unsupported division {division} for {handle}")
        normalized_handle = handle.casefold()
        if normalized_handle in participant_by_handle:
            raise ValueError(f"Duplicate participant handle: {handle}")

        entry = {
            "username": handle,
            "division": division,
            "totalPoints": 0,
            "stages": [],
        }
        participants.append(entry)
        participant_by_handle[normalized_handle] = entry

    now = datetime.now(timezone.utc)
    completed_contests = []

    for contest_id in contests:
        try:
            if not contest_has_started(contest_id, now):
                print(f"Skipping future contest {contest_id}")
                continue
            results = fetch_contest_results(contest_id)
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            print(f"Skipping {contest_id}: {error}", file=sys.stderr)
            continue

        completed_contests.append((contest_id, results))

    for _, _ in completed_contests:
        for participant in participants:
            participant["stages"].append(0)

    for stage_index, (contest_id, results) in enumerate(completed_contests):
        division_results = {1: [], 2: []}
        contest_points = {participant["username"]: 0 for participant in participants}
        for result in results:
            handle = result.get("UserScreenName")
            place = result.get("Place")
            competitions = result.get("Competitions")
            participant = participant_by_handle.get(handle.casefold()) if isinstance(handle, str) else None
            if (
                participant is None
                or not isinstance(place, int)
                or place < 1
                or not isinstance(competitions, int)
                or competitions < 1
            ):
                continue
            division_results[participant["division"]].append((place, participant))

        for division in division_results:
            ranked_results = sorted(division_results[division], key=lambda item: item[0])
            for position, (_, participant) in enumerate(ranked_results):
                contest_points[participant["username"]] = points[position] if position < len(points) else 0

        for participant in participants:
            participant["stages"][stage_index] = contest_points[participant["username"]]

        print(f"Processed {contest_id}")

    for participant in participants:
        participant["totalPoints"] = sum(participant["stages"])

    return sorted(
        participants,
        key=lambda participant: (participant["division"], -participant["totalPoints"], participant["username"].casefold()),
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, default=DEFAULT_DATA_PATH)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    args = parser.parse_args()

    standings = build_standings(args.data)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as output_file:
        json.dump(standings, output_file, ensure_ascii=False, indent=2)
        output_file.write("\n")
    print(f"Wrote {len(standings)} participants to {args.output}")


if __name__ == "__main__":
    main()