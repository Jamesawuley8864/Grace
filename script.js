// Basic interactivity: mobile menu, smooth links, form stub, theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');
  const menuSpan = menuBtn && menuBtn.querySelectorAll('span');
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // mobile menu toggle
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });
  }

  // smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav on selection
        if (nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // contact form fake submission (client-side)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        status.textContent = 'Please fill all fields.';
        status.style.color = 'crimson';
        return;
      }
      // For demo: use mailto fallback
      const mailto = mailto:blessing@example.com?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + '\nEmail: ' + email)};
      window.location.href = mailto;
      status.textContent = 'Opening your mail client...';
      status.style.color = 'green';
    });
  }

  // set year in footer
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // theme toggle (persist in localStorage)
  const THEME_KEY = 'blessing_theme';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') root.setAttribute('data-theme','dark');

  function updateThemeButton(){
    themeBtn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀' : '🌙';
  }
  if (themeBtn){
    updateThemeButton();
    themeBtn.addEventListener('click', () => {
      const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (now === 'dark') root.setAttribute('data-theme','dark');
      else root.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, now);
      updateThemeButton();
    });
  }
});

// Theme toggle — robust version
const THEME_KEY = 'blessing_theme';
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  // update button label + text
  if (themeBtn) {
    themeBtn.textContent = theme === 'dark' ? '☀' : '🌙';
    themeBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
}

// decide initial theme:
// 1) explicit saved choice in localStorage
// 2) else follow system preference if available
// 3) default to light
let saved = localStorage.getItem(THEME_KEY);
if (saved !== 'dark' && saved !== 'light') {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  saved = prefersDark ? 'dark' : 'light';
}
applyTheme(saved);

// wire the button
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}