document.getElementById("year").textContent = new Date().getFullYear();

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section[id]');
let navLinks = document.querySelectorAll('.header nav a');

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

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = document.querySelector('.header nav a[href="#' + id + '"]');
            if (activeLink) activeLink.classList.add('active');
        }
    });

    document.querySelector('.header').classList.toggle('scrolled', top > 50);
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
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function type() {
    const display = document.getElementById("text");
    if (prefersReducedMotion) {
        display.textContent = currentText;
        return;
    }
    display.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        currentText = texts[textIndex];
        setTimeout(type, 300);
    }
}
type();

const revealTargets = document.querySelectorAll(
    '.timeline-item, .service-box, .project-card, .heading, .contact form'
);

if (prefersReducedMotion) {
    revealTargets.forEach(el => el.classList.add('revealed'));
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}
