/* ============================================================
   K K SUNTECH SOLAR — script.js
   Plain vanilla JS — no build tools, works with GitHub Pages
   ============================================================ */

(function () {
  'use strict';

  /* ---- NAVBAR ---- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  function updateNavbar() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);

    const heroSection = document.getElementById('home');
    const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 0;
    navbar.classList.toggle('at-hero', heroBottom > 80 && !scrolled);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- SMOOTH SCROLL for # links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- SCROLL REVEAL ---- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---- ANIMATED COUNTERS ---- */
  var countersDone = false;

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1800;
    var start = null;
    var startVal = 0;

    function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var val = Math.round(startVal + ease(progress) * (target - startVal));
      el.textContent = val.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    if (!countersDone && entries.some(function (e) { return e.isIntersecting; })) {
      countersDone = true;
      document.querySelectorAll('.counter-num').forEach(function (el) {
        animateCounter(el);
      });
      counterObserver.disconnect();
    }
  }, { threshold: 0.3 });

  var countersEl = document.querySelector('.counters');
  if (countersEl) counterObserver.observe(countersEl);

  /* ---- TESTIMONIALS SLIDER ---- */
  var testimonials = [
    {
      text: '"They handled every form, DISCOM coordination and subsidy paperwork. We didn\'t have to step out even once. True trusted local partner in Nagpur."',
      name: 'Sunita Kale',
      role: 'Resident, Mahal Nagpur',
      avatar: 'SK'
    },
    {
      text: '"Got ₹78,000 subsidy credited to my account within 45 days. K K Suntech team was incredibly professional and kept me informed at every step."',
      name: 'Ramesh Deshmukh',
      role: 'Businessman, Wardha',
      avatar: 'RD'
    },
    {
      text: '"My electricity bill dropped from ₹4,500 to just ₹200 after installing a 3 kW system. The PM Surya Ghar subsidy made it very affordable. Highly recommend!"',
      name: 'Priya Joshi',
      role: 'Homeowner, Dharampeth',
      avatar: 'PJ'
    },
    {
      text: '"Installed 120 kW for our factory at Hingna MIDC. Excellent engineering, quality panels and the ROI has been outstanding. Best solar company in Nagpur."',
      name: 'Vijay Kale',
      role: 'Factory Owner, Hingna MIDC',
      avatar: 'VK'
    }
  ];

  var currentSlide = 0;
  var testimonialText = document.getElementById('testimonialText');
  var testimonialName = document.getElementById('testimonialName');
  var testimonialRole = document.getElementById('testimonialRole');
  var testimonialAvatar = document.getElementById('testimonialAvatar');
  var dots = document.querySelectorAll('.testimonial-dots .dot');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var autoSlideTimer = null;

  function goToSlide(index) {
    currentSlide = (index + testimonials.length) % testimonials.length;
    var t = testimonials[currentSlide];

    if (testimonialText) {
      testimonialText.style.opacity = '0';
      testimonialAvatar.style.opacity = '0';
    }

    setTimeout(function () {
      if (testimonialText) testimonialText.textContent = t.text;
      if (testimonialName) testimonialName.textContent = t.name;
      if (testimonialRole) testimonialRole.textContent = t.role;
      if (testimonialAvatar) testimonialAvatar.textContent = t.avatar;

      if (testimonialText) {
        testimonialText.style.opacity = '1';
        testimonialAvatar.style.opacity = '1';
      }
    }, 200);

    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
    });
  }

  function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(function () { goToSlide(currentSlide + 1); }, 5000);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
      startAutoSlide();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
      startAutoSlide();
    });
  }
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
      startAutoSlide();
    });
  });

  startAutoSlide();

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isOpen = this.getAttribute('aria-expanded') === 'true';
      var answer = this.nextElementSibling;
      var icon = this.querySelector('.faq-icon');

      document.querySelectorAll('.faq-question').forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          var otherAnswer = other.nextElementSibling;
          if (otherAnswer) otherAnswer.classList.remove('open');
        }
      });

      this.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (answer) answer.classList.toggle('open', !isOpen);
    });
  });

  /* ---- CONTACT FORM ---- */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('#name').value.trim();
      var phone = contactForm.querySelector('#phone').value.trim();

      if (!name) {
        contactForm.querySelector('#name').focus();
        return;
      }
      if (!phone || phone.length < 10) {
        contactForm.querySelector('#phone').focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(function () {
        if (formSuccess) {
          formSuccess.hidden = false;
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289z"/></svg> Book Free Site Survey';
        }
      }, 800);
    });
  }

  /* ---- GALLERY — open image full screen on click ---- */
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      var title = item.querySelector('.gallery-title');
      if (!img) return;

      var overlay = document.createElement('div');
      overlay.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:9999',
        'background:rgba(0,0,0,.92)',
        'display:flex', 'flex-direction:column',
        'align-items:center', 'justify-content:center',
        'cursor:zoom-out', 'padding:24px'
      ].join(';');

      var bigImg = document.createElement('img');
      bigImg.src = img.src.replace('w=600', 'w=1200').replace('w=900', 'w=1400');
      bigImg.alt = img.alt;
      bigImg.style.cssText = 'max-width:100%;max-height:85vh;border-radius:12px;box-shadow:0 24px 80px rgba(0,0,0,.5);';

      var caption = document.createElement('p');
      caption.textContent = title ? title.textContent : '';
      caption.style.cssText = 'color:rgba(255,255,255,.7);margin-top:16px;font-size:0.9375rem;';

      overlay.appendChild(bigImg);
      overlay.appendChild(caption);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      overlay.addEventListener('click', function () {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      });

      document.addEventListener('keydown', function esc(ev) {
        if (ev.key === 'Escape') {
          if (document.body.contains(overlay)) document.body.removeChild(overlay);
          document.body.style.overflow = '';
          document.removeEventListener('keydown', esc);
        }
      });
    });
  });

  /* ---- ACTIVE NAV LINK on scroll ---- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar__nav .nav-link');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

})();
