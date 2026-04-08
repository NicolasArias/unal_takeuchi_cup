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
        <h1 className="page-title animate-flicker">COPA TAKEUCHI de Programación Competitiva</h1>
        <p className="page-subtitle" style={{ margin: '0 auto 2rem' }}>
          ¡Demuestra tu talento y acepta el reto! Una iniciativa de Búhos ICPC creada para motivar e integrar a nuevos estudiantes en el apasionante mundo de los algoritmos.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }} className="animate-fade-up">
          <Link to="/registration" className="btn btn-primary">¡Inscríbete!</Link>
          <Link to="/rules" className="btn btn-secondary">Revisa el FAQ</Link>
          <Link to="/standings" className="btn btn-secondary">Tabla de posiciones</Link>
        </div>
      </section>

      <section className="animate-fade-up delay-300" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--neon-cyan)', textShadow: '0 0 10px var(--neon-cyan)' }}>Top 6</h2>
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
        {topCompetitors && topCompetitors.length > 0 ? (
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
                      <td style={{ fontWeight: 600 }}>
                        <a 
                          href={`https://atcoder.jp/users/${competitor.username}`} 
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
                          {competitor.username}
                        </a>
                      </td>
                      <td className="score">{competitor.totalPoints}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '3rem 2rem', 
              border: '1px solid rgba(0, 255, 255, 0.2)', 
              backgroundColor: 'rgba(5, 5, 10, 0.8)',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              zIndex: 0
            }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '0.5rem', fontFamily: 'var(--font-header)', textTransform: 'uppercase' }}>Sin Resultados</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Aún no hay puntuaciones registradas para esta temporada.</p>
              <Link to="/registration" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--neon-green)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid var(--neon-green)' }}>¡Sé el primero en inscribirte!</Link>
            </div>
          </div>
        )}
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
