// ===== LIVE CLOCK =====
(function () {
  const el = document.getElementById('liveDateTime');
  const btn = document.getElementById('clockToggle');
  if (!el) return;

  let running = true;
  let interval;

  function tick() {
    el.textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function start() {
    tick();
    interval = setInterval(tick, 1000);
  }

  start();

  if (btn) {
    btn.addEventListener('click', () => {
      if (running) {
        clearInterval(interval);
        btn.textContent = 'Reprendre Clock';
      } else {
        start();
        btn.textContent = 'Pause Clock';
      }
      running = !running;
    });
  }
})();

// ===== COUNTER ANIMATIONS =====
(function () {
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.countValue || 0);
    const decimals = parseInt(el.dataset.countDecimals || 0);
    const suffix   = el.dataset.countSuffix || '';
    const format   = el.dataset.countFormat || '';
    const steps    = 60;
    const stepTime = 1800 / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = target * (step / steps);
      if (step >= steps) {
        clearInterval(timer);
        el.textContent = format === 'compact'
          ? (target >= 1000 ? (target / 1000).toFixed(0) + 'K+' : target.toFixed(0))
          : target.toFixed(decimals) + suffix;
        return;
      }
      el.textContent = format === 'compact'
        ? (current >= 1000 ? (current / 1000).toFixed(0) + 'K+' : current.toFixed(0))
        : current.toFixed(decimals) + suffix;
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-count-value]').forEach(el => observer.observe(el));
})();

// ===== TOGGLE PANELS =====
(function () {
  document.querySelectorAll('[data-toggle-target]').forEach(btn => {
    const targetId  = btn.dataset.toggleTarget;
    const labelShow = btn.dataset.toggleLabelShow;
    const labelHide = btn.dataset.toggleLabelHide;
    const target    = document.getElementById(targetId);
    if (!target) return;

    btn.addEventListener('click', () => {
      const hidden = target.style.display === 'none';
      target.style.display = hidden ? '' : 'none';
      if (labelShow && labelHide) {
        btn.textContent = hidden ? labelHide : labelShow;
      }
    });
  });
})();

// ===== FEATURED SLIDER =====
(function () {
  const track   = document.getElementById('featuredSliderTrack');
  const btnPrev = document.getElementById('featuredPrev');
  const btnNext = document.getElementById('featuredNext');
  const dotsEl  = document.getElementById('featuredSliderDots');
  if (!track || !btnPrev || !btnNext) return;

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  if (dotsEl) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    });
  }

  function goTo(idx) {
    current = (idx + total) % total;
    const gap = parseInt(getComputedStyle(track).gap) || 0;
    const slideWidth = slides[0].offsetWidth + gap;
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    if (dotsEl) {
      dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  let autoPlay = setInterval(() => goTo(current + 1), 5000);
  const viewport = track.parentElement;
  viewport.addEventListener('mouseenter', () => clearInterval(autoPlay));
  viewport.addEventListener('mouseleave', () => { autoPlay = setInterval(() => goTo(current + 1), 5000); });
})();

// ===== COURSE PREVIEW MODAL =====
(function () {
  const modal     = document.getElementById('courseModal');
  const modalBody = document.getElementById('courseModalBody');
  const modalLink = document.getElementById('courseModalLink');
  if (!modal) return;

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-course-preview]');
    if (!btn) return;
    const courseId = btn.dataset.coursePreview;
    const card     = btn.closest('.course-card');
    if (!card) return;

    const title    = card.querySelector('h3')?.textContent || '';
    const category = card.querySelector('.course-category')?.textContent || '';
    const desc     = card.querySelector('.course-description')?.textContent || '';
    const image    = card.querySelector('.course-image')?.textContent || '';

    if (modalBody) {
      modalBody.innerHTML = `
        <div style="text-align:center;font-size:4rem;margin-bottom:1rem;">${image}</div>
        <p style="color:var(--muted);font-size:.9rem;">${category}</p>
        <h4>${title}</h4>
        <p>${desc}</p>`;
    }
    if (modalLink) modalLink.href = '/course-details?id=' + courseId;

    bootstrap.Modal.getOrCreateInstance(modal).show();
  });
})();

// ===== MOBILE NAV TOGGLE =====
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
})();
