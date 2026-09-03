/* ===== Warm Horizon Care — shared behaviours ===== */
document.addEventListener('DOMContentLoaded', () => {
  /* Mobile nav */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  /* Accessibility toggles (persisted) */
  const applyToggle = (key, cls, btn) => {
    const on = localStorage.getItem(key) === 'true';
    document.body.classList.toggle(cls, on);
    btn?.setAttribute('aria-pressed', on);
    btn?.addEventListener('click', () => {
      const next = !document.body.classList.contains(cls);
      document.body.classList.toggle(cls, next);
      localStorage.setItem(key, next);
      btn.setAttribute('aria-pressed', next);
    });
  };
  applyToggle('whc-contrast', 'high-contrast', document.querySelector('[data-contrast]'));
  applyToggle('whc-largetext', 'large-text', document.querySelector('[data-largetext]'));

  /* Language switcher (front-end scaffold only) */
  const langSelect = document.querySelector('[data-lang]');
  const translations = {
    en: {},
    ar: {
      'Home':'الرئيسية','About':'معلومات عنا','Services':'الخدمات','NDIS Info':'معلومات NDIS',
      'Contact':'اتصل بنا','Resources':'الموارد','Blog':'المقالات','Client Portal':'بوابة العميل'
    }
  };
  langSelect?.addEventListener('change', e => {
    const lang = e.target.value;
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = (translations[lang] && translations[lang][key]) || key;
    });
    localStorage.setItem('whc-lang', lang);
  });
  if (langSelect) {
    const saved = localStorage.getItem('whc-lang');
    if (saved) { langSelect.value = saved; langSelect.dispatchEvent(new Event('change')); }
  }

  /* Scroll reveal */
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* Testimonial carousel */
  const slides = [...document.querySelectorAll('.t-slide')];
  if (slides.length) {
    let idx = 0;
    const show = i => { slides[idx].classList.remove('active'); idx = (i + slides.length) % slides.length; slides[idx].classList.add('active'); };
    document.querySelector('[data-t-next]')?.addEventListener('click', () => show(idx + 1));
    document.querySelector('[data-t-prev]')?.addEventListener('click', () => show(idx - 1));
    setInterval(() => show(idx + 1), 8000);
  }

  /* Accordion (FAQ) with deep-linking */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const btn = item.querySelector('button');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      if (isOpen && item.id) history.replaceState(null, '', '#' + item.id);
    });
  });
  if (location.hash) {
    const target = document.querySelector(location.hash);
    target?.classList.add('open');
    target?.querySelector('button')?.setAttribute('aria-expanded', 'true');
    target?.scrollIntoView();
  }

  /* Cookie consent banner */
  const banner = document.querySelector('.cookie-banner');
  if (banner && !localStorage.getItem('whc-cookie-consent')) banner.classList.add('show');
  document.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
    localStorage.setItem('whc-cookie-consent', 'accepted'); banner.classList.remove('show');
  });
  document.querySelector('[data-cookie-decline]')?.addEventListener('click', () => {
    localStorage.setItem('whc-cookie-consent', 'declined'); banner.classList.remove('show');
  });

  /* Generic modal */
  document.querySelectorAll('[data-modal-open]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelector(btn.dataset.modalOpen)?.classList.add('open');
  }));
  document.querySelectorAll('[data-modal-close]').forEach(btn => btn.addEventListener('click', () => {
    btn.closest('.modal-overlay')?.classList.remove('open');
  }));

  /* Analytics stub */
  window.whcAnalytics = window.whcAnalytics || {
    track: (event, data) => console.log('[analytics-stub]', event, data || {})
  };
  document.querySelectorAll('a,button').forEach(el => el.addEventListener('click', () => {
    window.whcAnalytics.track('click', { text: el.textContent.trim().slice(0, 40) });
  }));
});

/* Form validation helper, reused by contact.html and other forms */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[data-required]').forEach(field => {
    const errorEl = form.querySelector(`#${field.id}-error`);
    let message = '';
    if (field.type === 'checkbox' && !field.checked) message = 'This is required.';
    else if (!field.value.trim()) message = 'This field is required.';
    else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) message = 'Enter a valid email address.';
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', !!message);
    if (message) valid = false;
  });
  const honeypot = form.querySelector('.honeypot input');
  if (honeypot && honeypot.value) valid = false; // bot trap
  return valid;
}
