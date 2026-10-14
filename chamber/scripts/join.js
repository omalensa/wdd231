// Set the hidden timestamp when the page loads
document.getElementById("timestamp").value = new Date().toLocaleString();

// Modal functionality
const infoButtons = document.querySelectorAll(".info-btn");
const closeButtons = document.querySelectorAll(".close-modal");

infoButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    document.getElementById(modalId).showModal();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});