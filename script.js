'use strict';
(() => {
  let lang = 'en';
  const root = document.documentElement;
  const header = document.querySelector('.header');
  const menu = document.getElementById('menu');
  const language = document.getElementById('language');
  const status = document.getElementById('form-status');
  function closeMenu() {
    header.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', lang === 'ar' ? 'فتح القائمة' : 'Open menu');
  }
  function setLanguage(value) {
    lang = value === 'ar' ? 'ar' : 'en';
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-en][data-ar]').forEach(el => { el.textContent = el.dataset[lang]; });
    document.querySelectorAll('[data-placeholder-en]').forEach(el => { el.placeholder = lang === 'ar' ? el.dataset.placeholderAr : el.dataset.placeholderEn; });
    language.textContent = lang === 'ar' ? 'EN' : 'العربية';
    language.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    document.title = lang === 'ar' ? 'سمارت تك | حلول الأمن والتقنية الذكية في الدمام' : 'SmartTech | Security & Smart Technology in Dammam';
    document.querySelector('.floating-whatsapp').setAttribute('aria-label', lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp');
    document.querySelectorAll('.circle-link').forEach(el => el.setAttribute('aria-label', lang === 'ar' ? 'ناقش احتياجات موقعك' : 'Discuss your space'));
    status.textContent = '';
    closeMenu();
    try { localStorage.setItem('smarttech-language', lang); } catch (_) {}
  }
  let saved = 'en';
  try { saved = localStorage.getItem('smarttech-language') || 'en'; } catch (_) {}
  setLanguage(saved);
  language.addEventListener('click', () => setLanguage(lang === 'en' ? 'ar' : 'en'));
  menu.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', lang === 'ar' ? (open ? 'إغلاق القائمة' : 'فتح القائمة') : (open ? 'Close menu' : 'Open menu'));
  });
  document.querySelectorAll('.header nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); } });
  const desktop = window.matchMedia('(min-width:851px)');
  desktop.addEventListener('change', e => { if (e.matches) closeMenu(); });
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const tablist = document.querySelector('[role="tablist"]');
  function activateTab(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowDown') next = index + 1;
      if (e.key === 'ArrowUp') next = index - 1;
      if (e.key === 'ArrowRight') next = index + (lang === 'ar' ? -1 : 1);
      if (e.key === 'ArrowLeft') next = index + (lang === 'ar' ? 1 : -1);
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { e.preventDefault(); activateTab(tabs[(next + tabs.length) % tabs.length], true); }
    });
  });
  const mobileTabs = window.matchMedia('(max-width:850px)');
  function tabOrientation() { tablist.setAttribute('aria-orientation', mobileTabs.matches ? 'horizontal' : 'vertical'); }
  mobileTabs.addEventListener('change', tabOrientation); tabOrientation();
  document.querySelectorAll('.service-enquire').forEach(a => a.addEventListener('click', () => {
    document.getElementById('service').value = a.dataset.value;
  }));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.body.classList.add('js-ready');
  }
  const form = document.getElementById('enquiry');
  function projectMessage() {
    const name = document.getElementById('name').value.trim();
    const city = document.getElementById('city').value.trim();
    const service = document.getElementById('service');
    const details = document.getElementById('message').value.trim();
    if (lang === 'ar') return `مرحباً سمارت تك، أود الاستفسار عن مشروع.\n\nالاسم: ${name}\nالموقع: ${city}\nالخدمة: ${service.selectedOptions[0].textContent}\nالتفاصيل: ${details || 'سأشارك المزيد من التفاصيل أثناء المحادثة.'}`;
    return `Hello SmartTech, I would like to discuss a project.\n\nName: ${name}\nLocation: ${city}\nService: ${service.selectedOptions[0].textContent}\nDetails: ${details || 'I will share more details during our conversation.'}`;
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const url = 'https://wa.me/966592154955?text=' + encodeURIComponent(projectMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
    status.replaceChildren();
    const note = document.createElement('span');
    note.textContent = lang === 'ar' ? 'أكمل إرسال الرسالة في واتساب. إذا لم يفتح: ' : 'Finish sending in WhatsApp. If it did not open: ';
    const fallback = document.createElement('a');
    fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer';
    fallback.textContent = lang === 'ar' ? 'افتح المحادثة' : 'Open conversation';
    fallback.style.textDecoration = 'underline';
    status.append(note, fallback);
  });
  document.getElementById('email-enquiry').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    window.location.href = 'mailto:info@smarttechsecuritysolution.com?subject=' + encodeURIComponent(lang === 'ar' ? 'استفسار عن مشروع — سمارت تك' : 'Project enquiry — SmartTech') + '&body=' + encodeURIComponent(projectMessage());
    status.textContent = lang === 'ar' ? 'راجع الرسالة وأرسلها من تطبيق البريد الإلكتروني لديك.' : 'Review and send the draft in your email app.';
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
