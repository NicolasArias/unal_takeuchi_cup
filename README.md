# Copa Takeuchi

Website and standings tools for the UNAL Takeuchi Cup, a competitive programming contest organized by Buhos ICPC.

## Project Structure

- `front/`: React and Vite website.
- `front/src/pages/`: website pages, including the home page and standings.
- `front/src/data/seasons/`: generated season standings as JSON files.
- `front/src/data/mockStandings.js`: frontend season registry. Every season shown by the website must be imported here.
- `scripts/<stage>/data.json`: contest list, point distribution, and participants for a season.
- `scripts/generate_standings.py`: division-aware standings generator for any season stage.

## Requirements

- Node.js `20.19+` or `22.12+` for the current Vite version.
- Python 3.10 or newer for the standings generator.

## Run The Website

```powershell
cd front
npm install
npm run dev
```

The development server prints the local URL. Other frontend commands are:

```powershell
npm run build
npm run lint
npm run preview
```

## Season Data

Season JSON files use this structure:

```json
{
  "username": "participant_handle",
  "division": 1,
  "totalPoints": 25,
  "stages": [25, 0]
}
```

The `division` field is optional for backward compatibility. The frontend displays a normal single table for seasons without it. When present, the Home page and full standings page automatically create one tab per division.

To make a new season visible, add its JSON import and entry to `front/src/data/mockStandings.js`:

```js
import Season_2026_II from './seasons/Season_2026_II.json';

export const mockStandingsData = {
  "Season 2026-II": Season_2026_II
};
```

Keep the existing season entries when adding a new one so previous standings remain accessible.

## Generate Season Standings

From the repository root, run:

```powershell
python scripts/generate_standings.py 2026_II
```

The required stage argument selects `scripts/<stage>/data.json`, fetches each AtCoder contest's public start time and results, and writes:

```text
front/src/data/seasons/Season_2026_II.json
```

Its behavior is division-aware:

- Rankings and points are calculated separately for each division.
- The point list in `data.json` is applied from first place within each division.
- Participants absent from a contest result receive `0` for that stage.
- Future contests are skipped.
- Unavailable contests are reported and skipped so the remaining results can still be generated.

After generating a new season, register its JSON file in `front/src/data/mockStandings.js`, then run the frontend lint and build commands.

## Scheduled Standings Updates

The workflow `.github/workflows/update_season_standings.yml` runs the Season 2026-II generator every Saturday and Sunday at 07:30, 08:00, 08:30, and 08:45 in UTC-5. GitHub Actions schedules use UTC, so the workflow uses 12:30, 13:00, 13:30, and 13:45 UTC.

The workflow can also be started manually from the repository's **Actions** tab. It commits and pushes `Season_2026_II.json` only when the generated standings change. Scheduled workflows can be delayed slightly by GitHub during periods of high demand.

## Updating Participants

For Season 2026-II, edit `scripts/2026_II/data.json`:

- Add contest IDs to `contests` in chronological order.
- Update `points` to change the per-division distribution.
- Add or remove participants with their AtCoder `handle` and `division` (`1` or `2`).

Re-run the generator after changing this file.
