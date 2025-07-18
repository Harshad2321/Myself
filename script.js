// Fade-in on scroll
document.querySelectorAll('.fade-in').forEach(el => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      obs.unobserve(e.target);
    }
  }, {threshold: 0.2});
  obs.observe(el);
});

// Dark/Light Mode Toggle
const toggle = document.getElementById('mode-toggle');
toggle.onclick = () => {
  if (document.documentElement.dataset.theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
};

// Back-to-top visibility & scroll up
const back = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  back.style.display = window.scrollY > 300 ? 'block' : 'none';
});
back.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
