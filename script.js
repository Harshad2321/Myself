// Fade-in sections
document.querySelectorAll('.fade-in').forEach(el => {
  const obs = new IntersectionObserver(([e]) => e.isIntersecting && (e.target.classList.add('active'), obs.unobserve(el)), {threshold:0.2});
  obs.observe(el);
});

// Dark/light mode toggle
const toggle = document.getElementById('mode-toggle');
toggle.onclick = () => {
  const mode = document.documentElement.dataset.theme === 'dark' ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', mode);
};

// Back to top visibility
const back = document.getElementById('back-to-top');
window.onscroll = () => back.style.display = window.scrollY > 400 ? 'block' : 'none';
