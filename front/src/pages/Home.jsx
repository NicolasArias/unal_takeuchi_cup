import { Link } from 'react-router-dom';

export default function Home() {
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
