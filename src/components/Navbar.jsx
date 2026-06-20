import { EVENT, NAV_LINKS } from '../data/event.js';

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="nav-inner">
        <div className="nav-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">{EVENT.title.part1}<span className="red">{EVENT.title.part2}</span></span>
          <span className="logo-bracket">]</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
          <li><a href={EVENT.registration.link} className="nav-cta">REGISTER_</a></li>
        </ul>
        <button className="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
