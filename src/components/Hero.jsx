import { EVENT } from "../data/event.js";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg-grid"></div>
      <div className="circuit-lines"></div>

      <div className="squid-shapes-container">
        <div className="squid-shape squid-circle">
          <svg viewBox="0 0 100 100" className="shape-svg">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
        <div className="squid-shape squid-square">
          <div className="audio-visualizer">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="vis-bar" style={{ "--i": i }}></div>
            ))}
          </div>
          <svg viewBox="0 0 100 100" className="shape-svg">
            <rect x="15" y="15" width="70" height="70" />
          </svg>
        </div>
        <div className="squid-shape squid-triangle">
          <svg viewBox="0 0 100 100" className="shape-svg">
            <polygon points="50,10 90,85 10,85" />
          </svg>
        </div>
      </div>

      <div className="hud hud-left">
        {EVENT.bootLines.map((line, i) => (
          <div key={i} className="hud-line">
            {line}
          </div>
        ))}
        <div className="hud-line success">
          {EVENT.bootSuccess}
          <span className="cursor">█</span>
        </div>
      </div>

      <div className="hud hud-right">
        <div className="hud-title">// SYSTEM STATUS</div>
        {EVENT.systemStatus.map((stat, i) => (
          <div key={i} className="hud-stat">
            <span>{stat.label}</span>
            <span className={`bar ${stat.isFocus ? "focus-bar" : ""}`}>
              <span style={{ width: stat.width }}></span>
            </span>
            <span className="val">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-tagline">
          {EVENT.tagline.split(" ").map((word, i) =>
            word === "HACK." ? (
              <span key={i} className="red blink-text">
                {" "}
                {word}{" "}
              </span>
            ) : (
              <span key={i}>{word} </span>
            ),
          )}
        </div>
        <div className="hero-dept">{EVENT.department}</div>
        <h1 className="hero-title">
          <span className="title-quantum">
            QU<span className="u-special">Δ</span>NTUM
          </span>
          <span className="title-arena">
            ΔREN<span className="a-special">Δ</span>
          </span>
        </h1>
        <div className="hero-sub">
          <span className="dash">—</span>
          <span className="hero-36">{EVENT.duration}</span>
          <span className="hero-hack">{EVENT.type}</span>
          <span className="dash">—</span>
        </div>
        <div className="hero-code-motto">
          {EVENT.subTagline.split("SURVIVE.").map((part, i) =>
            i === 0 ? (
              <span key={i}>
                {part}
                <span className="red">SURVIVE.</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </div>

        <div className="hero-dates">
          {EVENT.dates.map((date, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className={`date-card ${date.isFeatured ? "featured" : ""}`}>
                <span className="date-num">
                  {date.day}
                  <sup>{date.suffix}</sup>
                </span>
                <span className="date-month">{date.month}</span>
                {date.badge && <span className="date-badge">{date.badge}</span>}
              </div>
              {i < EVENT.dates.length - 1 && (
                <div className="date-divider">—</div>
              )}
            </div>
          ))}
        </div>

        <div className="hero-ctas">
          <a href={EVENT.registration.link} className="btn-primary">
            REGISTER NOW — {EVENT.registration.currency}
            {EVENT.registration.fee}/{EVENT.registration.per}
          </a>
          <a href="#about" className="btn-ghost">
            LEARN MORE
          </a>
        </div>
      </div>

      <div className="code-hud">
        {EVENT.gameLoop.map((line, i) => (
          <div
            key={i}
            className={`code-line ${line.indent ? "indent" : ""} ${line.type === "comment" ? "comment" : ""}`}
          >
            {line.type === "comment" ? (
              line.text
            ) : line.type === "text" ? (
              line.text
            ) : (
              <>
                <span className={line.type}>{line.text}</span>
                {line.content}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="scroll-hint">
        SCROLL TO ENTER <span className="arrow-down">↓</span>
      </div>
    </section>
  );
}
