/* script.js — client-side interactions for PlanAgent. */
const state = {
  testimonialIndex: 0,
  testimonialTimer: null,
  touchStartX: 0,
};

// Mobile menu toggling and responsive navigation handling.
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
  });
}

// Animate and reveal page elements as they enter the viewport.
function revealOnScroll() {
  const items = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach((item) => {
    item.classList.add('reveal-hidden');
    observer.observe(item);
  });
}

// Animate numeric counters for stats and KPI-style values.
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.dataset.target || '0');
        let current = 0;
        const step = Math.max(1, Math.floor(target / 120));
        const duration = 1200;
        const interval = duration / Math.ceil(target / step);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = current.toLocaleString();
          }
        }, interval);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));
}

// Initialize the FAQ accordion open/close interactions.
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  const readMoreBtn = document.getElementById('faqReadMore');
  
  items.forEach((item) => {
    const toggle = item.querySelector('.faq-toggle');
    toggle.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      const expanded = open ? 'true' : 'false';
      toggle.setAttribute('aria-expanded', expanded);
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
      const hiddenItems = document.querySelectorAll('.faq-item.faq-hidden');
      const showingAll = readMoreBtn.dataset.showing === 'true';
      
      if (showingAll) {
        hiddenItems.forEach(item => item.classList.remove('faq-shown'));
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.dataset.showing = 'false';
      } else {
        hiddenItems.forEach(item => item.classList.add('faq-shown'));
        readMoreBtn.textContent = 'Show Less';
        readMoreBtn.dataset.showing = 'true';
      }
    });
  }
}

// Initialize testimonial slider controls and auto-rotation.
function initTestimonialSlider() {
  const slides = Array.from(document.querySelectorAll('.testimonial-card'));
  const prev = document.getElementById('prevTestimonial');
  const next = document.getElementById('nextTestimonial');
  const openBtn = document.getElementById('openTestimonials');
  const modal = document.getElementById('testimonialModal');
  const closeModal = document.getElementById('closeTestimonials');

  if (!slides.length) return;

  function showSlide(index) {
    state.testimonialIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === state.testimonialIndex);
    });
  }

  function nextSlide() {
    showSlide(state.testimonialIndex + 1);
  }

  function startAutoRotate() {
    state.testimonialTimer = window.setInterval(nextSlide, 4000);
  }

  function stopAutoRotate() {
    window.clearInterval(state.testimonialTimer);
  }

  prev?.addEventListener('click', () => {
    stopAutoRotate();
    showSlide(state.testimonialIndex - 1);
    startAutoRotate();
  });

  next?.addEventListener('click', () => {
    stopAutoRotate();
    nextSlide();
    startAutoRotate();
  });

  openBtn?.addEventListener('click', () => {
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });

  closeModal?.addEventListener('click', () => {
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
  });

  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    slider.addEventListener('touchstart', (event) => {
      state.touchStartX = event.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (event) => {
      const distance = event.changedTouches[0].screenX - state.touchStartX;
      if (distance > 40) {
        stopAutoRotate();
        showSlide(state.testimonialIndex - 1);
        startAutoRotate();
      } else if (distance < -40) {
        stopAutoRotate();
        nextSlide();
        startAutoRotate();
      }
    });
  }

  showSlide(0);
  startAutoRotate();
}

// Search filter for documentation pages.
function initDocumentSearch() {
  const searchInput = document.getElementById('docSearch');
  const docs = Array.from(document.querySelectorAll('.doc-item'));
  if (!searchInput || !docs.length) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    docs.forEach((doc) => {
      const title = doc.dataset.docTitle.toLowerCase();
      const visible = title.includes(query) || query === '';
      doc.style.display = visible ? 'block' : 'none';
    });
  });
}

// Handle contact form submission behavior.
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.alert('Thank you! Your message is ready to send. We will respond shortly.');
    form.reset();
  });
}

// Handle waitlist form submission interactions.
function initWaitlistForm() {
  const waitlistForm = document.getElementById('waitlistForm');
  if (!waitlistForm) return;

  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = waitlistForm.querySelector('input[name="name"]');
    const emailInput = waitlistForm.querySelector('input[name="email"]');
    const name = nameInput?.value?.trim() || 'friend';
    window.alert(`Thanks, ${name}! You are now on the PlanAgent waitlist.`);
    waitlistForm.reset();
  });
}

// Initialize global site interactions once the DOM is ready.
function initGlobal() {
  initMobileMenu();
  revealOnScroll();
  animateCounters();
  initFaqAccordion();
  initTestimonialSlider();
  initDocumentSearch();
  initContactForm();
  initWaitlistForm();
}

window.addEventListener('DOMContentLoaded', initGlobal);
