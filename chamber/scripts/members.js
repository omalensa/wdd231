const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Members loaded successfully:", data); // ← helpful for debugging
    displayMembers(data);

  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = `
      <p style="color: red; padding: 1rem;">
        Sorry, the member data could not be loaded.<br>
        Please check the console for more details.
      </p>`;
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const level = member.membership === 3 ? "Gold" :
                  member.membership === 2 ? "Silver" : "Member";

    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
      <h3>${member.name}</h3>
      <p class="level">${level} Member</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a>
    `;

    membersContainer.appendChild(card);
  });
}

// View toggle
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

getMembers();