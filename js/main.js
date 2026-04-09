/* =============================================
   MOULIN COLCHÕES — MAIN SCRIPT
   GSAP + ScrollTrigger + Swiper + AOS
   ============================================= */

// ===================== GSAP SETUP =====================
gsap.registerPlugin(ScrollTrigger);

// ===================== CUSTOM CURSOR =====================
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Ring follows with lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .diff-card, .produto-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
})();

// ===================== SCROLL PROGRESS =====================
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
})();

// ===================== NAVBAR =====================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// ===================== MOBILE MENU =====================
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileClose');

  if (!hamburger || !overlay) return;

  const openMenu = () => overlay.classList.add('active');
  const closeMenu = () => overlay.classList.remove('active');

  hamburger.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);

  // Close on link click
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

// ===================== HERO ANIMATIONS =====================
(function initHeroAnims() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Badge
  tl.to('#heroBadge', { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });

  // Headline lines — reveal from bottom
  tl.to('.hero-line', {
    y: '0%',
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power4.out'
  }, '-=0.3');

  // Sub + actions
  tl.to('#heroSub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
  tl.to('#heroActions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

  // Hero image
  tl.fromTo('#heroImage',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
    '-=0.8'
  );

  // Hero parallax on scroll
  gsap.to('#heroImage', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  gsap.to('.hero-orb-1', {
    y: 100,
    x: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    }
  });
})();

// ===================== COUNTER ANIMATION =====================
(function initCounters() {
  const counters = document.querySelectorAll('.proof-number[data-target]');
  if (!counters.length) return;

  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.target);
    const isDecimal = counter.dataset.decimal === '1';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = isDecimal
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toString();
          }
        });
      }
    });
  });
})();

// ===================== PROOF STRIP ANIMATION =====================
(function initProofStrip() {
  gsap.fromTo('.proof-item',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.proof-strip',
        start: 'top 80%',
        once: true
      }
    }
  );
})();

// ===================== PRODUCT CARDS 3D TILT =====================
(function initTilt() {
  const cards = document.querySelectorAll('.produto-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.3
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
})();

// ===================== SECTION SCROLL ANIMATIONS =====================
(function initScrollAnims() {
  // Problem section text reveal
  gsap.fromTo('.problem-text p',
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.problem-text',
        start: 'top 75%',
        once: true
      }
    }
  );

  // Products section
  gsap.fromTo('.produto-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.produtos-grid',
        start: 'top 75%',
        once: true
      }
    }
  );

  // Diferenciais background parallax
  gsap.to('.diferenciais::before', {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.diferenciais',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    }
  });
})();

// ===================== SWIPER =====================
(function initSwiper() {
  new Swiper('.testimonial-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    speed: 700,
    effect: 'slide',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 32
      }
    }
  });
})();

// ===================== AOS =====================
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

// ===================== SMOOTH ANCHOR SCROLL =====================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ===================== NAVBAR ACTIVE LINK =====================
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

// ===================== CTA SECTION ENTRANCE =====================
(function initCtaAnim() {
  gsap.fromTo('.cta-content',
    { opacity: 0, y: 40, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-final',
        start: 'top 70%',
        once: true
      }
    }
  );
})();
