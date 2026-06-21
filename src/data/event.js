export const EVENT = {
  college: {
    name: "TKR COLLEGE OF ENGINEERING & TECHNOLOGY",
    sub: "(Autonomous) | Dept. of CSE",
    sponsored: "Sponsored by TKR Educational Society",
    approved: "Approved by AICTE | Affiliated by JNTUH",
    accredited: "Accredited by NBA & NAAC with 'A+' Grade",
    fullFooter: "TKR College of Engineering & Technology (Autonomous) — Dept. of CSE"
  },
  department: "DEPARTMENT OF CSE",
  title: {
    part1: "QUANTUM",
    part2: "ARENA"
  },
  duration: "36 hr",
  type: "HACKATHON",
  tagline: "PLAY. HACK. WIN.",
  subTagline: "< CODE. BUILD. SOLVE. SURVIVE. >",
  registration: {
    fee: 899,
    currency: "₹",
    per: "person",
    link: "#register"
  },
  dates: [
    { day: "06", suffix: "TH", month: "AUG", isFeatured: false },
    { day: "07", suffix: "TH", month: "AUG", isFeatured: true, badge: "⏱ 36 HOURS" },
    { day: "08", suffix: "TH", month: "AUG", isFeatured: false }
  ],
  systemStatus: [
    { label: "CREATIVITY", width: "100%", value: "100%" },
    { label: "COFFEE", width: "100%", value: "100%" },
    { label: "SLEEP", width: "0%", value: "0%" },
    { label: "FOCUS", width: "100%", value: "MAX", isFocus: true }
  ],
  bootLines: [
    '> sudo ideas --build',
    '> git commit -m "Innovate"',
    '> git push origin greatness',
    '> ./change_the_game.sh',
  ],
  bootSuccess: "SUCCESS_",
  gameLoop: [
    { type: "kw", text: "while", content: " (problem) {" },
    { type: "fn", text: "think", content: "();", indent: true },
    { type: "fn", text: "code", content: "();", indent: true },
    { type: "fn", text: "debug", content: "();", indent: true },
    { type: "fn", text: "iterate", content: "();", indent: true },
    { type: "fn red", text: "win", content: "();", indent: true },
    { type: "text", text: "}" },
    { type: "comment", text: "// Be the last one standing." }
  ],
  about: {
    tag: "// MISSION_BRIEFING",
    title: { prefix: "WHAT IS", highlight: "QUANTUM ARENA?" },
    paragraphs: [
      "Quantum Arena is TKR College of Engineering & Technology's flagship <strong>36-hour hackathon</strong>, where the sharpest minds collide to build the future.",
      "Hosted by the Department of Computer Science & Engineering, this battle-ground event invites developers, designers, and innovators to <strong>Code. Build. Solve. Survive.</strong>",
      "Forget sleep. Forget comfort zones. Only the strongest solutions will be left standing."
    ],
    stats: [
      { num: "36", label: "HOURS" },
      { num: "6", label: "TRACKS" },
      { num: "₹899", label: "PER PERSON" },
      { num: "∞", label: "POSSIBILITIES", isRed: true }
    ],
    terminal: {
      title: "quantum_arena.sh",
      lines: [
        { type: "cmd", prompt: "$", text: "./register.sh" },
        { type: "out", text: "Initializing team setup..." },
        { type: "out", text: "Loading problem statements..." },
        { type: "out", text: "Deploying workspace..." },
        { type: "out", text: "Starting 36h countdown..." },
        { type: "out red", text: "[WARNING] Sleep mode disabled." },
        { type: "out green", text: "[SUCCESS] You are now in the Arena." },
        { type: "cmd cursor", prompt: "$", text: "█" }
      ]
    }
  },
  tracks: {
    tag: "// TECH_STACK",
    title: { prefix: "BATTLE", highlight: "TRACKS" },
    items: [
      { id: "web", icon: "</>", name: "WEB", desc: "Full-stack web applications, progressive web apps, browser-based tools — build for the open internet.", tags: ["HTML", "React", "Node.js"] },
      { id: "app", icon: "{}", name: "APP DEV", desc: "Mobile apps, cross-platform solutions, native experiences — put power in everyone's pocket.", tags: ["Flutter", "React Native", "Android"] },
      { id: "db", icon: "⬡", name: "DATABASE", desc: "Data engineering, pipeline design, schema architecture — make data work for you.", tags: ["PostgreSQL", "MongoDB", "Redis"] },
      { id: "ai", icon: "🧠", name: "AI / ML", desc: "Intelligent systems, LLMs, computer vision, NLP — build machines that think.", tags: ["TensorFlow", "PyTorch", "OpenAI"], featured: true, badge: "HOT" },
      { id: "cloud", icon: "☁", name: "CLOUD", desc: "Scalable infrastructure, serverless, DevOps — architect for reliability and scale.", tags: ["AWS", "GCP", "Docker"] },
      { id: "sec", icon: "🔒", name: "CYBERSEC", desc: "Ethical hacking, vulnerability research, security tooling — defend the digital frontier.", tags: ["CTF", "Pen Testing", "Forensics"] }
    ]
  },
  timeline: {
    tag: "// EVENT_TIMELINE",
    title: { prefix: "36 HOUR", highlight: "COUNTDOWN" },
    tabs: [
      { id: "t1", label: "AUG 06", active: true },
      { id: "t2", label: "AUG 07" },
      { id: "t3", label: "AUG 08" }
    ],
    items: [
      { time: "09:00 AM", title: "Registration & Check-In", desc: "Report, collect kits, set up your arena station.", day: "Day 1 — Aug 06" },
      { time: "11:00 AM", title: "Opening Ceremony", desc: "Problem statements released. The clock starts. No turning back.", day: "Day 1 — Aug 06" },
      { time: "11:00 AM", title: "⚡ HACK BEGINS", desc: "36 hours of pure adrenaline. Code. Build. Solve. Survive.", day: "Aug 06 → Aug 08", featured: true },
      { time: "11:00 PM", title: "Mid-Night Mentoring", desc: "Expert mentors available. Fuel up, debug, push through.", day: "Day 1 Night — Aug 06" },
      { time: "06:00 AM", title: "Progress Check", desc: "Jury walkthrough. Show what you've built. Iterate fast.", day: "Day 2 — Aug 07" },
      { time: "11:00 AM", title: "⏱ SUBMISSION DEADLINE", desc: "Final submissions locked. Commit your last line of code.", day: "Day 3 — Aug 08", featured: true },
      { time: "02:00 PM", title: "Final Presentations", desc: "Demo your project to the judges. 5 minutes. Make it count.", day: "Day 3 — Aug 08" },
      { time: "05:00 PM", title: "🏆 Results & Closing", desc: "Winners crowned. Only the strongest survive the Arena.", day: "Day 3 — Aug 08" }
    ]
  },
  prizes: {
    tag: "// PRIZE_POOL",
    title: { prefix: "WINNERS", highlight: "TAKE ALL" },
    items: [
      { class: "second", rank: "02", crown: "🥈", title: "1ST RUNNER UP", amount: "₹ TBA", perks: ["+ Certificates", "+ Goodies", "+ Internship Referrals"] },
      { class: "first", rank: "01", crown: "👑", title: "WINNER", amount: "₹ TBA", badge: "CHAMPIONS", perks: ["+ Trophies", "+ Certificates", "+ Goodies", "+ Premium Goodies"] },
      { class: "third", rank: "03", crown: "🥉", title: "2ND RUNNER UP", amount: "₹ TBA", perks: ["+ Certificates", "+ Goodies"] }
    ],
    note: "* Exact prize amounts will be announced at the opening ceremony. All participants receive participation certificates."
  },
  rules: {
    tag: "// ARENA_RULES",
    title: { prefix: "RULES OF THE", highlight: "ARENA" },
    items: [
      { num: "R01", text: "Teams of 2–4 members. Solo entries not permitted." },
      { num: "R02", text: "All code must be written during the hackathon. No pre-built projects." },
      { num: "R03", text: "Open source libraries and APIs are allowed. Credit all third-party tools." },
      { num: "R04", text: "Projects must align with one of the six designated tech tracks." },
      { num: "R05", text: "Plagiarism or use of existing solutions leads to immediate disqualification." },
      { num: "R06", text: "Judges' decisions are final. No appeals after announcement." },
      { num: "R07", text: "Participants are responsible for their own devices and power banks." },
      { num: "R08", text: "Maintain decorum. Any misconduct results in immediate elimination." }
    ]
  },
  faq: {
    tag: "// FAQ_DATABASE",
    title: { prefix: "FREQUENTLY", highlight: "ASKED" },
    items: [
      { q: "Who can participate?", a: "Any student from any college or university can participate. The hackathon is open to all engineering and technology students across disciplines." },
      { q: "What is the team size?", a: "Teams must have a minimum of 1 and a maximum of 4 members." },
      { q: "What is the registration fee?", a: "The registration fee is ₹899 per person. Scan the QR code or contact the coordinators to register." },
      { q: "Will food and accommodation be provided?", a: "Yes! Food will be provided throughout the 36-hour event. Accommodation arrangements will be shared upon registration confirmation." },
      { q: "What should I bring?", a: "Bring your laptop, chargers, power banks, and any hardware you plan to use. A valid college ID is mandatory for check-in." },
      { q: "What happens after I register?", a: "You'll receive a confirmation email with event details, venue information, and pre-hackathon guidelines. Stay tuned to our announcements." }
    ]
  },
  queries: {
    title: "FOR ANY QUERIES",
    contacts: [
      { name: "USHASWINI", phone: "7093317923" },
      { name: "RAJESH", phone: "9642001784" }
    ]
  },
  team: {
    tag: "// ARENA_COMMAND",
    title: { prefix: "THE", highlight: "TEAM" },
    groups: [
      { title: "Chief Patrons", members: [{ name: "Dr. T. Harinath Reddy" }, { name: "Sri. T. Amarnath Reddy" }] },
      { title: "Patron", members: [{ name: "Dr. A. Ramaswami Reddy", sub: "(Principal)" }] },
      { title: "Convenor", members: [{ name: "Dr. Manjunath Gadiparthi" }] },
      { title: "Staff Coordinators", members: [{ name: "K Naga Maha Lakshmi" }, { name: "P Laxmi Prasanna" }, { name: "P Kishore" }, { name: "B Srikanth" }] },
      { title: "Student Coordinators", members: [
        { name: "Ushaswini", num: "7093317923", sub: "(President)" },
        { name: "Prasanna Laxmi", num: "8309256846", sub: "(Vice President)" },
        { name: "Navadeep", num: "8919318677", sub: "(Secretary)" },
        { name: "Rajesh", num: "9642001784", sub: "(Treasurer)" }
      ]}
    ]
  },
  formSelects: {
    tracks: [
      "Web Development", "App Development", "Database Engineering", 
      "AI / Machine Learning", "Cloud Computing", "Cybersecurity"
    ],
    sizes: [
      "1 Member", "2 Members", "3 Members", "4 Members"
    ],
    branches: [
      "CSE", "CSD", "CSM", "IT", "CIVIL", "MECH", "ECE", "EEE", "Other"
    ],
    years: [
      "1st", "2nd", "3rd", "4th", "Diploma", "Graduated"
    ]
  }
};

export const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "TRACKS", href: "#tracks" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "PRIZES", href: "#prizes" },
  { label: "FAQ", href: "#faq" },
];
