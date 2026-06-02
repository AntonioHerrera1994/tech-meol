(function () {
  'use strict';

  /* ═══════════════════════════════════
     CONFIG — edit once, updates everywhere
     ═══════════════════════════════════ */

  const BRAND = {
    href:       '/',
    logoLight:  '/assets/logoblanco.webp',   /* shown on transparent navbar */
    logoDark:   '/assets/logonegro2.png',    /* shown on scrolled white navbar */
    logoAlt:    'Tech Meol Group',
    height:     '38',                       /* px — adjust to taste */
  };

  const NAV_LINKS = [
    { label: 'Home',      href: '/'                  },
    { label: 'About',     href: '/about-us'           },
    { label: 'Solutions', href: '/solutions'          },
    { label: 'Services',  href: '/tmg-services'       },
     { label: 'Zac Tech Semi',  href: 'https://zacsemi.com.mx/'       },
    {
      label: 'Distributor',
      href:  '#',
      children: [
        { label: 'Eneron', href: 'https://zacsemi.com.mx/eneron/'                                    },
        { label: 'Visit eBay Store',                  href: 'https://www.ebay.com/str/esurplusinc2?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=dqmyxmowsmm&sssrc=3418065&ssuid=dqmyxmowsmm&stype=1&widget_ver=artemis&media=COPY', ext: true},
      ],
    },
  ];

  const NAV_CTA = { label: 'Let us help you', href: 'mailto:contact@techmeol.com' };

  const FOOTER = {
    topBand: {
      text:   'Ready to convert your surplus assets into capital? Our team responds within 24 hours.',
      strong: 'Ready to convert your surplus assets into capital?',
      cta:    { label: 'Let us help you', href: 'mailto:contact@techmeol.com' },
    },
    brand: {
      desc:  'Established as your source to quickly link the liquidity of your surplus assets into your mainstream of production — throughout the lifetime of your equipment.',
      badge: 'Certified Business Partner',
    },
    socials: [
      { icon: 'ti-brand-linkedin', label: 'LinkedIn',   href: 'https://www.linkedin.com/groups/14466684/', ext: true  },
      { icon: 'ti-shopping-bag',   label: 'eBay Store', href: 'https://www.ebay.com/str/esurplusinc2?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=dqmyxmowsmm&sssrc=3418065&ssuid=dqmyxmowsmm&stype=1&widget_ver=artemis&media=COPY' , ext: true },
      { icon: 'ti-mail',           label: 'Email',      href: 'mailto:contact@techmeol.com' },
      { icon: 'ti-phone',          label: 'Phone',      href: 'tel:+14084939296' },
    ],
    cols: [
      {
        title: 'Services',
        links: [
          { label: 'WareHousing', href: '/tmg-services' },
          { label: 'Logistics',      href: '/tmg-services' },
          { label: 'Rigging', href: '/tmg-services' },
          { label: 'Valuation',      href: '/tmg-services' },
          { label: 'Crating / Packaging',        href: '/tmg-services' },
          { label: 'Costs & Fees are Credited from Proceeds',        href: '/tmg-services' },
          { label: 'Monetize',        href: '/tmg-services' },
          { label: 'BUYER pays',        href: '/tmg-services' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us',      href: '/about-us'  },
          { label: 'Solutions',     href: '/solutions' },
          { label: 'Why Tech Meol', href: '/#stats'    },
          { label: 'Industries',    href: '#'          },
  
          { label: 'Contact',       href: 'mailto:contact@techmeol.com'   },
        ],
      },
      {
        title: 'Contact',
        contact: [
          { icon: 'ti-mail',    text: 'contact@techmeol.com'          },
          { icon: 'ti-phone',   text: '+1 (408) 493-9296'               },
          { icon: 'ti-map-pin', text: 'United States<br>Nationwide Service' },
     
        ],
      },
    ],
    legal: [
      { label: 'Privacy Policy',   href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Sitemap',          href: '#' },
    ],
  };

  /* ═══════════════════════════════════
     INJECT SHARED CSS
     ═══════════════════════════════════ */

  function injectStyles() {
    if (document.getElementById('tmg-shared-css')) return;
    const style = document.createElement('style');
    style.id = 'tmg-shared-css';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Barlow:wght@300;400;500;600&display=swap');

      :root {
        --tmg-white:       #ffffff;
        --tmg-off-white:   #f8f8f6;
        --tmg-orange:      #E8670A;
        --tmg-orange-lt:   #f07d28;
        --tmg-orange-dim:  #fdeede;
        --tmg-navy:        #0f2540;
        --tmg-navy-mid:    #1a3a5c;
        --tmg-gray-100:    #f4f4f2;
        --tmg-gray-200:    #e8e8e4;
        --tmg-gray-500:    #7a8290;
        --tmg-gray-700:    #3d4452;
        --tmg-ink:         #111418;
        --tmg-font-d:      'Cormorant Garamond', Georgia, serif;
        --tmg-font-b:      'Barlow', system-ui, sans-serif;
        --tmg-radius:      4px;
        --tmg-shadow-sm:   0 2px 12px rgba(15,37,64,0.07);
        --tmg-shadow-md:   0 8px 40px rgba(15,37,64,0.12);
        --tmg-shadow-lg:   0 20px 60px rgba(15,37,64,0.16);
        --tmg-ease:        0.3s cubic-bezier(0.4,0,0.2,1);
      }

      /* ══ NAVBAR ══ */
      #navbar {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 3.5rem;
        transition: background var(--tmg-ease), box-shadow var(--tmg-ease), padding var(--tmg-ease);
      }
      #navbar.scrolled {
        background: rgba(255,255,255,0.97);
        box-shadow: 0 1px 0 var(--tmg-gray-200);
        padding: 0.6rem 3.5rem;
        backdrop-filter: blur(12px);
      }

      /* ── Dual logo ── */
      .nav-brand {
        display: flex;
        align-items: center;
        text-decoration: none;
        flex-shrink: 0;
      }
      .nav-logo {
        display: block;
        height: 38px;         /* fallback; overridden inline */
        width: auto;
        object-fit: contain;
        transition: opacity 0.25s ease;
        position: absolute;
      }
      /* light logo visible by default (transparent navbar) */
      .nav-logo--light { opacity: 1;  pointer-events: auto;  }
      .nav-logo--dark  { opacity: 0;  pointer-events: none;  }
      /* swap when scrolled */
      #navbar.scrolled .nav-logo--light { opacity: 0; pointer-events: none; }
      #navbar.scrolled .nav-logo--dark  { opacity: 1; pointer-events: auto; }
      /* spacer keeps the link the right width */
      .nav-logo-spacer {
        display: block;
        height: 38px;
        width: auto;
        visibility: hidden;
        pointer-events: none;
      }

      /* ── Nav links ── */
      .nav-links {
        display: flex;
        align-items: center;
        gap: 2.2rem;
        list-style: none;
        margin: 0; padding: 0;
      }
      .nav-links a {
        font-family: var(--tmg-font-b);
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        transition: color var(--tmg-ease);
      }
      .nav-links a:hover,
      .nav-links a.nav-active { color: var(--tmg-orange-lt); }
      #navbar.scrolled .nav-links a { color: var(--tmg-gray-700); }
      #navbar.scrolled .nav-links a:hover,
      #navbar.scrolled .nav-links a.nav-active { color: var(--tmg-orange); }

      /* ── CTA ── */
      .nav-cta {
        padding: 0.55rem 1.4rem !important;
        background: var(--tmg-orange) !important;
        color: var(--tmg-white) !important;
        border-radius: var(--tmg-radius);
        transition: background var(--tmg-ease), transform var(--tmg-ease) !important;
      }
      .nav-cta:hover {
        background: var(--tmg-orange-lt) !important;
        transform: translateY(-1px);
        color: var(--tmg-white) !important;
      }

      /* ── Hamburger ── */
      .hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
      }
      .hamburger span {
        display: block;
        width: 24px; height: 2px;
        background: var(--tmg-white);
        border-radius: 2px;
        transition: background var(--tmg-ease);
      }
      #navbar.scrolled .hamburger span { background: var(--tmg-navy); }

      @media (max-width: 900px) {
        #navbar        { padding: 1rem 2rem; }
        #navbar.scrolled { padding: 0.65rem 2rem; }
        .nav-links     { display: none; }
        .hamburger     { display: flex; }
      }

      /* ══ DROPDOWN ══ */
      .nav-item { position: relative; }
      .nav-item > a.has-children {
        display: inline-flex; align-items: center; gap: 0.3rem;
      }
      .nav-item > a.has-children::after {
        content: '';
        display: inline-block;
        width: 6px; height: 6px;
        border-right: 1.5px solid currentColor;
        border-bottom: 1.5px solid currentColor;
        transform: rotate(45deg) translateY(-2px);
        transition: transform var(--tmg-ease), opacity var(--tmg-ease);
        opacity: 0.7;
      }
      .nav-item.open > a.has-children::after {
        transform: rotate(-135deg) translateY(-2px);
        opacity: 1;
      }
      .nav-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 50%;
        transform: translateX(-50%) translateY(6px);
        background: var(--tmg-white);
        border-radius: 8px;
        box-shadow: var(--tmg-shadow-lg);
        border: 1px solid var(--tmg-gray-200);
        min-width: 260px;
        padding: 0.5rem 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 200;
      }
      /* arrow */
      .nav-dropdown::before {
        content: '';
        position: absolute;
        top: -6px; left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 12px; height: 12px;
        background: var(--tmg-white);
        border-left: 1px solid var(--tmg-gray-200);
        border-top: 1px solid var(--tmg-gray-200);
      }
      /* hover bridge */
      .nav-dropdown::after {
        content: '';
        position: absolute;
        top: -18px; left: 0; right: 0;
        height: 18px;
      }
      .nav-item.open .nav-dropdown {
        opacity: 1;
        pointer-events: auto;
        transform: translateX(-50%) translateY(0);
      }
      .nav-dropdown a {
        display: flex !important;
        align-items: center;
        gap: 0.6rem;
        padding: 0.7rem 1.2rem !important;
        font-size: 0.82rem !important;
        font-weight: 400 !important;
        color: var(--tmg-gray-700) !important;
        letter-spacing: 0.03em !important;
        text-transform: none !important;
        text-decoration: none;
        transition: background var(--tmg-ease), color var(--tmg-ease) !important;
        white-space: nowrap;
      }
      .nav-dropdown a:hover { background: var(--tmg-orange-dim); color: var(--tmg-orange) !important; }
      .nav-dropdown a i { font-size: 15px; color: var(--tmg-orange); opacity: 0.7; flex-shrink: 0; }
      .nav-dropdown li:last-child {
        border-top: 1px solid var(--tmg-gray-200);
        margin-top: 0.3rem; padding-top: 0.3rem;
      }
      .nav-dropdown li:last-child a i { opacity: 1; }

      /* ══ FOOTER ══ */
      .tmg-footer { background: #0a1c2e; font-family: var(--tmg-font-b); color: var(--tmg-white); }

      .footer-top-band {
        background: var(--tmg-orange);
        padding: 1.1rem 3.5rem;
        display: flex; align-items: center; justify-content: space-between;
        gap: 1rem; flex-wrap: wrap;
      }
      .footer-top-band p { font-size: 17px; font-weight: 300; color: rgba(255,255,255,1); margin: 0; }
      .footer-top-band strong { color: #fff; font-weight: 600; }
      .footer-top-cta {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35);
        color: #fff; text-decoration: none; font-family: var(--tmg-font-b);
        font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
        padding: 0.55rem 1.3rem; border-radius: var(--tmg-radius);
        cursor: pointer; transition: background var(--tmg-ease); white-space: nowrap;
      }
      .footer-top-cta:hover { background: rgba(255,255,255,0.28); }
      .footer-top-cta i { font-size: 15px; }

      .footer-body {
        padding: 3.5rem 3.5rem 2.5rem;
        display: grid; grid-template-columns: 1.7fr 1fr 1fr 1fr; gap: 3rem;
      }
      .footer-logo {
        display: block; font-family: var(--tmg-font-d); font-size: 1.9rem;
        font-weight: 400; line-height: 1; margin-bottom: 1.1rem;
        color: rgba(255,255,255,0.85);
      }
      .footer-logo .lo { color: var(--tmg-orange); }
      .footer-logo .ln { color: rgba(255,255,255,0.4); font-weight: 300; }
      .footer-brand-desc {
        font-size: 17px; font-weight: 300; color: rgba(255,255,255,0.9);
        line-height: 1.8; margin-bottom: 1.6rem; text-align: justify;
      }
      .footer-socials { display: flex; gap: 0.6rem; margin-bottom: 1.2rem; }
      .footer-social-btn {
        width: 36px; height: 36px; border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.1);
        display: flex; align-items: center; justify-content: center;
        color: rgba(255,255,255,0.35); font-size: 16px; cursor: pointer;
        text-decoration: none;
        transition: border-color var(--tmg-ease), color var(--tmg-ease), background var(--tmg-ease);
      }
      .footer-social-btn:hover { border-color: var(--tmg-orange); color: var(--tmg-orange); background: rgba(232,103,10,0.1); }
      .footer-cert-badge {
        display: inline-flex; align-items: center; gap: 0.45rem;
        border: 1px solid rgba(232,103,10,0.28); border-radius: 50px;
        padding: 0.35rem 0.9rem; font-size: 0.67rem; font-weight: 500;
        letter-spacing: 0.1em; text-transform: uppercase; color: rgba(232,103,10,0.7);
      }
      .footer-cert-badge i { font-size: 13px; color: var(--tmg-orange); }
      .footer-col-title {
        font-size: 0.8rem; font-weight: 600; letter-spacing: 0.24em;
        text-transform: uppercase; color: var(--tmg-orange);
        margin-bottom: 1.3rem; padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(232,103,10,0.18);
      }
      .footer-link-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
      .footer-link-col ul li a {
        font-size: 1rem; font-weight: 300; color: rgba(255,255,255,0.9);
        text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;
        transition: color var(--tmg-ease);
      }
      .footer-link-col ul li a:hover { color: var(--tmg-orange); }
      .footer-link-col ul li a i { font-size: 13px; opacity: 0.5; }
      .footer-contact-item { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 1rem; }
      .footer-contact-item i { font-size: 17px; color: var(--tmg-orange); margin-top: 1px; flex-shrink: 0; }
      .footer-contact-item span { font-size: 1rem; font-weight: 300; color: rgba(255,255,255,0.9); line-height: 1.6; }
      .footer-rule { height: 1px; background: rgba(255,255,255,0.07); margin: 0 3.5rem; }
      .footer-bottom-bar {
        padding: 1.3rem 3.5rem;
        display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem;
      }
      .footer-bottom-bar p { font-size: 0.8rem; color: rgba(255,255,255,0.9); letter-spacing: 0.05em; margin: 0; }
      .footer-legal-links { display: flex; gap: 1.6rem; }
      .footer-legal-links a { font-size: 0.8rem; color: rgba(255,255,255,0.9); text-decoration: none; letter-spacing: 0.05em; transition: color var(--tmg-ease); }
      .footer-legal-links a:hover { color: var(--tmg-orange); }

      @media (max-width: 1024px) {
        .footer-body { grid-template-columns: 1fr 1fr; gap: 2.5rem; padding: 3rem 2.5rem 2rem; }
        .footer-top-band { padding: 1rem 2.5rem; }
        .footer-rule { margin: 0 2.5rem; }
        .footer-bottom-bar { padding: 1.2rem 2.5rem; }
      }
      @media (max-width: 640px) {
        .footer-body { grid-template-columns: 1fr; padding: 2.5rem 1.5rem 1.5rem; gap: 2rem; }
        .footer-top-band { padding: 1rem 1.5rem; flex-direction: column; align-items: flex-start; }
        .footer-rule { margin: 0 1.5rem; }
        .footer-bottom-bar { padding: 1rem 1.5rem; flex-direction: column; align-items: flex-start; }
      }

      /* ══ SCROLL REVEAL ══ */
      .reveal        { opacity:0; transform:translateY(32px);  transition:opacity 0.85s ease,transform 0.85s ease; }
      .reveal.visible { opacity:1; transform:none; }
      .reveal-left   { opacity:0; transform:translateX(-40px); transition:opacity 0.9s ease,transform 0.9s ease; }
      .reveal-left.visible { opacity:1; transform:none; }
      .reveal-right  { opacity:0; transform:translateX(40px);  transition:opacity 0.9s ease,transform 0.9s ease; }
      .reveal-right.visible { opacity:1; transform:none; }

      /* ══ KEYFRAMES ══ */
      @keyframes tmgFadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
      @keyframes tmgFadeUp { to{opacity:1;transform:none} }
      @keyframes tmgScrollP { 0%,100%{opacity:.4} 50%{opacity:1} }
    `;
    document.head.appendChild(style);
  }

  /* ═══════════════════════════════════
     HELPERS
     ═══════════════════════════════════ */

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'cls')       node.className   = v;
      else if (k === 'html') node.innerHTML   = v;
      else if (k === 'text') node.textContent = v;
      else                   node.setAttribute(k, v);
    });
    children.forEach((c) => c && node.appendChild(c));
    return node;
  }

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  /* ═══════════════════════════════════
     BUILD NAVBAR
     ═══════════════════════════════════ */

  function buildNavbar() {
    const page = currentPage();
    const h    = BRAND.height + 'px';

    /*
     * Two <img> tags stacked via position:absolute, crossfading via CSS.
     * A hidden spacer <img> keeps the <a> the correct width/height.
     */
    const logoLight = el('img', {
      cls: 'nav-logo nav-logo--light',
      src: BRAND.logoLight,
      alt: BRAND.logoAlt,
      height: BRAND.height,
    });
    const logoDark = el('img', {
      cls: 'nav-logo nav-logo--dark',
      src: BRAND.logoDark,
      alt: BRAND.logoAlt,
      height: BRAND.height,
    });
    const spacer = el('img', {
      cls: 'nav-logo-spacer',
      src: BRAND.logoDark,       /* same src so dimensions match */
      alt: '',
      height: BRAND.height,
      'aria-hidden': 'true',
    });

    const brand = el('a', { href: BRAND.href, cls: 'nav-brand' },
      logoLight, logoDark, spacer
    );

    const ul = el('ul', { cls: 'nav-links' });

    NAV_LINKS.forEach(({ label, href, children }) => {
      const li = el('li', { cls: 'nav-item' });
      const a  = el('a', { href, text: label });
      if (href.split('#')[0] === page) a.classList.add('nav-active');

      if (children && children.length) {
        a.classList.add('has-children');

        const dd = el('ul', { cls: 'nav-dropdown' });
        children.forEach(({ label: cLabel, href: cHref, ext }) => {
          let icon = 'ti-chevron-right';
          if (cLabel.toLowerCase().includes('ebay'))    icon = 'ti-shopping-bag';
          if (cLabel.toLowerCase().includes('leasing')) icon = 'ti-file-invoice';
          if (cLabel.toLowerCase().includes('hira'))    icon = 'ti-microscope';

          const link = el('a', { href: cHref, html: `<i class="ti ${icon}"></i>${cLabel}` });
          if (ext) link.setAttribute('target', '_blank');
          dd.appendChild(el('li', {}, link));
        });

        li.appendChild(a);
        li.appendChild(dd);

        let closeTimer = null;
        const openDD  = () => {
          clearTimeout(closeTimer);
          document.querySelectorAll('.nav-item.open').forEach((i) => { if (i !== li) i.classList.remove('open'); });
          li.classList.add('open');
        };
        const closeDD = () => { closeTimer = setTimeout(() => li.classList.remove('open'), 120); };

        li.addEventListener('mouseenter', openDD);
        li.addEventListener('mouseleave', closeDD);
        dd.addEventListener('mouseenter', () => clearTimeout(closeTimer));
        dd.addEventListener('mouseleave', closeDD);
        a.addEventListener('click', (e) => {
          e.preventDefault();
          li.classList.contains('open') ? li.classList.remove('open') : openDD();
        });
        document.addEventListener('click', (e) => { if (!li.contains(e.target)) li.classList.remove('open'); });

      } else {
        li.appendChild(a);
      }

      ul.appendChild(li);
    });

    const ctaA     = el('a', { href: NAV_CTA.href, cls: 'nav-cta', text: NAV_CTA.label });
    ul.appendChild(el('li', {}, ctaA));

    const hamburger = el('button', {
      id: 'hamburger', cls: 'hamburger', 'aria-label': 'Menu',
      html: '<span></span><span></span><span></span>',
    });

    const nav = el('nav', { id: 'navbar' }, brand, ul, hamburger);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  /* ═══════════════════════════════════
     BUILD FOOTER
     ═══════════════════════════════════ */

  function buildFooter() {
    const f = FOOTER;

    const bandText = el('p', {});
    bandText.innerHTML = f.topBand.text.replace(f.topBand.strong, `<strong>${f.topBand.strong}</strong>`);
    const bandCta = el('a', { href: f.topBand.cta.href, cls: 'footer-top-cta', html: `<i class="ti ti-mail" aria-hidden="true"></i> ${f.topBand.cta.label}` });
    const topBand = el('div', { cls: 'footer-top-band' }, bandText, bandCta);

    const logo    = el('span', { cls: 'footer-logo', html: `<img src="/assets/logoblanco.webp" style="max-width:200px" />` });
    const desc    = el('p',    { cls: 'footer-brand-desc', text: f.brand.desc });
    const socials = el('div',  { cls: 'footer-socials' });
    f.socials.forEach(({ icon, label, href }) => {
      socials.appendChild(el('a', { href, cls: 'footer-social-btn', 'aria-label': label, html: `<i class="ti ${icon}" aria-hidden="true"></i>` }));
    });
    const badge    = el('div', { cls: 'footer-cert-badge', html: `<i class="ti ti-shield-check" aria-hidden="true"></i> ${f.brand.badge}` });
    const brandCol = el('div', { cls: 'footer-brand-col' }, logo, desc, socials, badge);

    const linkCols = f.cols.map((col) => {
      const colEl = el('div', { cls: 'footer-link-col' });
      colEl.appendChild(el('p', { cls: 'footer-col-title', text: col.title }));
      if (col.links) {
        const list = el('ul');
        col.links.forEach(({ label, href }) => list.appendChild(el('li', {}, el('a', { href, html: `<i class="ti ti-chevron-right" aria-hidden="true"></i> ${label}` }))));
        colEl.appendChild(list);
      }
      if (col.contact) {
        col.contact.forEach(({ icon, text }) => colEl.appendChild(el('div', { cls: 'footer-contact-item', html: `<i class="ti ${icon}" aria-hidden="true"></i><span>${text}</span>` })));
      }
      return colEl;
    });

    const body       = el('div', { cls: 'footer-body' }, brandCol, ...linkCols);
    const rule       = el('div', { cls: 'footer-rule' });
    const copy       = el('p',   { html: `© <span id="footerYear">${new Date().getFullYear()}</span> Tech Meol Group, Inc. All rights reserved.` });
    const legalLinks = el('div', { cls: 'footer-legal-links' });
    f.legal.forEach(({ label, href }) => legalLinks.appendChild(el('a', { href, text: label })));
    const bottomBar  = el('div', { cls: 'footer-bottom-bar' }, copy, legalLinks);
    const footer     = el('footer', { cls: 'tmg-footer' }, topBand, body, rule, bottomBar);

    const existing = document.querySelector('footer.tmg-footer, footer');
    if (existing) existing.replaceWith(footer); else document.body.appendChild(footer);
  }

  /* ═══════════════════════════════════
     SCROLL
     ═══════════════════════════════════ */

  function handleScroll() {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);

    const heroBg = document.getElementById('heroBg');
    if (heroBg && window.scrollY < window.innerHeight * 1.5) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.32}px)`;
    }
  }

  /* ═══════════════════════════════════
     SMOOTH SCROLL
     ═══════════════════════════════════ */

  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const nav    = document.getElementById('navbar');
      const offset = (nav ? nav.offsetHeight : 0) + 20;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  }

  /* ═══════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════ */

  function initMobileMenu() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#hamburger')) return;

      let menu = document.getElementById('tmgMobileMenu');
      if (menu) { menu.remove(); return; }

      menu = el('div', { id: 'tmgMobileMenu' });
      Object.assign(menu.style, {
        position: 'fixed', inset: '0',
        background: 'rgba(10,28,46,0.98)',
        zIndex: '200',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2rem',
        animation: 'tmgFadeIn 0.25s ease',
      });

      const allLinks = [...NAV_LINKS, NAV_CTA];
      allLinks.forEach(({ label, href, children }) => {
        const isCta = label === NAV_CTA.label && href === NAV_CTA.href;
        const a = el('a', { href: children ? '#' : href, text: label });
        Object.assign(a.style, {
          fontFamily: isCta ? "'Barlow',sans-serif" : "'Cormorant Garamond',serif",
          fontSize: isCta ? '0.82rem' : '2.4rem', fontWeight: isCta ? '500' : '300',
          color: '#fff', textDecoration: 'none',
          letterSpacing: isCta ? '0.16em' : '0.04em',
          textTransform: isCta ? 'uppercase' : 'none',
          background: isCta ? '#E8670A' : 'transparent',
          padding: isCta ? '0.75rem 2rem' : '0',
          borderRadius: isCta ? '4px' : '0',
          transition: 'color .2s, background .2s',
        });
        if (!isCta) {
          a.addEventListener('mouseenter', () => (a.style.color = '#E8670A'));
          a.addEventListener('mouseleave', () => (a.style.color = '#fff'));
        } else {
          a.addEventListener('mouseenter', () => (a.style.background = '#f07d28'));
          a.addEventListener('mouseleave', () => (a.style.background = '#E8670A'));
        }
        if (!children) a.addEventListener('click', () => menu.remove());
        menu.appendChild(a);

        if (children && children.length) {
          const sub = el('div');
          Object.assign(sub.style, { display:'flex', flexDirection:'column', alignItems:'center', gap:'0.6rem', marginTop:'-0.8rem' });
          children.forEach(({ label: cLabel, href: cHref, ext }) => {
            const ca = el('a', { href: cHref, text: cLabel });
            if (ext) ca.setAttribute('target', '_blank');
            Object.assign(ca.style, { fontFamily:"'Barlow',sans-serif", fontSize:'0.9rem', fontWeight:'400', color:'rgba(255,255,255,0.5)', textDecoration:'none', letterSpacing:'0.06em', transition:'color .2s' });
            ca.addEventListener('mouseenter', () => (ca.style.color = '#E8670A'));
            ca.addEventListener('mouseleave', () => (ca.style.color = 'rgba(255,255,255,0.5)'));
            ca.addEventListener('click', () => menu.remove());
            sub.appendChild(ca);
          });
          menu.appendChild(sub);
        }
      });

      const close = el('button', { text: '✕' });
      Object.assign(close.style, { position:'absolute', top:'1.4rem', right:'2rem', background:'none', border:'none', color:'rgba(255,255,255,0.35)', fontSize:'1.4rem', cursor:'pointer' });
      close.addEventListener('mouseenter', () => (close.style.color = '#E8670A'));
      close.addEventListener('mouseleave', () => (close.style.color = 'rgba(255,255,255,0.35)'));
      close.addEventListener('click', () => menu.remove());

      const onKey = (ev) => { if (ev.key === 'Escape') { menu.remove(); document.removeEventListener('keydown', onKey); } };
      document.addEventListener('keydown', onKey);

      menu.appendChild(close);
      document.body.appendChild(menu);
    });
  }

  /* ═══════════════════════════════════
     SCROLL REVEAL
     ═══════════════════════════════════ */

  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const STAGGER = '.services-grid, .stats-inner, .sol-tab-nav, .cta-steps, .footer-body';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const grid = entry.target.closest(STAGGER);
        if (grid) {
          const siblings = Array.from(grid.querySelectorAll('.reveal, .reveal-left, .reveal-right'));
          setTimeout(() => entry.target.classList.add('visible'), siblings.indexOf(entry.target) * 90);
        } else {
          entry.target.classList.add('visible');
        }
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    els.forEach((e) => obs.observe(e));
  }

  /* ═══════════════════════════════════
     INIT
     ═══════════════════════════════════ */

  function init() {
    injectStyles();
    buildNavbar();
    buildFooter();
    handleScroll();
    initSmoothScroll();
    initMobileMenu();
    initReveal();

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { handleScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();