import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockStandingsData } from '../data/mockStandings';

export default function Home() {
  const seasons = Object.keys(mockStandingsData);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const topCompetitors = mockStandingsData[selectedSeason].slice(0, 6);

  return (
    <>
      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 className="page-title">Copa Takeuchi UNAL</h1>
        <p className="page-subtitle" style={{ margin: '0 auto 2rem' }}>
          La principal liga de programación competitiva para estudiantes de la Universidad Nacional de Colombia. ¡Entrena, compite y sube en la tabla de posiciones en la serie AtCoder Beginner Contest!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }} className="animate-fade-up delay-200">
          <Link to="/registration" className="btn btn-primary">Regístrate ahora</Link>
          <Link to="/standings" className="btn btn-secondary">Ver tabla de posiciones</Link>
        </div>
      </section>

      <section className="animate-fade-up delay-300" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <h2 className="page-title" style={{ fontSize: '2rem', margin: 0 }}>Top 6</h2>
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
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Usuario</th>
                <th>Puntaje Total</th>
              </tr>
            </thead>
            <tbody>
              {topCompetitors.map((competitor, index) => {
                let rankClass = '';
                if (index === 0) rankClass = 'rank-1';
                else if (index === 1) rankClass = 'rank-2';
                else if (index === 2) rankClass = 'rank-3';
                
                return (
                  <tr key={index}>
                    <td><div className={`rank-badge ${rankClass}`}>{index + 1}</div></td>
                    <td style={{ fontWeight: 600 }}>{competitor.username}</td>
                    <td className="score">{competitor.totalPoints}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }} className="animate-fade-up delay-300">
        <div className="card">
          <h3>Formato Grand Prix</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Los puntos se otorgan en función de tu rendimiento en múltiples etapas de AtCoder. La consistencia es tan importante como el máximo rendimiento.</p>
        </div>
        <div className="card">
          <h3>Para estudiantes de la UNAL</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Compite contra tus compañeros de universidad, haz un seguimiento de tu progreso y prepárate para los concursos regionales del ICPC.</p>
        </div>
        <div className="card">
          <h3>Sube de nivel tus habilidades</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Diseñado para llevar tu pensamiento algorítmico y velocidad de codificación a nuevos horizontes.</p>
        </div>
      </div>
    </>
  );
}
