/* ══════════════════════════════════════
   TECH MEOL GROUP — about.js
   ══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM refs ── */
  const navbar    = document.getElementById('navbar');
  const heroBg    = document.getElementById('heroBg');
  const hamburger = document.getElementById('hamburger');

  /* ══════════════════════════════════════
     1. NAVBAR scroll state
     ══════════════════════════════════════ */
  function handleNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  /* ══════════════════════════════════════
     2. HERO PARALLAX
     ══════════════════════════════════════ */
  function handleParallax() {
    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  }

  /* ══════════════════════════════════════
     3. SCROLL REVEAL
     ══════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ══════════════════════════════════════
     4. TABS — interactive capability panels
     ══════════════════════════════════════ */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      /* Update buttons */
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      /* Update panels */
      tabPanels.forEach((panel) => {
        panel.classList.remove('active');
      });
      const targetPanel = document.getElementById('tab-' + target);
      if (targetPanel) {
        targetPanel.classList.add('active');

        /* Scroll capabilities section into view if panel switches below fold */
        const capSection = document.getElementById('capabilities');
        if (capSection) {
          const rect = capSection.getBoundingClientRect();
          if (rect.top < -60) {
            const offset = navbar.offsetHeight + 24;
            const top = capSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    });
  });

  /* ══════════════════════════════════════
     5. SMOOTH SCROLL — anchor links
     ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ══════════════════════════════════════
     6. HAMBURGER — mobile menu
     ══════════════════════════════════════ */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      let mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) { mobileMenu.remove(); return; }

      mobileMenu = document.createElement('div');
      mobileMenu.id = 'mobileMenu';
      Object.assign(mobileMenu.style, {
        position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
        background: 'rgba(10,28,46,0.98)',
        zIndex: '99',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
        animation: 'fadeIn 0.25s ease',
      });

      const links = ['About', 'Services', 'Why Us', 'Contact'];
      const hrefs = ['index.html#about', 'index.html#services', 'index.html#stats', 'index.html#cta'];

      links.forEach((text, i) => {
        const a = document.createElement('a');
        a.href = hrefs[i];
        a.textContent = text;
        Object.assign(a.style, {
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.6rem', fontWeight: '300',
          color: 'white', textDecoration: 'none',
          letterSpacing: '0.04em', transition: 'color 0.2s',
        });
        a.addEventListener('mouseenter', () => (a.style.color = '#E8670A'));
        a.addEventListener('mouseleave', () => (a.style.color = 'white'));
        a.addEventListener('click', () => mobileMenu.remove());
        mobileMenu.appendChild(a);
      });

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      Object.assign(closeBtn.style, {
        position: 'absolute', top: '1.5rem', right: '2rem',
        background: 'none', border: 'none',
        color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', cursor: 'pointer',
      });
      closeBtn.addEventListener('click', () => mobileMenu.remove());
      mobileMenu.appendChild(closeBtn);
      document.body.appendChild(mobileMenu);
    });
  }

  /* ══════════════════════════════════════
     7. FOOTER YEAR
     ══════════════════════════════════════ */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════
     8. SCROLL LISTENER (rAF throttle)
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

  handleNavbar();

})();

