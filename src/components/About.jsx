import { EVENT } from '../data/event.js';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{EVENT.about.tag}</span>
          <h2 className="section-title">{EVENT.about.title.prefix} <span className="red">{EVENT.about.title.highlight}</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            {EVENT.about.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            <div className="about-stats">
              {EVENT.about.stats.map((stat, i) => (
                <div key={i} className="stat-box">
                  <span className={`stat-num ${stat.isRed ? 'red' : ''}`}>{stat.num}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-terminal">
            <div className="terminal-bar">
              <span className="dot red-dot"></span>
              <span className="dot yellow-dot"></span>
              <span className="dot green-dot"></span>
              <span className="terminal-title">{EVENT.about.terminal.title}</span>
            </div>
            <div className="terminal-body">
              {EVENT.about.terminal.lines.map((line, i) => (
                <div key={i} className={`t-line ${line.type}`}>
                  {line.prompt && <span className="prompt">{line.prompt}</span>} {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
