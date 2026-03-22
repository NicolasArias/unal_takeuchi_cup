export default function Registration() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted (Mock)');
  };

  return (
    <>
      <div>
        <h1 className="page-title">Registration</h1>
        <p className="page-subtitle">Join the league and compete with the best in UNAL.</p>
      </div>

      <div className="card animate-fade-up delay-100" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="team-name">Team Name</label>
            <input type="text" id="team-name" className="form-control" placeholder="e.g. UNAL Hackers" required />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="member1">Member 1 (AtCoder Handle)</label>
            <input type="text" id="member1" className="form-control" placeholder="klaus" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="member2">Member 2 (AtCoder Handle)</label>
            <input type="text" id="member2" className="form-control" placeholder="Optional" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="member3">Member 3 (AtCoder Handle)</label>
            <input type="text" id="member3" className="form-control" placeholder="Optional" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Register Team
          </button>
        </form>
      </div>
    </>
  );
}
