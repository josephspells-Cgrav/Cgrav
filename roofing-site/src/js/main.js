/* ============================================
   MAIN JAVASCRIPT
   Navigation, Scroll Effects, Counters, FAQ
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header with shrink ---
  const header = document.getElementById('site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMain = document.getElementById('nav-main');
  if (menuToggle && navMain) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMain.classList.toggle('open');
      document.body.style.overflow = navMain.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    navMain.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMain.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Reveal (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Number Counter Animation ---
  const counterElements = document.querySelectorAll('[data-count]');
  
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const countVal = el.getAttribute('data-count-val');
    const actualTarget = countVal ? parseFloat(countVal) : target;
    const isDecimal = el.hasAttribute('data-decimal');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = easedProgress * actualTarget;
      
      if (isDecimal) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        if (isDecimal) {
          el.textContent = prefix + actualTarget.toFixed(1) + suffix;
        } else {
          el.textContent = prefix + actualTarget.toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(updateCount);
  }

  // --- Button Ripple Effect ---
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(i => {
          i.classList.remove('active');
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked (if it wasn't already open)
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Form handling (basic validation + submission UX) ---
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('#form-submit');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;">Sending... <svg width="18" height="18" viewBox="0 0 24 24" style="animation: slow-spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="30 70"/></svg></span>';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with real endpoint)
      setTimeout(() => {
        submitBtn.innerHTML = '✓ Estimate Requested!';
        submitBtn.style.background = 'var(--color-success)';
        submitBtn.style.boxShadow = 'none';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.boxShadow = '';
          leadForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // --- Parallax disabled (drone animation handles hero movement) ---
  // const hero = document.querySelector('.hero-bg');
  // if (hero && window.innerWidth > 768) {
  //   window.addEventListener('scroll', () => {
  //     const scrolled = window.scrollY;
  //     if (scrolled < window.innerHeight) {
  //       hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  //     }
  //   }, { passive: true });
  // }

  // --- 3D tilt effect on cards (desktop only) ---
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.service-card, .card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -4;
        const rotateY = (x - centerX) / centerX * 4;
        
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
// trigger deploy
// trigger deploy vite
