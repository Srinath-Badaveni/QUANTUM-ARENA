import { EVENT } from '../data/event.js';

export default function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{EVENT.timeline.tag}</span>
          <h2 className="section-title">{EVENT.timeline.title.prefix} <span className="red">{EVENT.timeline.title.highlight}</span></h2>
        </div>
        <div className="timeline">
          <div className="timeline-date-header">
            {EVENT.timeline.tabs.map(tab => (
              <div key={tab.id} className={`tdate ${tab.active ? 'active' : ''}`}>{tab.label}</div>
            ))}
          </div>
          <div className="timeline-items">
            {EVENT.timeline.items.map((item, i) => (
              <div key={i} className="tl-item">
                <div className="tl-time">{item.time}</div>
                <div className={`tl-dot ${item.featured ? 'red-dot-tl' : ''}`}></div>
                <div className={`tl-card ${item.featured ? 'featured-tl' : ''}`}>
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-desc">{item.desc}</div>
                  <div className="tl-day">{item.day}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
