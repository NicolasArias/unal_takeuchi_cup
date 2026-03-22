export default function About() {
  return (
    <>
      <div>
        <h1 className="page-title">About the Cup</h1>
        <p className="page-subtitle">Honoring a legacy of competitive programming at UNAL.</p>
      </div>

      <div className="card animate-fade-up delay-100">
        <h2 style={{ marginBottom: '1rem' }}>The Legacy of Professor Takeuchi</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Professor Yu Takeuchi was a visionary mathematician and educator who significantly impacted the academic development at Universidad Nacional de Colombia. He instilled a deep passion for problem solving and analytical thinking among generations of students.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Copa Takeuchi UNAL aims to revive and foster the competitive programming community within the university. By structuring a long-term league around high-quality AtCoder contests, we provide students with consistent motivation to practice, improve, and represent the university in international competitions like the ICPC.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Contact Us</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          For questions or sponsorship inquiries, please reach out to the UNAL Competitive Programming Club at <a href="mailto:cpclub@unal.edu.co" style={{ color: 'var(--primary-color)' }}>cpclub@unal.edu.co</a>.
        </p>
      </div>
    </>
  );
}
