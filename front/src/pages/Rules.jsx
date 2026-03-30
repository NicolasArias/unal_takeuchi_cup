export default function Rules() {
  const faqData = [
    {
      question: "¿Qué plataforma se usará para la Competencia?",
      answer: "AtCoder, y se usarán las rondas AtCoder Beginner Contest (ABC) para la Copa."
    },
    {
      question: "¿Por qué AtCoder?",
      answer: "La plataforma lleva a cabo competencias semanales rutinarias todos los sábados de 7:00 am a 8:40 am (a veces se cambia a los domingos). Lo que permite que no se cruce con la mayoría de los horarios de los estudiantes."
    },
    {
      question: "¿Por qué AtCoder Beginner Contest?",
      answer: "Estas competencias están especialmente diseñadas para principiantes e intermedios (aquellos que desean mejorar en conceptos clásicos), lo que permite que los problemas sean de gran calidad y de mucho aprendizaje."
    },
    {
      question: "¿Hay premios?",
      answer: "Sí. Se anunciará el día que anunciemos al ganador."
    },
    {
      question: "¿Cuál es la dinámica de la Copa?",
      answer: "Se usará un sistema de Grand Prix, donde cada ronda de AtCoder es una etapa. Dependiendo del puesto de cada participante, se asignará un puntaje a cada uno, el cual iremos guardando en una tabla general. Entre más competencias participes más puntos obtendrás."
    },
    {
      question: "¿Es individual?",
      answer: "Sí."
    },
    {
      question: "¿Se puede usar IA?",
      answer: (
        <>
          No, en general deben usar las reglas de la plataforma, estas las pueden leer en los siguientes enlaces:{" "}
          <a href="https://atcoder.jp/contests/abs/rules" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Rules</a> y{" "}
          <a href="https://info.atcoder.jp/entry/llm-rules-en" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>AI-Rules</a>.
        </>
      )
    },
    {
      question: "¿Debo ser de la sede UNAL-Bogota?",
      answer: "Sí, lastimosamente no se permiten otras sedes o instituciones. Además, debes ser estudiante activo que cumpla con las condiciones para seguir compitiendo en instancias oficiales de ICPC."
    },
    {
      question: "¿Hay alguna condición adicional?",
      answer: "Sí, para garantizar una competencia entre los principiantes e intermedios sólo participan por el premio aquellos que tengan un rating máximo en Codeforces menor a Expert. Si no tienes cuenta en Codeforces, puedes participar también."
    },
    {
      question: "¿Cómo me inscribo?",
      answer: "La inscripción se realiza a través de un formulario de Google específico para cada temporada. Es obligatorio iniciar sesión con tu correo institucional de la UNAL (@unal.edu.co) para acceder y completar el formulario."
    }
  ];

  return (
    <>
      <div className="animate-fade-in">
        <h1 className="page-title animate-flicker">Preguntas Frecuentes (FAQ)</h1>
        <p className="page-subtitle">Todo lo que necesitas saber sobre la Copa Takeuchi.</p>
      </div>

      <div className="rules-grid" style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="card animate-fade-up" 
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '0.75rem', fontSize: '1.25rem', textShadow: '0 0 5px var(--neon-cyan)' }}>
              {item.question}
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="card animate-fade-up" style={{ marginTop: '2rem', textAlign: 'center', border: '2px solid var(--neon-pink)', boxShadow: '0 0 15px var(--neon-pink)' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>
          Recuerden seguirnos en nuestro Instagram{" "}
          <a 
            href="https://www.instagram.com/buhos_icpcun" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: 'var(--neon-cyan)', textDecoration: 'none', textShadow: '0 0 5px var(--neon-cyan)' }}
          >
            @buhos_icpcun
          </a>{" "}
          para estar al tanto de las novedades.
        </p>
      </div>
    </>
  );
}
