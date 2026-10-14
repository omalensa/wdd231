const tipsContainer = document.getElementById('tips-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('tip-modal');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalLevel = document.getElementById('modal-level');
const modalDescription = document.getElementById('modal-description');
const closeModalBtn = document.querySelector('.close-modal');

let allTips = [];

// ===== Fetch Data =====
async function getTips() {
  try {
    const response = await fetch('data/tips.json');
    if (!response.ok) throw new Error('Failed to load tips');
    allTips = await response.json();
    displayTips(allTips);
  } catch (error) {
    console.error('Error:', error);
    tipsContainer.innerHTML = `<p class="error">Sorry, safety tips could not be loaded.</p>`;
  }
}

// ===== Display Tips =====
function displayTips(tips) {
  tipsContainer.innerHTML = '';

  tips.forEach(tip => {
    const card = document.createElement('article');
    card.classList.add('tip-card');
    card.innerHTML = `
      <h3>${tip.title}</h3>
      <p class="category">${tip.category}</p>
      <p class="level">${tip.level}</p>
      <p>${tip.description.substring(0, 90)}...</p>
      <button class="details-btn" data-id="${tip.id}">Learn More</button>
    `;
    tipsContainer.appendChild(card);
  });

  // Add event listeners to the new buttons
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tip = allTips.find(t => t.id == btn.dataset.id);
      showModal(tip);
    });
  });
}

// ===== Filter =====
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    localStorage.setItem('preferredFilter', filter);   // Save preference

    if (filter === 'all') {
      displayTips(allTips);
    } else {
      const filtered = allTips.filter(tip => tip.category === filter);
      displayTips(filtered);
    }
  });
});

// ===== Modal =====
function showModal(tip) {
  modalTitle.textContent = tip.title;
  modalCategory.textContent = `Category: ${tip.category}`;
  modalLevel.textContent = `Priority: ${tip.level}`;
  modalDescription.textContent = tip.description;
  modal.showModal();
}

closeModalBtn.addEventListener('click', () => modal.close());

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

// ===== Load saved filter preference =====
const savedFilter = localStorage.getItem('preferredFilter') || 'all';
document.querySelector(`[data-filter="${savedFilter}"]`)?.classList.add('active');

getTips();