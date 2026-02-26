(function () {
  'use strict';

  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');

  /* scroll header */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  /* menu */
  function toggleMenu() {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* smooth scroll */
  function smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    closeMenu();
  }

  /* intersection reveal */
  function setupReveal() {
    const els = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-fade');
    if (!window.IntersectionObserver) { els.forEach(el => el.classList.add('in-view')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* hero text entrance */
  function setupHero() {
    setTimeout(() => {
      document.querySelectorAll('.name-line').forEach(el => el.classList.add('animated'));
      document.querySelectorAll('.hero-title,.hero-bio,.hero-cta,.hero-location').forEach(el => el.classList.add('animated'));
    }, 80);
  }

  /* language bar fill */
  function setupBars() {
    const bars = document.querySelectorAll('.bar-fill');
    if (!window.IntersectionObserver) { bars.forEach(b => { b.style.width = b.dataset.width + '%'; }); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.style.width = entry.target.dataset.width + '%'; io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => io.observe(b));
  }

  /* form */
  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function fieldError(inputId, errId, msg) {
    const inp = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (!inp || !err) return;
    inp.classList.toggle('error', !!msg);
    err.textContent = msg || '';
  }

  function handleSubmit(e) {
  e.preventDefault();

  let ok = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // validation
  if (!name) { fieldError('name', 'nameError', 'Name is required.'); ok = false; } else { fieldError('name', 'nameError', ''); }
  if (!email) { fieldError('email', 'emailError', 'Email is required.'); ok = false; }
  else if (!validateEmail(email)) { fieldError('email', 'emailError', 'Enter a valid email.'); ok = false; }
  else { fieldError('email', 'emailError', ''); }
  if (!message) { fieldError('message', 'messageError', 'Message is required.'); ok = false; } else { fieldError('message', 'messageError', ''); }

  if (!ok) return;

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Sending…';

  // send email using EmailJS
  emailjs.send(
    'service_hou8hgs',    // replace with your EmailJS service ID
    'template_54l8jur',   // replace with your EmailJS template ID
    {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    }
  )
  .then(() => {
    // success feedback
    contactForm.reset();
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Send Message';
    const suc = document.getElementById('formSuccess');
    suc.classList.add('show');
    setTimeout(() => suc.classList.remove('show'), 5000);
  })
  .catch((err) => {
    console.error('Email send error:', err);
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Send Message';
    alert('Failed to send message. Try again.');
  });
}
  /* active nav highlight */
  function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    if (!window.IntersectionObserver) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { threshold: 0.45 });
    sections.forEach(s => io.observe(s));
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    hamburger.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-link, a[href^="#"]').forEach(l => l.addEventListener('click', smoothScroll));
    if (contactForm) contactForm.addEventListener('submit', handleSubmit);
    setupReveal();
    setupHero();
    setupBars();
    setupActiveNav();
    onScroll();
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
