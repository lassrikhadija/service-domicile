/* ============================================================
   PHÉNIX RESTAURATION — Interactions
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- HEADER scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- BURGER ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('mobile-nav-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ---------- ACTIVE NAV LINK on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.header__link');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    navLinks.forEach(l => {
      const href = l.getAttribute('href');
      if (href && href.startsWith('#')) map.set(href.slice(1), l);
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(l => l.classList.remove('is-active'));
          const link = map.get(id);
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ---------- CURSOR FOLLOWER ---------- */
  const follower = document.getElementById('cursorFollower');
  const dot = document.getElementById('cursorDot');
  const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (follower && dot && !isCoarse) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let fx = mx, fy = my;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const tick = () => {
      fx += (mx - fx) * 0.18;
      fy += (my - fy) * 0.18;
      follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    document.querySelectorAll('a, button, summary, input, select, textarea, [data-tilt], .ba').forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => follower.classList.remove('is-hover'));
    });
  }

  /* ---------- HERO EMBERS (canvas particles) ---------- */
  const canvas = document.getElementById('embers');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    const isMobile = () => window.innerWidth < 700;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = isMobile() ? 26 : 60;
      particles = Array.from({ length: target }, () => spawn());
    };

    const spawn = () => ({
      x: Math.random() * W,
      y: H + Math.random() * 60,
      r: Math.random() * 2.4 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.8 + 0.35),
      life: Math.random() * 1 + 0.5,
      hue: 14 + Math.random() * 30, // orange→amber
      twinkle: Math.random() * Math.PI * 2,
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx + Math.sin(p.twinkle) * 0.15;
        p.y += p.vy;
        p.twinkle += 0.04;
        p.life -= 0.003;
        if (p.y < -20 || p.life <= 0) {
          Object.assign(p, spawn());
        }
        const alpha = Math.min(0.85, p.life) * (0.6 + Math.sin(p.twinkle) * 0.4);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${alpha})`);
        grd.addColorStop(0.6, `hsla(${p.hue}, 100%, 55%, ${alpha * 0.25})`);
        grd.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue + 10}, 100%, 80%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  /* ---------- DISPATCH CLOCK ---------- */
  const clock = document.getElementById('dispatchClock');
  if (clock) {
    const tickClock = () => {
      const d = new Date();
      const pad = n => String(n).padStart(2, '0');
      clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tickClock();
    setInterval(tickClock, 1000);
  }

  /* ---------- COUNTERS ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const v = Math.round(target * ease(t));
        el.textContent = v + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const co = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  }

  /* ---------- BEFORE / AFTER ---------- */
  document.querySelectorAll('[data-ba]').forEach(ba => {
    const range = ba.querySelector('.ba__range');
    const after = ba.querySelector('.ba__after');
    const handle = ba.querySelector('.ba__handle');
    if (!range || !after || !handle) return;
    const update = (val) => {
      // AVANT (left) stays visible; APRÈS (right) is clipped to show from handle → 100%
      after.style.clipPath = `polygon(${val}% 0, 100% 0, 100% 100%, ${val}% 100%)`;
      handle.style.left = val + '%';
    };
    range.addEventListener('input', e => update(e.target.value));
    update(range.value);
  });

  /* ---------- SERVICE TILT + GLOW ---------- */
  const tiltEls = document.querySelectorAll('[data-tilt]');
  if (!reduceMotion && !isCoarse) {
    tiltEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = ((y / r.height) - 0.5) * -6;
        const ry = ((x / r.width) - 0.5) * 6;
        el.style.transform = `translateY(-6px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        el.style.setProperty('--mx', `${(x / r.width) * 100}%`);
        el.style.setProperty('--my', `${(y / r.height) * 100}%`);
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealTargets = document.querySelectorAll(
    '.section__header, .service, .timeline__step, .ba, .review, .faq__item, .stat-card, .ncard, .contact__channel, .contact__form'
  );
  revealTargets.forEach(el => el.setAttribute('data-reveal', ''));
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries, observer) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('is-visible'), (i % 6) * 60);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(el => ro.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- SMOOTH ANCHOR (for headers offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const h = header ? header.getBoundingClientRect().height : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - h - 12;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- COOKIE CONSENT BANNER ---------- */
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    const KEY = 'phenix-cookies-consent';
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { /* private mode */ }

    const show = () => {
      banner.hidden = false;
      document.body.classList.add('cookies-pending');
      // small delay so transition runs from initial transform
      requestAnimationFrame(() => banner.classList.add('is-visible'));
    };
    const hide = (choice) => {
      try { localStorage.setItem(KEY, choice + '|' + new Date().toISOString()); } catch (e) {}
      banner.classList.remove('is-visible');
      document.body.classList.remove('cookies-pending');
      setTimeout(() => { banner.hidden = true; }, 500);
    };

    if (!stored) {
      // Wait a beat so the user lands on the page before showing
      setTimeout(show, 900);
    }

    document.getElementById('cookieAccept')?.addEventListener('click', () => hide('accepted'));
    document.getElementById('cookieRefuse')?.addEventListener('click', () => hide('refused'));
  }

  /* ---------- CONTACT FORM ---------- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = ['name', 'phone', 'email', 'type'];
      let valid = true;
      required.forEach(id => {
        const f = form.querySelector(`#${id}`);
        if (!f) return;
        if (!f.value.trim()) {
          f.style.borderColor = 'var(--fire)';
          valid = false;
        } else {
          f.style.borderColor = '';
        }
      });
      if (!valid) {
        if (success) {
          success.textContent = 'Veuillez remplir les champs requis.';
          success.style.color = 'var(--fire)';
        }
        return;
      }
      if (success) {
        success.textContent = '✓ Demande envoyée. On vous rappelle sous 4 h ouvrables. (Démo)';
        success.style.color = 'var(--jade)';
      }
      form.reset();
    });
  }

})();
