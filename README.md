# Copa Takeuchi

Website and standings tools for the UNAL Takeuchi Cup, a competitive programming contest organized by Buhos ICPC.

## Project Structure

- `front/`: React and Vite website.
- `front/src/pages/`: website pages, including the home page and standings.
- `front/src/data/seasons/`: generated season standings as JSON files.
- `front/src/data/mockStandings.js`: frontend season registry. Every season shown by the website must be imported here.
- `backend/updateStandings.js`: legacy Node.js updater for single-division standings.
- `scripts/2026-2/data.json`: Season 2026-II contest list, point distribution, and participants.
- `scripts/2026-2/generate_standings.py`: division-aware Season 2026-II standings generator.

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

## Generate Season 2026-II Standings

From the repository root, run:

```powershell
python scripts/2026-2/generate_standings.py
```

The script reads `scripts/2026-2/data.json`, fetches each AtCoder contest's public start time and results, and writes:

```text
front/src/data/seasons/Season_2026_II.json
```

Its behavior is division-aware:

- Rankings and points are calculated separately for each division.
- The point list in `data.json` is applied from first place within each division.
- Participants absent from a contest result receive `0` for that stage.
- Future contests are skipped.
- Unavailable contests are reported and skipped so the remaining results can still be generated.

Optional paths can be supplied when testing with another data file or output location:

```powershell
python scripts/2026-2/generate_standings.py --data path/to/data.json --output path/to/standings.json
```

After generating a new season, register its JSON file in `front/src/data/mockStandings.js`, then run the frontend lint and build commands.

## Legacy Standings Updater

`backend/updateStandings.js` updates one contest using a participant CSV or the configured Google Sheets CSV fallback:

```powershell
node backend/updateStandings.js <contest-id> [season-name]
```

Example:

```powershell
node backend/updateStandings.js abc479 "Season 2025-II"
```

Run this command from the repository root. The updater rebuilds `front/src/data/mockStandings.js` after writing the season JSON. It uses the legacy single-division point configuration, so use `scripts/2026-2/generate_standings.py` for division-based seasons.

## Updating Participants

For Season 2026-II, edit `scripts/2026-2/data.json`:

- Add contest IDs to `contests` in chronological order.
- Update `points` to change the per-division distribution.
- Add or remove participants with their AtCoder `handle` and `division` (`1` or `2`).

Re-run the generator after changing this file.
