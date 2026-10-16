export default function StandingsTable({ rows, showStages = false, animateRows = false, animateTable = false }) {
  const stageCount = showStages ? rows[0]?.stages?.length ?? 0 : 0;

  return (
    <div className={`table-container${animateTable ? ' animate-fade-up delay-300' : ''}`}>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>{showStages ? 'Usuario del concursante' : 'Usuario'}</th>
            <th>Puntaje Total</th>
            {Array.from({ length: stageCount }, (_, index) => (
              <th key={index}>Etapa {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            let rankClass = '';
            if (index === 0) rankClass = 'rank-1';
            else if (index === 1) rankClass = 'rank-2';
            else if (index === 2) rankClass = 'rank-3';

            return (
              <tr
                key={row.username}
                className={animateRows ? 'animate-fade-up' : undefined}
                style={animateRows ? { animationDelay: `${index * 100}ms` } : undefined}
              >
                <td><div className={`rank-badge ${rankClass}`}>{index + 1}</div></td>
                <td>
                  <div style={{ fontWeight: 600 }}>
                    <a
                      href={`https://atcoder.jp/users/${row.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--neon-cyan)', textDecoration: 'none', transition: 'all 0.3s' }}
                      onMouseOver={(event) => {
                        event.currentTarget.style.textDecoration = 'underline';
                        event.currentTarget.style.textShadow = '0 0 8px var(--neon-cyan)';
                      }}
                      onMouseOut={(event) => {
                        event.currentTarget.style.textDecoration = 'none';
                        event.currentTarget.style.textShadow = 'none';
                      }}
                    >
                      {row.username}
                    </a>
                  </div>
                </td>
                <td className="score">{row.totalPoints}</td>
                {showStages && row.stages?.map((stageScore, stageIndex) => (
                  <td key={stageIndex}>{stageScore}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}