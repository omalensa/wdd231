async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter only Gold (3) and Silver (2) members
    const eligible = members.filter(m => m.membership === 2 || m.membership === 3);

    // Shuffle and pick 2 or 3 random members
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

    displaySpotlights(selected);
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function displaySpotlights(members) {
  const container = document.getElementById("spotlight-cards");
  container.innerHTML = "";

  members.forEach(member => {
    const level = member.membership === 3 ? "Gold" : "Silver";

    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p class="level">${level} Member</p>
      <p>${member.phone}</p>
      <p>${member.address}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    container.appendChild(card);
  });
}

getSpotlights();