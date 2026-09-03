document.getElementById("year").textContent = new Date().getFullYear();

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('.section, section');
let navLinks = document.querySelectorAll('.header nav a');
let header = document.querySelector('.header');
let progressBar = document.querySelector('#progress-bar');
let backToTop = document.querySelector('#back-to-top');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        let navLink = document.querySelector(`.header nav a[href*="${id}"]`);

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => { links.classList.remove('active'); });
            if (navLink) navLink.classList.add('active');
        }
    });

    header.classList.toggle('sticky', window.scrollY > 100);
    backToTop.classList.toggle('active', window.scrollY > 500);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

const texts = [
  "Full Stack Developer",
  "Software Engineer",
  "Mobile Developer",
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

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => { revealObserver.observe(el); });