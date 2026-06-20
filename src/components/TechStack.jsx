import { EVENT } from "../data/event.js";
import Icon from "./Icon.jsx";

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative border-b border-redline/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="font-term text-redline uppercase tracking-widest text-xs mb-3">
            // pick your weapon
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase">
            Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {EVENT.techStack.map((t) => (
            <div
              key={t.label}
              className="bracket-panel flex flex-col items-center justify-center gap-3 py-8 px-3 hover:shadow-red-glow transition-shadow group"
            >
              <Icon
                name={t.icon}
                className="w-8 h-8 text-redline group-hover:text-white transition-colors"
              />
              <span className="font-term text-xs uppercase tracking-widest text-ash group-hover:text-white transition-colors">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
