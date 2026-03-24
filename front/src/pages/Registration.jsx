export default function Registration() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registro enviado (Simulación)');
  };

  return (
    <>
      <div>
        <h1 className="page-title">Registro</h1>
        <p className="page-subtitle">Únete a la liga y compite con los mejores de la UNAL.</p>
      </div>

      <div className="card animate-fade-up delay-100" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="team-name">Nombre del equipo</label>
            <input type="text" id="team-name" className="form-control" placeholder="ej. UNAL Hackers" required />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="member1">Miembro 1 (Usuario de AtCoder)</label>
            <input type="text" id="member1" className="form-control" placeholder="klaus" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="member2">Miembro 2 (Usuario de AtCoder)</label>
            <input type="text" id="member2" className="form-control" placeholder="Opcional" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="member3">Miembro 3 (Usuario de AtCoder)</label>
            <input type="text" id="member3" className="form-control" placeholder="Opcional" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Registrar Equipo
          </button>
        </form>
      </div>
    </>
  );
}
