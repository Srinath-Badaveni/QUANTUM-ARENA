import { EVENT } from '../data/event.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">{EVENT.title.part1}<span className="red">{EVENT.title.part2}</span></span>
          <span className="logo-bracket">]</span>
        </div>
        <div className="footer-tagline">{EVENT.subTagline.split('SURVIVE.').map((part, i) => i === 0 ? <span key={i}>{part.replace('< ', '').replace(' >', '')}<span className="red">SURVIVE.</span></span> : <span key={i}>{part}</span>)}</div>
        <div className="footer-college">{EVENT.college.fullFooter}</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {EVENT.title.part1} {EVENT.title.part2}. All rights reserved.</span>
          <span className="footer-pulse">● ARENA ACTIVE</span>
        </div>
      </div>
    </footer>
  );
}
