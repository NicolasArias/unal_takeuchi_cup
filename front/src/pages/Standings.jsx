import { useState } from 'react';
import { mockStandingsData } from '../data/mockStandings';

export default function Standings() {
  const seasons = Object.keys(mockStandingsData);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const mockData = mockStandingsData[selectedSeason];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>Clasificación Global</h1>
          <p className="page-subtitle" style={{ margin: 0, marginTop: '0.5rem' }}>Tabla de posiciones actual en todas las etapas de AtCoder.</p>
        </div>
        <select 
          value={selectedSeason} 
          onChange={(e) => setSelectedSeason(e.target.value)}
          style={{ fontSize: '1.2rem', padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: '#1e1e1e', color: 'white', border: '1px solid #333', cursor: 'pointer' }}
        >
          {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </div>

      <div className="table-container animate-fade-up delay-100">
        <table>
          <thead>
            <tr>
              <th>Posición</th>
              <th>Usuario del concursante</th>
              <th>Puntaje Total</th>
              {mockData[0]?.stages.map((_, i) => (
                <th key={i}>Etapa {i + 1}</th>
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
