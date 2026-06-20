import { EVENT } from '../data/event.js';

export default function Tracks() {
  return (
    <section className="tracks" id="tracks">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{EVENT.tracks.tag}</span>
          <h2 className="section-title">{EVENT.tracks.title.prefix} <span className="red">{EVENT.tracks.title.highlight}</span></h2>
        </div>
        <div className="tracks-grid">
          {EVENT.tracks.items.map(track => (
            <div key={track.id} className={`track-card ${track.featured ? 'featured-track' : ''}`} data-track={track.id}>
              {track.badge && <div className="track-badge">{track.badge}</div>}
              <div className="track-icon">{track.icon}</div>
              <div className="track-name">{track.name}</div>
              <div className="track-desc">{track.desc}</div>
              <div className="track-tags">
                {track.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
