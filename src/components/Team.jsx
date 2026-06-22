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
          <div className="coord-group" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: '0' }}>
            <div className="coord-group-title">Connect</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <a href="mailto:quantumarenatkrcet@gmail.com" target="_blank" rel="noreferrer" className="coord-name" style={{ color: 'var(--text)', textDecoration: 'none', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', color: 'var(--red)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span style={{wordBreak: 'break-all'}}>quantumarenatkrcet@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/tkrcet_cse" target="_blank" rel="noreferrer" className="coord-name" style={{ color: 'var(--text)', textDecoration: 'none', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', color: 'var(--red)' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                @tkrcet_cse
              </a>
              <a href="https://www.youtube.com/@departmentofcsetkrcet7030" target="_blank" rel="noreferrer" className="coord-name" style={{ color: 'var(--text)', textDecoration: 'none', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', color: 'var(--red)' }}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                <span style={{wordBreak: 'break-all'}}>@departmentofcsetkrcet7030</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
