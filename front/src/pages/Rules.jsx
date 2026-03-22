export default function Rules() {
  return (
    <>
      <div>
        <h1 className="page-title">Competition Rules</h1>
        <p className="page-subtitle">Understand how the Grand Prix scoring works.</p>
      </div>

      <div className="card animate-fade-up delay-100">
        <h2 style={{ marginBottom: '1rem' }}>1. Eligibility</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Participants must be currently enrolled students at Universidad Nacional de Colombia. Teams can consist of up to 3 members. All members must have active AtCoder accounts.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>2. Contest Format</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          The Cup spans across 10 selected AtCoder Beginner Contests (ABC). For each selected contest, your team will participate using a shared or individual approach, but the highest score among team members will represent the team for that round.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>3. Grand Prix Scoring</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Points are awarded based on your rank within the UNAL cohort for each stage.
          <br /><br />
          1st place: 100 pts<br />
          2nd place: 75 pts<br />
          3rd place: 60 pts<br />
          4th place: 50 pts<br />
          5th place: 45 pts<br />
          ...<br />
          Your lowest 2 scores will be dropped from the final standing calculation.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>4. Academic Integrity</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Plagiarism, code sharing outside of your team, or using multiple accounts during a contest is strictly prohibited and will result in immediate disqualification from the entire Cup.
        </p>
      </div>
    </>
  );
}
