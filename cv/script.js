/**
 * GHADY TAYEH — DIGITAL PRODUCT ARCHITECTURE SCRIPT
 * Pure ES6+ Vanilla JavaScript — Production Grade / Zero Dependencies
 *
 * Architecture Modules:
 *  1. Theme Engine (Persistent dark/light mode)
 *  2. Terminal & Architecture Inspector Tabs
 *  3. Live Ingestion Telemetry Simulator
 *  4. One-Click Clipboard API with Toast Notification
 *  5. Numerical KPI Counter on Viewport Intersection
 *  6. Project Category Filter
 *  7. Scroll Spy & Accessible Sticky Navigation
 *  8. Form Validation & EmailJS Dispatch
 */

(function () {
  'use strict';

  /* ── DOM Elements ── */
  const masthead        = document.getElementById('masthead');
  const menuToggle      = document.getElementById('menuToggle');
  const navList         = document.getElementById('navList');
  const themeToggle     = document.getElementById('themeToggle');
  const toastContainer  = document.getElementById('toastContainer');
  const contactForm     = document.getElementById('contactForm');
  const currentYearElem = document.getElementById('currentYear');
  const EMAIL_ADDRESS   = 'Ghadytayeh7@gmail.com';

  /* ═══════════════════════════════════════════════════════════
     1. THEME ENGINE — Dark / Light (System / LocalStorage)
     ═══════════════════════════════════════════════════════════ */
  function initTheme() {
    const saved = localStorage.getItem('gt-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // Respect user OS preference if no stored preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('gt-theme', next);
  }

  /* ═══════════════════════════════════════════════════════════
     2. TOAST NOTIFICATION SYSTEM
     ═══════════════════════════════════════════════════════════ */
  function showToast(message, type = 'success', duration = 3200) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');

    const icon = document.createElement('span');
    icon.className = 'toast-icon' + (type === 'error' ? ' error' : '');
    icon.textContent = type === 'success' ? '✓' : '✕';

    const text = document.createElement('span');
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
  }

  /* ═══════════════════════════════════════════════════════════
     3. ONE-CLICK CLIPBOARD COPY
     ═══════════════════════════════════════════════════════════ */
  function setupClipboardCopy() {
    const heroBtn = document.getElementById('copyHeroEmailBtn');
    const contactBtn = document.getElementById('copyContactEmailBtn');

    const copyHandler = async (btn) => {
      try {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        showToast('Email copied to clipboard (' + EMAIL_ADDRESS + ')', 'success');
        
        // Temporary feedback on button if applicable
        const label = document.getElementById('heroEmailLabel');
        if (label && btn === heroBtn) {
          const original = label.textContent;
          label.textContent = 'Copied to clipboard!';
          setTimeout(() => { label.textContent = original; }, 2200);
        }
      } catch {
        // Fallback for non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = EMAIL_ADDRESS;
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast('Email copied to clipboard (' + EMAIL_ADDRESS + ')', 'success');
      }
    };

    if (heroBtn) heroBtn.addEventListener('click', () => copyHandler(heroBtn));
    if (contactBtn) contactBtn.addEventListener('click', () => copyHandler(contactBtn));
  }

  /* ═══════════════════════════════════════════════════════════
     4. ARCHITECTURE INSPECTOR TABS
     ═══════════════════════════════════════════════════════════ */
  function setupArchitectureTabs() {
    const tabs = document.querySelectorAll('.terminal-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const tabKey = tab.dataset.tab;
        document.querySelectorAll('.terminal-body').forEach(b => b.classList.remove('active'));
        const targetBody = document.getElementById('tab-' + tabKey);
        if (targetBody) targetBody.classList.add('active');

        // Ensure active tab is visible in scroll container on mobile devices
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     5. TELEMETRY LOG STREAM SIMULATOR
     ═══════════════════════════════════════════════════════════ */
  function setupTelemetryLogStream() {
    const stream = document.getElementById('logStream');
    if (!stream) return;

    const realisticEvents = [
      { tag: 'OK', text: 'Power BI dataset refresh: 100,000+ Olist transactions processed (0 errors).' },
      { tag: 'INFO', text: 'Recalculating RFM Customer Churn cohort matrices in memory...' },
      { tag: 'OK', text: 'Hotel Booking EDA: Fact_HotelReservations index hit ratio 99.8%.' },
      { tag: 'OK', text: 'DAX KPI Measure evaluation: RevPAR & Cancellation Probability computed in 14ms.' },
      { tag: 'INFO', text: 'TomTom Traffic API: Ingested telemetry from 10 Lebanese highway corridors.' },
      { tag: 'OK', text: 'FIFA 2020 Analytics: Player valuation regression updated (R² = 0.912).' },
      { tag: 'OK', text: 'Automated data validation checks passed: 100% integrity across star schemas.' },
      { tag: 'INFO', text: 'Incremental partition merge completed: Fact_TrafficFlow updated.' }
    ];

    let eventIndex = 0;
    setInterval(() => {
      // Only append if tab is currently active and document is visible
      if (document.hidden) return;

      const activeLine = stream.querySelector('.log-line.active');
      const now = new Date();
      const timeStr = [
        now.getHours().toString().padStart(2, '0'),
        now.getMinutes().toString().padStart(2, '0'),
        now.getSeconds().toString().padStart(2, '0')
      ].join(':');

      const ev = realisticEvents[eventIndex % realisticEvents.length];
      eventIndex++;

      const newLine = document.createElement('div');
      newLine.className = 'log-line';
      newLine.innerHTML = `<span class="log-time">${timeStr}</span> <span class="log-tag ${ev.tag === 'OK' ? 'tag-ok' : 'tag-info'}">${ev.tag}</span> ${ev.text}`;

      if (activeLine) {
        stream.insertBefore(newLine, activeLine);
      } else {
        stream.appendChild(newLine);
      }

      // Keep maximum 8 lines in DOM
      const allLines = stream.querySelectorAll('.log-line:not(.active)');
      if (allLines.length > 7) {
        allLines[0].remove();
      }
    }, 4200);
  }

  /* ═══════════════════════════════════════════════════════════
     6. KPI NUMERICAL COUNTER
     ═══════════════════════════════════════════════════════════ */
  function setupCounters() {
    const counterElements = document.querySelectorAll('.metric-number[data-target]');
    if (!counterElements.length || !window.IntersectionObserver) return;

    function runCounter(el) {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => observer.observe(el));
  }

  /* ═══════════════════════════════════════════════════════════
     7. PROJECT CATEGORY FILTERING
     ═══════════════════════════════════════════════════════════ */
  function setupProjectFilters() {
    const tabs  = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('.project-item');
    if (!tabs.length || !items.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        items.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     8. SCROLL SPY & NAVIGATION
     ═══════════════════════════════════════════════════════════ */
  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    if (!sections.length || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            const href = item.getAttribute('href');
            item.classList.toggle('active', href === '#' + id);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ═══════════════════════════════════════════════════════════
     9. MOBILE MENU (Accessible Drawer with Backdrop & Scroll Lock)
     ═══════════════════════════════════════════════════════════ */
  function setupMobileMenu() {
    const nav = document.getElementById('mastheadNav');
    const backdrop = document.getElementById('navBackdrop');
    if (!menuToggle || !nav) return;

    function openMenu() {
      nav.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    }

    function closeMenu() {
      nav.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }

    function toggleMenu() {
      const isOpen = nav.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    }

    menuToggle.addEventListener('click', toggleMenu);

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    // Close on any link click inside the navigation drawer
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // Close when Escape key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Automatically close drawer when window is resized past mobile breakpoint
    const mediaQuery = window.matchMedia('(min-width: 961px)');
    const handleBreakpoint = (e) => {
      if (e.matches && nav.classList.contains('open')) {
        closeMenu();
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleBreakpoint);
    } else {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 960 && nav.classList.contains('open')) {
          closeMenu();
        }
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     10. CONTACT FORM DISPATCH (EmailJS + Validation)
     ═══════════════════════════════════════════════════════════ */
  function setupContactForm() {
    if (!contactForm) return;

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setFieldError(fieldId, errorId, msg) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      if (!field || !error) return;
      field.classList.toggle('error', !!msg);
      error.textContent = msg || '';
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Field Validations
      if (!name) {
        setFieldError('name', 'nameError', 'Full name is required.');
        valid = false;
      } else {
        setFieldError('name', 'nameError', '');
      }

      if (!email) {
        setFieldError('email', 'emailError', 'Business email is required.');
        valid = false;
      } else if (!validateEmail(email)) {
        setFieldError('email', 'emailError', 'Enter a valid corporate email address.');
        valid = false;
      } else {
        setFieldError('email', 'emailError', '');
      }

      if (!message) {
        setFieldError('message', 'messageError', 'Message details are required.');
        valid = false;
      } else {
        setFieldError('message', 'messageError', '');
      }

      if (!valid) return;

      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Transmitting...';

      // EmailJS Send
      emailjs.send('service_hou8hgs', 'template_54l8jur', {
        from_name: name,
        from_email: email,
        subject: subject || 'Portfolio Contact Inquiry',
        message: message
      })
      .then(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Verified Message';

        const successBanner = document.getElementById('formSuccess');
        if (successBanner) {
          successBanner.classList.add('show');
          setTimeout(() => successBanner.classList.remove('show'), 6000);
        }
        showToast('Message transmitted successfully. I will be in touch.', 'success');
      })
      .catch((err) => {
        console.error('EmailJS Transmission Error:', err);
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Verified Message';
        showToast('Transmission failure. Please email Ghadytayeh7@gmail.com directly.', 'error', 4500);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     11. BOOTSTRAP INITIALIZATION
     ═══════════════════════════════════════════════════════════ */
  function init() {
    initTheme();
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (currentYearElem) currentYearElem.textContent = new Date().getFullYear();

    setupClipboardCopy();
    setupArchitectureTabs();
    setupTelemetryLogStream();
    setupCounters();
    setupProjectFilters();
    setupScrollSpy();
    setupMobileMenu();
    setupContactForm();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
