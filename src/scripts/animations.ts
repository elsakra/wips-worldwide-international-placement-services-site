import { animate, inView, scroll } from '@motionone/dom';

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Navbar background on scroll
  const navbar = document.querySelector('nav');
  if (navbar) {
    scroll(
      ({ y }) => {
        if (y.current > 50) {
          navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
        } else {
          navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
        }
      },
      {
        target: document.body,
        offset: [0, 100]
      }
    );
  }

  // Animate elements on scroll
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  animateOnScroll.forEach((element) => {
    inView(element, () => {
      element.classList.add('visible');
    }, { margin: '-100px' });
  });

  // Hero animations on load
  const heroElements = document.querySelectorAll('.animate-fade-up, .animate-fade-in');
  heroElements.forEach((element, index) => {
    animate(
      element,
      { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
      { 
        duration: 0.8,
        delay: index * 0.1,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    );
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}