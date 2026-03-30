export default function About() {
  return (
    <>
      <div>
        <h1 className="page-title">Acerca de la Copa</h1>
        <p className="page-subtitle">Homenaje a un puente de conocimiento.</p>
      </div>

      <div className="card animate-fade-up delay-100">
        <h2 style={{ marginBottom: '1rem' }}>¿Por qué "COPA TAKEUCHI"?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
          Este torneo rinde homenaje al fructífero intercambio académico entre Colombia y Japón, un puente de conocimiento que enriqueció profundamente a nuestra universidad. Como símbolo de este legado, honramos la memoria del profesor Yu Takeuchi, un matemático japonés que dedicó su vida a la educación en Colombia.
        </p>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
          El Profesor Takeuchi fue un pilar fundamental de este intercambio, reconocido por su generosidad y dedicación absoluta hacia sus estudiantes. Su labor fue tan influyente que fue distinguido como el japonés más importante en la historia de las relaciones entre ambos países.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Competimos en AtCoder: Continuando con el legado</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
          Para mantener viva la esencia de este intercambio, el torneo se realizará en la plataforma AtCoder, creada en Japón. Es nuestra forma de conectar el espíritu de colaboración pasado con la vanguardia competitiva actual.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Contáctanos</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Para preguntas o consultas, comunícate con Búhos ICPC, el grupo de programación competitiva de la UNAL en <a href="mailto:cpclub@unal.edu.co" style={{ color: 'var(--primary-color)' }}>cpclub@unal.edu.co</a>.
        </p>
      </div>
    </>
  );
}
