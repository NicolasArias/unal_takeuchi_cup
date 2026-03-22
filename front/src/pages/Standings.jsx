import { useState } from 'react';

export default function Standings() {
  const [mockData] = useState([
    { team: 'UNAL Red', handled: 'klaus, alex, marta', score: 1250, solved: 12, penalty: 412 },
    { team: 'UNAL Blue', handled: 'john, doe, jane', score: 1100, solved: 11, penalty: 390 },
    { team: 'UNAL Green', handled: 'alice, bob, charlie', score: 1050, solved: 10, penalty: 500 },
    { team: 'UNAL Yellow', handled: 'david, eve, frank', score: 900, solved: 9, penalty: 480 },
    { team: 'UNAL Purple', handled: 'grace, heidi, ivan', score: 850, solved: 8, penalty: 600 }
  ]);

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
              <th>Team / Members</th>
              <th>Total Score</th>
              <th>Solved</th>
              <th>Penalty</th>
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
                    <div style={{ fontWeight: 600 }}>{row.team}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.handled}</div>
                  </td>
                  <td className="score">{row.score}</td>
                  <td>{row.solved}</td>
                  <td>{row.penalty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
