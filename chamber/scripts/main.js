// Hamburger Menu
const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
  menuButton.textContent = primaryNav.classList.contains("open") ? "✕" : "☰";
});

// Current Year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Last Modified
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;