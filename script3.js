const agreeCheckbox = document.getElementById('agree');
const proceedButton = document.getElementById('btn-2');

agreeCheckbox.addEventListener('change', function() {
  if (this.checked) {
    proceedButton.classList.add('active');  // Add 'active' class for styling
    proceedButton.disabled = false;  // Enable button click
  } else {
    proceedButton.classList.remove('active');  // Remove 'active' class
    proceedButton.disabled = true;  // Disable button click
    proceedButton.style.opacity = 0.6;  // Reduce opacity for disabled button
    proceedButton.style.cursor = 'not-allowed';  // Set cursor for disabled button
  }
});
