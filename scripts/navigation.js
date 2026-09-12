const menuButton = document.getElementById('menu-button');
const nav = document.getElementById('primary-nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
  const isOpen = nav.classList.contains('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? '✕' : '☰';
});