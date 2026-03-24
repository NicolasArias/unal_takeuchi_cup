export default function About() {
  return (
    <>
      <div>
        <h1 className="page-title">Acerca de la Copa</h1>
        <p className="page-subtitle">Honrando un legado de programación competitiva en la UNAL.</p>
      </div>

      <div className="card animate-fade-up delay-100">
        <h2 style={{ marginBottom: '1rem' }}>El legado del profesor Takeuchi</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          El profesor Yu Takeuchi fue un matemático y educador visionario que impactó significativamente el desarrollo académico en la Universidad Nacional de Colombia. Inculcó una profunda pasión por la resolución de problemas y el pensamiento analítico entre generaciones de estudiantes.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Nuestra Misión</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          La Copa Takeuchi UNAL tiene como objetivo revivir y fomentar la comunidad de programación competitiva dentro de la universidad. Al estructurar una liga a largo plazo en torno a concursos de AtCoder de alta calidad, proporcionamos a los estudiantes una motivación constante para practicar, mejorar y representar a la universidad en competencias internacionales como el ICPC.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Contáctanos</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Para preguntas o consultas de patrocinio, comunícate con el Club de Programación Competitiva de la UNAL en <a href="mailto:cpclub@unal.edu.co" style={{ color: 'var(--primary-color)' }}>cpclub@unal.edu.co</a>.
        </p>
      </div>
    </>
  );
}
