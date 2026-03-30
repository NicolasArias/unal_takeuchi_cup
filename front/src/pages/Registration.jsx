import { Link } from 'react-router-dom';

export default function Registration() {
  // Replace with the actual Google Form link when available
  const googleFormUrl = "https://forms.gle/PLACEHOLDER"; 

  return (
    <>
      <div className="page-header">
        <h1 className="page-title animate-flicker">Registro</h1>
        <p className="page-subtitle">Forma parte de la historia de la Copa Takeuchi.</p>
      </div>

      <div className="card animate-fade-up delay-100">
        <div style={{ marginBottom: '2rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="neon-icon-pink" style={{ marginBottom: '1.5rem' }}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <h2 style={{ marginBottom: '1rem' }}>Inscríbete a la COPA TAKEUCHI</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            El proceso de registro se realiza a través de <strong>Google Forms</strong>. 
            Es requisito indispensable iniciar sesión con tu <strong>correo institucional (@unal.edu.co)</strong> para completar la inscripción.
          </p>
        </div>

        <a 
          href={googleFormUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary" 
          style={{ 
            fontSize: '1.2rem', 
            padding: '1rem 3rem', 
            display: 'inline-block'
          }}
        >
          Ir al Formulario de Registro
        </a>

        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          ¿Tienes dudas sobre los requisitos? <Link to="/rules" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Revisa el FAQ</Link>
        </p>
      </div>
    </>
  );
}
