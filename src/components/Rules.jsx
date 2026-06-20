import { EVENT } from '../data/event.js';

export default function Rules() {
  return (
    <section className="rules-section" id="rules">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{EVENT.rules.tag}</span>
          <h2 className="section-title">{EVENT.rules.title.prefix} <span className="red">{EVENT.rules.title.highlight}</span></h2>
        </div>
        <div className="rules-grid">
          {EVENT.rules.items.map((rule, i) => (
            <div key={i} className="rule-item">
              <span className="rule-num">{rule.num}</span>
              <div>{rule.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
