import { useState } from 'react';
import { mockStandingsData } from '../data/mockStandings';

export default function Standings() {
  const seasons = Object.keys(mockStandingsData);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const mockData = mockStandingsData[selectedSeason];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <h1 className="page-title animate-flicker" style={{ margin: 0, textAlign: 'left' }}>Clasificación Global</h1>
          <p className="page-subtitle" style={{ margin: 0, marginTop: '0.5rem', textAlign: 'left' }}>Tabla de posiciones actual en todas las etapas de AtCoder.</p>
        </div>
        <select 
          value={selectedSeason} 
          onChange={(e) => setSelectedSeason(e.target.value)}
          style={{ 
            fontSize: '1rem', 
            padding: '0.6rem 1.2rem', 
            borderRadius: '2px', 
            backgroundColor: 'rgba(5, 5, 8, 0.9)', 
            color: 'var(--neon-green)', 
            border: '2px solid var(--neon-green)', 
            boxShadow: '0 0 10px var(--neon-green)',
            cursor: 'pointer',
            fontFamily: 'var(--font-header)',
            textTransform: 'uppercase'
          }}
        >
          {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.8rem' }}>
        <span style={{ color: 'var(--neon-green)', fontSize: '0.9rem', letterSpacing: '1px', textShadow: '0 0 5px var(--neon-green)' }}>
          ➡️ Desliza a la derecha para ver más etapas
        </span>
      </div>

      <div className="table-container animate-fade-up delay-300">
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
                    <div style={{ fontWeight: 600 }}>
                      <a 
                        href={`https://atcoder.jp/users/${row.username}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'var(--neon-cyan)', textDecoration: 'none', transition: 'all 0.3s' }}
                        onMouseOver={(e) => {
                          e.target.style.textDecoration = 'underline';
                          e.target.style.textShadow = '0 0 8px var(--neon-cyan)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.textDecoration = 'none';
                          e.target.style.textShadow = 'none';
                        }}
                      >
                        {row.username}
                      </a>
                    </div>
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
