import { EVENT } from '../data/event.js';

export default function Team() {
  return (
    <section className="coordinators">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{EVENT.team.tag}</span>
          <h2 className="section-title">{EVENT.team.title.prefix} <span className="red">{EVENT.team.title.highlight}</span></h2>
        </div>
        <div className="coord-grid">
          {EVENT.team.groups.map((group, i) => (
            <div key={i} className="coord-group">
              <div className="coord-group-title">{group.title}</div>
              {group.members.map((member, j) => (
                <div key={j} style={{ display: 'contents' }}>
                  <div className="coord-name">
                    {member.name} {member.sub && <span style={{fontSize: '0.8em', opacity: 0.8}}>{member.sub}</span>} {member.num && <span className="coord-num">{member.num}</span>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
