import { EVENT } from '../data/event.js';

export default function Prizes() {
  return (
    <section className="prizes" id="prizes">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{EVENT.prizes.tag}</span>
          <h2 className="section-title">{EVENT.prizes.title.prefix} <span className="red">{EVENT.prizes.title.highlight}</span></h2>
        </div>
        <div className="prizes-grid">
          {EVENT.prizes.items.map((prize, i) => (
            <div key={i} className={`prize-card ${prize.class}`}>
              <div className="prize-rank">{prize.rank}</div>
              <div className="prize-crown">{prize.crown}</div>
              <div className="prize-title">{prize.title}</div>
              <div className="prize-amount">{prize.amount}</div>
              {prize.badge && <div className="prize-badge-label">{prize.badge}</div>}
              <div className="prize-perks">
                {prize.perks.map((perk, j) => (
                  <span key={j}>{perk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="prizes-note">
          {EVENT.prizes.note}
        </div>
      </div>
    </section>
  );
}
