// Scroll Animations
const faders = document.querySelectorAll(".fade-up");

const appearOnScroll = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
  });
});

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Dark/Light Toggle
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}