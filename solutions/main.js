/* ══════════════════════════════════════
   TECH MEOL GROUP — solutions.js
   ══════════════════════════════════════ */

(function () {
  'use strict';

  const navbar    = document.getElementById('navbar');
  const heroBg    = document.getElementById('heroBg');
  const hamburger = document.getElementById('hamburger');

  /* ── 1. Navbar scroll ── */
  function handleNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  /* ── 2. Hero parallax ── */
  function handleParallax() {
    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }
  }

  /* ── 3. Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => revealObs.observe(el));

  /* ── 4. Vertical solution tabs ── */
  const solTabs   = document.querySelectorAll('.sol-tab');
  const solPanels = document.querySelectorAll('.sol-panel');

  solTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.sol;

      solTabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      solPanels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.getElementById('sol-' + key);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── 5. Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 6. Hamburger mobile menu ── */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      let menu = document.getElementById('mobileMenu');
      if (menu) { menu.remove(); return; }

      menu = document.createElement('div');
      menu.id = 'mobileMenu';
      Object.assign(menu.style, {
        position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
        background: 'rgba(10,28,46,0.98)', zIndex: '99',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
        animation: 'fadeIn 0.25s ease',
      });

      [['About', 'about.html'], ['Services', 'index.html#services'],
       ['Solutions', 'solutions.html'], ['Contact', 'index.html#cta']].forEach(([text, href]) => {
        const a = document.createElement('a');
        a.href = href; a.textContent = text;
        Object.assign(a.style, {
          fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem',
          fontWeight: '300', color: 'white', textDecoration: 'none',
          letterSpacing: '0.04em', transition: 'color 0.2s',
        });
        a.addEventListener('mouseenter', () => (a.style.color = '#E8670A'));
        a.addEventListener('mouseleave', () => (a.style.color = 'white'));
        a.addEventListener('click', () => menu.remove());
        menu.appendChild(a);
      });

      const close = document.createElement('button');
      close.textContent = '✕';
      Object.assign(close.style, {
        position: 'absolute', top: '1.5rem', right: '2rem',
        background: 'none', border: 'none',
        color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', cursor: 'pointer',
      });
      close.addEventListener('click', () => menu.remove());
      menu.appendChild(close);
      document.body.appendChild(menu);
    });
  }

  /* ── 7. Footer year ── */
  const yr = document.getElementById('footerYear');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── 8. RAF-throttled scroll ── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { handleNavbar(); handleParallax(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  handleNavbar();
})();