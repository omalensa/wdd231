import { places } from '../data/discover.mjs';

const grid = document.getElementById('discover-grid');
const visitMessage = document.getElementById('visit-message');

// ===== Display the 8 cards =====
places.forEach(place => {
  const card = document.createElement('section');
  card.classList.add('discover-card');

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="images/${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button>Learn More</button>
  `;

  grid.appendChild(card);
});

// ===== localStorage Visit Message =====
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
  }
}

// Store the current visit
localStorage.setItem('lastVisit', now);