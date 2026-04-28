/**
 * TechVoyager Twitter Clone - Interactive Functionality
 * Handles mobile menu, form validation, smooth scroll, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
  initSmoothScroll();
  initScrollTopButton();
  initActiveNavHighlight();
});

/* ---------- Mobile Menu Toggle ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const navList = document.querySelector('.nav-menu');
  if (!toggle || !navList) return;

  toggle.addEventListener('change', () => {
    navList.classList.toggle('nav-open', toggle.checked);
    document.body.style.overflow = toggle.checked ? 'hidden' : '';
  });

  // Close menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.checked = false;
      navList.classList.remove('nav-open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Contact Form Handling ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showFeedback('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate successful submission
    showFeedback('Message sent successfully! We\'ll get back to you soon.', 'success');
    form.reset();
  });

  function showFeedback(text, type) {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.className = 'form-feedback ' + type;
    feedback.style.display = 'block';

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---------- Scroll-to-Top Button Visibility ---------- */
function initScrollTopButton() {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  });
}

/* ---------- Active Nav Highlight on Scroll ---------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}

