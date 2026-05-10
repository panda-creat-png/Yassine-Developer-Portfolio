// --- Custom Mouse Cursor ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

// Initial state
gsap.set(cursorDot, {xPercent: -50, yPercent: -50});
gsap.set(cursorOutline, {xPercent: -50, yPercent: -50});

// Move cursor
window.addEventListener("mousemove", (e) => {
    // Quick move for the dot
    gsap.to(cursorDot, {duration: 0.1, x: e.clientX, y: e.clientY, ease: "power2.out"});
    // Slower move for the outline (trailing effect)
    gsap.to(cursorOutline, {duration: 0.5, x: e.clientX, y: e.clientY, ease: "power3.out"});
});

// Hover effect for links and buttons
const interactables = document.querySelectorAll("a, button, .btn, .skill-item, .project-image-wrapper, .theme-switch");
interactables.forEach(el => {
    el.addEventListener("mouseenter", () => {
        gsap.to(cursorOutline, {duration: 0.3, scale: 1.5, borderColor: "rgba(139, 92, 246, 0.8)", backgroundColor: "rgba(139, 92, 246, 0.1)"});
        gsap.to(cursorDot, {duration: 0.3, scale: 0});
    });
    el.addEventListener("mouseleave", () => {
        gsap.to(cursorOutline, {duration: 0.3, scale: 1, borderColor: "rgba(0, 242, 254, 0.5)", backgroundColor: "transparent"});
        gsap.to(cursorDot, {duration: 0.3, scale: 1});
    });
});

// --- Navigation Logic ---
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}
navSlide();

// --- Typing Animation ---
const typedTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Full Stack Developer", "Problem Solver", "Tech Enthusiast", "Creative Thinker"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

// Hero Animation on Load
const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

heroTimeline.from(".hero h3", { y: 20, opacity: 0, duration: 1, delay: 0.2 })
    .from(".hero h1", { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.8")
    .from(".hero h2", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
    .from(".hero p", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
    .from(".hero-btns", { y: 20, opacity: 0, duration: 1 }, "-=0.8");

// Sections Fade Up on Scroll
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Skills Container Fade Up Animation
gsap.from(".skills-marquee-wrapper", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".skills-marquee-wrapper",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// Project Cards Stagger Animation
gsap.utils.toArray('.project-showcase-item').forEach((item, index) => {
    gsap.from(item, {
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// --- Dark/Light Mode Toggle ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('selected-theme');
const currentIcon = localStorage.getItem('selected-icon');

if (currentTheme) {
    body.classList[currentTheme === 'light' ? 'add' : 'remove']('light-mode');
    themeBtn.className = currentIcon === 'fa-sun' ? 'fas fa-sun' : 'fas fa-moon';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (themeBtn.classList.contains('fa-moon')) {
        themeBtn.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeBtn.classList.replace('fa-sun', 'fa-moon');
    }

    localStorage.setItem('selected-theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    localStorage.setItem('selected-icon', themeBtn.classList.contains('fa-sun') ? 'fa-sun' : 'fa-moon');
});