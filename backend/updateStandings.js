const fs = require('fs');
const path = require('path');

// --- Configuration ---
// Make your Google Sheet public and publish it as CSV (File > Share > Publish to web > CSV).
// Replace the URL here or set it via environment variables (e.g. GitHub Secrets).
const SHEET_CSV_URL = process.env.SHEET_CSV_URL || 'https://docs.google.com/spreadsheets/d/1VglSjGnpxIEIIacLYPqV-BpSjxdGnDqVZjOU-8ZWdmU/gviz/tq?tqx=out:csv'; 
const POINTS_CONFIG = [25, 20, 17, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1];
const DEFAULT_POINTS = 0; // Points for participation if not in top N

async function fetchCSV(url) {
    console.log(`Fetching CSV mapping from Google Sheets...`);
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error fetching CSV! status: ${res.status}`);
        const text = await res.text();
        
        // Simple CSV parser
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        if (lines.length < 2) return {};
        
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, '').toLowerCase());
        const atCoderIdx = headers.findIndex(h => h.includes('atcoder') || h.includes('user'));
        const userIdx = headers.findIndex(h => h.includes('correo') || h.includes('nombre') || h.includes('username') || h.includes('unal'));
        
        const mapping = {};
        for (let i = 1; i < lines.length; i++) {
            // Regex to handle CSV structure ignoring commas inside quotes
            const row = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            const unalUser = row[userIdx] || row[0];
            const atCoderHandle = row[atCoderIdx] || row[2] || row[1];
            
            if (atCoderHandle) {
                // Map lowercase back to the correct capitalized Handle found in the sheet
                mapping[atCoderHandle.toLowerCase()] = atCoderHandle;
            }
        }
        return mapping;
    } catch (e) {
        console.warn(`[WARN] Could not fetch real CSV (${e.message}). Using empty mapping.`);
        return {};
    }
}

async function fetchAtCoderStandings(contestId) {
    const url = `https://atcoder.jp/contests/${contestId}/results/json`;
    console.log(`Fetching AtCoder results from: ${url}`);
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch AtCoder results for ${contestId} (status ${res.status}). Ensure the contest ID is correct and public.`);
    }
    return await res.json();
}

function rebuildIndexFile(seasonsDir, mockStandingsPath) {
    const files = fs.readdirSync(seasonsDir).filter(f => f.endsWith('.json'));
    let importsStr = '';
    let exportStr = 'export const mockStandingsData = {\n';
    
    files.forEach(file => {
        const seasonName = path.basename(file, '.json');
        const safeName = seasonName.replace(/\W/g, '');
        importsStr += `import ${safeName} from './seasons/${file}';\n`;
        exportStr += `  "${seasonName}": ${safeName},\n`;
    });
    
    exportStr += '};\n';
    fs.writeFileSync(mockStandingsPath, importsStr + '\n' + exportStr, 'utf-8');
    console.log(`✅ successfully rebuilt index at ${mockStandingsPath}.`);
}

async function updateStandings(contestId, activeSeason) {
    console.log(`Starting standings update for AtCoder contest: ${contestId} on season: ${activeSeason}`);
    
    // 1. Fetch Contestants Map
    const atcoderToUnal = await fetchCSV(SHEET_CSV_URL);
    console.log(`Loaded mapping for ${Object.keys(atcoderToUnal).length} registered contestants.`);
    
    // 2. Fetch AtCoder Data
    const resultsJson = await fetchAtCoderStandings(contestId);
    if (!Array.isArray(resultsJson)) {
        throw new Error("Invalid AtCoder results data received. Expected an array.");
    }
    
    // 3. Filter and Sort
    const unalResults = resultsJson.filter(row => {
        return row.UserScreenName && atcoderToUnal[row.UserScreenName.toLowerCase()] !== undefined;
    });
    console.log(`Found ${unalResults.length} UNAL contestants in the contest results.`);
    
    // Ensure properly sorted by rank
    unalResults.sort((a, b) => a.Place - b.Place);
    
    // 4. Score Points
    const pointsAwarded = {};
    unalResults.forEach((result, index) => {
        // Use the exactly cased handle straight from AtCoder results
        const username = result.UserScreenName;
        const points = index < POINTS_CONFIG.length ? POINTS_CONFIG[index] : DEFAULT_POINTS;
        pointsAwarded[username] = points;
        console.log(` - Rank ${index + 1}: ${username} earned ${points} pts`);
    });
    
    // 5. Update Local JSON database
    const seasonsDir = path.join(process.cwd(), 'front', 'src', 'data', 'seasons');
    if (!fs.existsSync(seasonsDir)) fs.mkdirSync(seasonsDir, { recursive: true });
    
    const filePath = path.join(seasonsDir, `${activeSeason}.json`);
    let seasonData = [];
    if (fs.existsSync(filePath)) {
        seasonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    
    const userMap = {};
    seasonData.forEach(userObj => {
        userMap[userObj.username] = userObj;
        if (!userObj.stages) userObj.stages = [];
    });
    
    // Apply new points
    for (const [username, points] of Object.entries(pointsAwarded)) {
        if (!userMap[username]) {
            userMap[username] = { username, totalPoints: 0, stages: [] };
            seasonData.push(userMap[username]);
        }
        userMap[username].stages.push(points);
    }
    
    // Fill 0 points for contestants who missed the contest
    Object.values(userMap).forEach(userObj => {
        // If they were already in the DB but didn't compete this stage
        if (pointsAwarded[userObj.username] === undefined) {
             // To keep arrays equal length, we only append 0 if they haven't caught up to the max stages count
             // Ideally we just push 0 if they don't have it this iteration
             userObj.stages.push(0);
        }
        userObj.totalPoints = userObj.stages.reduce((acc, val) => acc + val, 0);
    });
    
    // Sort overall ranking by total points descending
    seasonData.sort((a, b) => b.totalPoints - a.totalPoints);
    
    fs.writeFileSync(filePath, JSON.stringify(seasonData, null, 2), 'utf-8');
    console.log(`✅ successfully updated ${filePath}.`);
    
    // Rebuild index
    const mockStandingsPath = path.join(process.cwd(), 'front', 'src', 'data', 'mockStandings.js');
    rebuildIndexFile(seasonsDir, mockStandingsPath);
}

const contestId = process.argv[2];
const activeSeason = process.argv[3] || 'Season 2025-II';
if (!contestId) {
    console.error("❌ Usage: node backend/updateStandings.js <contestId> [seasonName]");
    process.exit(1);
}

updateStandings(contestId, activeSeason).catch(err => {
    console.error("❌ Error updating standings:", err.message);
    process.exit(1);
});
