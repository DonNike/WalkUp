const modalBtns = document.querySelectorAll('.modal button'); // Select all close buttons within modals
const modals = document.querySelectorAll('.modal'); // Select all modal elements

// Function to open a specific modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// Function to close a modal
function closeModal() {
  const modal = document.querySelector('.modal.show'); // Select currently visible modal
  if (modal) {
    modal.style.display = "none";
  }
}

// Add click event listeners to open buttons
document.querySelectorAll('button[id^="openModal"]').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.id.slice(10); // Extract modal ID from button ID (e.g., openModal1 -> modal1)
    openModal(modalId);
  });
});

// Add click event listeners to close buttons
modalBtns.forEach(button => {
  button.addEventListener('click', closeModal);
});

// Add functionality to close modal by clicking outside (optional)
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    closeModal();
  }
});
