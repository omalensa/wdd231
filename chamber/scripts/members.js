const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to load members");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error(error);
    membersContainer.innerHTML = `<p style="color:red">Error loading members</p>`;
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
      <img class="member-img" src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
      <h3>${member.name}</h3>
      <p class="level">${level} Member</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a>
    `;

    membersContainer.appendChild(card);
  });
}

// ===== VIEW TOGGLE =====
function setGridView() {
  membersContainer.classList.remove("list");
  membersContainer.classList.add("grid");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");

  // Show all images
  document.querySelectorAll(".member-img").forEach(img => {
    img.style.display = "block";
  });
}

function setListView() {
  membersContainer.classList.remove("grid");
  membersContainer.classList.add("list");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");

  // Hide all images
  document.querySelectorAll(".member-img").forEach(img => {
    img.style.display = "none";
  });
}

gridBtn.addEventListener("click", setGridView);
listBtn.addEventListener("click", setListView);

// Load members
getMembers();