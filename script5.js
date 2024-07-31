
const modals = document.querySelectorAll(".modal");
const btns = document.querySelectorAll(".option");
const closeBtns = document.querySelectorAll(".close");
const nextButton = document.querySelector(".button"); // Select the NEXT button

var modal = function(modalClick) {
    modals[modalClick].classList.add("active");
};

btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        modal(index);
    });
});

closeBtns.forEach((closeBtn, index) => {
    closeBtn.addEventListener("click", () => {
        modals[index].classList.remove("active");
    });
});

window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });
});

// Function to change the NEXT button styles
function changeNextButtonStyles() {
    nextButton.style.backgroundColor = "#ff914d";
    nextButton.style.color = "white";
}

// Adding event listeners to modals to change the NEXT button styles on click
modals.forEach((modal) => {
    modal.addEventListener("click", () => {
        changeNextButtonStyles();
    });
});
