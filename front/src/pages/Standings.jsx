import { useState } from 'react';
import { mockStandingsData } from '../data/mockStandings';

export default function Standings() {
  const [mockData] = useState(mockStandingsData);

  return (
    <>
      <div>
        <h1 className="page-title">Global Standings</h1>
        <p className="page-subtitle">Current leaderboard across all AtCoder stages.</p>
      </div>

      <div className="table-container animate-fade-up delay-100">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Contestant Username</th>
              <th>Total Points</th>
              {mockData[0]?.stages.map((_, i) => (
                <th key={i}>Stage {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, index) => {
              let rankClass = '';
              if (index === 0) rankClass = 'rank-1';
              else if (index === 1) rankClass = 'rank-2';
              else if (index === 2) rankClass = 'rank-3';
              
              return (
                <tr key={index} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <td><div className={`rank-badge ${rankClass}`}>{index + 1}</div></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{row.username}</div>
                  </td>
                  <td className="score">{row.totalPoints}</td>
                  {row.stages.map((stageScore, i) => (
                    <td key={i}>{stageScore}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
