/* ============================================
   QUANTUM ARENA — main.js
   Interactive behaviors
   ============================================ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ── Timeline date tab ──
document.querySelectorAll('.tdate').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tdate').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── Registration form ──
function handleRegister(e) {
  e.preventDefault();
  const form = document.getElementById('regForm');
  const success = document.getElementById('regSuccess');
  form.style.display = 'none';
  success.style.display = 'block';
}

// ── Intersection Observer — scroll reveal ──
const revealEls = document.querySelectorAll(
  '.track-card, .tl-item, .prize-card, .rule-item, .stat-box, .coord-group'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add base hidden styles via JS so CSS-only works if JS disabled
revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.08}s, transform 0.5s ease ${(i % 6) * 0.08}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Re-observe after DOM ready
  revealEls.forEach(el => observer.observe(el));
});

// Revealed state
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ── Glitch effect on hero title ──
const titleArena = document.querySelector('.title-arena');
if (titleArena) {
  setInterval(() => {
    titleArena.style.textShadow = `
      0 0 60px rgba(232,0,15,0.6),
      0 0 120px rgba(232,0,15,0.3),
      ${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px 0 #6b0005,
      ${Math.random() * 10 - 5}px ${Math.random() * 6 - 3}px 0 #3d0003
    `;
    setTimeout(() => {
      titleArena.style.textShadow = `
        0 0 60px rgba(232,0,15,0.4),
        0 0 120px rgba(232,0,15,0.2),
        3px 3px 0 #6b0005,
        6px 6px 0 #3d0003
      `;
    }, 80);
  }, 3000 + Math.random() * 2000);
}

// ── Typewriter effect on terminal ──
const tLines = document.querySelectorAll('.t-line.out');
tLines.forEach((line, i) => {
  const text = line.textContent;
  line.textContent = '';
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.opacity = '1';
    let j = 0;
    const interval = setInterval(() => {
      if (j < text.length) {
        line.textContent += text[j++];
      } else {
        clearInterval(interval);
      }
    }, 30);
  }, i * 400 + 800);
});

// ── Counter animation for stats ──
function animateCounter(el, target, prefix = '', suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = prefix + target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = prefix + Math.floor(start) + suffix;
    }
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num:not(.red)');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.trim();
      if (raw === '36') animateCounter(el, 36);
      if (raw === '6') animateCounter(el, 6);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statsObserver.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sTop = section.offsetTop - 80;
    if (window.scrollY >= sTop) current = section.id;
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = '#e8000f';
    }
  });
}, { passive: true });

console.log('%c QUANTUM ARENA ', 'background:#e8000f;color:#fff;font-size:20px;font-weight:bold;padding:8px 16px;');
console.log('%c CODE. BUILD. SOLVE. SURVIVE.', 'color:#e8000f;font-family:monospace;font-size:12px;');
