document.getElementById("year").textContent = new Date().getFullYear();

let menuIcon = document.querySelector('#menu-icon');
let navbar =  document.querySelector('.navbar');
let sections =  document.querySelectorAll('.section');
let navLinks =  document.querySelectorAll('.header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active');
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const texts = [
  "Full Stack Developer",
  "Software Engineer",
  "Mobile App Developer",
  "Web Developer",
  "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let currentText = texts[textIndex];
let isDeleting = false;

function type() {
  const display = document.getElementById("text");

  display.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(type, 100);
  }
  else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  }
  else if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  }
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    currentText = texts[textIndex];
    setTimeout(type, 300);
  }
}

type();
