document.querySelector('.drawdown').addEventListener('click', function() {
  document.querySelector('.details').classList.toggle('active');
});

window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });
});