// function transitionToPage(url) {
//     // Fade out animation before navigating to the next page
//     document.body.style.animation = 'fadeOut 2.5s forwards';

//     // Navigate to the next page after the animation completes
//     setTimeout(() => {
//         window.location.href = url;
//     }, 500);
// }

// const button = document.getElementById('myButton');

// button.addEventListener('click', function() {
//     window.location.href = 'index2.html'; 
// });

let buttonElement = document.querySelector("button");

setTimeout(function(){
  window.location.href = "index2.html";
}, 5000);

buttonElement.addEventListener("click");

gsap.fromTo('.loading-page' , {opacity:1},{
  opacity:0,
  duration:1.5,
  delay:3.5,
});

gsap.fromTo('.logo-name' ,{
  y:50,
  opacity:0,
},{
  y:0,
  opacity:1,
  duration:2,
  delay:0.5,
})