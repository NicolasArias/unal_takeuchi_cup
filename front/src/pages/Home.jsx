import { Link } from 'react-router-dom';
import { mockStandingsData } from '../data/mockStandings';

export default function Home() {
  const topCompetitors = mockStandingsData.slice(0, 6);

  return (
    <>
      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 className="page-title">Copa Takeuchi UNAL</h1>
        <p className="page-subtitle" style={{ margin: '0 auto 2rem' }}>
          The premier competitive programming league for Universidad Nacional de Colombia students. Train, compete, and climb the leaderboard in the AtCoder Beginner Contest series!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }} className="animate-fade-up delay-200">
          <Link to="/registration" className="btn btn-primary">Register Now</Link>
          <Link to="/standings" className="btn btn-secondary">View Leaderboard</Link>
        </div>
      </section>

      <section className="animate-fade-up delay-300" style={{ marginBottom: '4rem' }}>
        <h2 className="page-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Current Season Top 6</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Total Points</th>
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
          <h3>Grand Prix Format</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Points are awarded based on your performance across multiple AtCoder stages. Consistency is just as important as peak performance.</p>
        </div>
        <div className="card">
          <h3>For UNAL Students</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Compete against your university peers, track your progress, and prepare for regional ICPC contests.</p>
        </div>
        <div className="card">
          <h3>Level Up Your Skills</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Designed to push your algorithmic thinking and coding speed to new heights.</p>
        </div>
      </div>
    </>
  );
}
