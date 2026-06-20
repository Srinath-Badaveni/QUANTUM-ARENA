// Minimal hand-rolled icon set so the project has zero extra runtime
// dependencies. Add more paths here if you extend the tech stack list.

const paths = {
  code: (
    <path
      d="M9 18 3 12l6-6M15 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  braces: (
    <path
      d="M8 4c-2 0-3 1-3 3v2c0 1.2-.6 2-2 2 1.4 0 2 .8 2 2v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.2.6 2 2 2-1.4 0-2 .8-2 2v2c0 2-1 3-3 3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  database: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5.5" rx="7" ry="2.7" />
      <path d="M5 5.5V18c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7V5.5" />
      <path d="M5 11.8c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7" />
    </g>
  ),
  brain: (
    <path
      d="M9 4.5C6.5 4.5 5 6.3 5 8.3c0 1-.4 1.6-1 2.1.6.5 1 1.2 1 2.2 0 2 1.6 3.4 3.6 3.4.4 1.6 1.8 2.6 3.4 2.6s3-1 3.4-2.6c2 0 3.6-1.4 3.6-3.4 0-1 .4-1.7 1-2.2-.6-.5-1-1.1-1-2.1 0-2-1.5-3.8-4-3.8-1 0-1.8.4-2.4 1-.6-.6-1.4-1-2.4-1Z M12 4.5V19.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cloud: (
    <path
      d="M7 18a4 4 0 0 1-.4-7.98A5 5 0 0 1 16.3 8.1 4.5 4.5 0 0 1 17.5 18H7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  lock: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </g>
  ),
  terminal: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M7 9l3 3-3 3M12 15h5" />
    </g>
  ),
  bolt: (
    <path
      d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  qr: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="6" height="6" />
      <rect x="15" y="3" width="6" height="6" />
      <rect x="3" y="15" width="6" height="6" />
      <path d="M15 15h2v2h-2zM19 15h2v6h-6v-2h4zM15 21v-2" />
    </g>
  ),
  phone: (
    <path
      d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function Icon({ name, className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {paths[name] ?? null}
    </svg>
  );
}
