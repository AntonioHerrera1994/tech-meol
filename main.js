/* ══════════════════════════════════════
   TECH MEOL GROUP — main.js
   ══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM refs ── */
  const navbar     = document.getElementById('navbar');
  const parallaxBg = document.getElementById('parallaxBg');
  const hamburger  = document.getElementById('hamburger');

  /* ══════════════════════════════════════
     1. NAVBAR — scroll state
     ══════════════════════════════════════ */
  function handleNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ══════════════════════════════════════
     2. PARALLAX HERO
     ══════════════════════════════════════ */
  function handleParallax() {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.5 && parallaxBg) {
      parallaxBg.style.transform = `translateY(${y * 0.38}px)`;
    }
  }

  /* ══════════════════════════════════════
     3. SCROLL REVEAL
     ══════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        /* Stagger cards inside a grid */
        const parent = entry.target.closest('.services-grid, .stats-inner');
        if (parent) {
          const siblings = Array.from(
            parent.querySelectorAll('.reveal, .reveal-left')
          );
          const index = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), index * 100);
        } else {
          entry.target.classList.add('visible');
        }

        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ══════════════════════════════════════
     4. SMOOTH SCROLL — anchor links
     ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ══════════════════════════════════════
     5. HAMBURGER — mobile menu
     ══════════════════════════════════════ */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      let mobileMenu = document.getElementById('mobileMenu');

      if (mobileMenu) {
        mobileMenu.remove();
        return;
      }

      mobileMenu = document.createElement('div');
      mobileMenu.id = 'mobileMenu';
      Object.assign(mobileMenu.style, {
        position:       'fixed',
        top:            '0',
        left:           '0',
        right:          '0',
        bottom:         '0',
        background:     'rgba(10,28,46,0.98)',
        zIndex:         '99',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '2.5rem',
        animation:      'fadeIn 0.25s ease',
      });

      const links  = ['About', 'Services', 'Why Us', 'Contact'];
      const hrefs  = ['#about', '#services', '#stats', '#cta'];

      links.forEach((text, i) => {
        const a = document.createElement('a');
        a.href      = hrefs[i];
        a.textContent = text;
        Object.assign(a.style, {
          fontFamily:  "'Cormorant Garamond', serif",
          fontSize:    '2.6rem',
          fontWeight:  '300',
          color:       'white',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          transition:  'color 0.2s',
        });
        a.addEventListener('mouseenter', () => (a.style.color = '#E8670A'));
        a.addEventListener('mouseleave', () => (a.style.color = 'white'));
        a.addEventListener('click', () => mobileMenu.remove());
        mobileMenu.appendChild(a);
      });

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      Object.assign(closeBtn.style, {
        position:  'absolute',
        top:       '1.5rem',
        right:     '2rem',
        background: 'none',
        border:    'none',
        color:     'rgba(255,255,255,0.4)',
        fontSize:  '1.5rem',
        cursor:    'pointer',
      });
      closeBtn.addEventListener('click', () => mobileMenu.remove());
      mobileMenu.appendChild(closeBtn);

      document.body.appendChild(mobileMenu);
    });
  }

  /* ══════════════════════════════════════
     6. STAT COUNTER ANIMATION
     ══════════════════════════════════════ */
  const statsSection = document.getElementById('stats');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        document.querySelectorAll('.stat-number').forEach((el) => {
          const raw = el.textContent.trim();
          const num = parseFloat(raw);
          if (isNaN(num)) return;

          const suffix   = raw.replace(/[\d.]+/, '');
          const duration = 1400;
          const start    = performance.now();

          function step(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease     = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
            el.textContent = Math.round(num * ease) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
        });

        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  if (statsSection) counterObserver.observe(statsSection);

  /* ══════════════════════════════════════
     7. FOOTER YEAR — auto-update copyright
     ══════════════════════════════════════ */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════
     8. SCROLL LISTENER (throttled via rAF)
     ══════════════════════════════════════ */
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbar();
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* Run once on load */
  handleNavbar();

})();