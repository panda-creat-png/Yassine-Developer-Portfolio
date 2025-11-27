// --- Navigation Logic (Keep this) ---
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}
navSlide();

// --- 1. TYPING ANIMATION SCRIPT ---
const typedTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Full Stack Developer", "CMC Student", "Problem Solver", "Freelancer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
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

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});


// --- 2. SCROLL ANIMATION (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Also animate children cards if they exist
            const cards = entry.target.querySelectorAll('.hidden-card');
            cards.forEach((card) => card.classList.add('show-card'));
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
// --- 3. DARK/LIGHT MODE TOGGLE ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Vérifier si l'utilisateur avait déjà choisi un mode
const currentTheme = localStorage.getItem('selected-theme');
const currentIcon = localStorage.getItem('selected-icon');

if (currentTheme) {
    body.classList[currentTheme === 'light' ? 'add' : 'remove']('light-mode');
    themeBtn.classList[currentIcon === 'fa-sun' ? 'add' : 'remove']('fa-sun');
    themeBtn.classList[currentIcon === 'fa-moon' ? 'add' : 'remove']('fa-moon'); // Nettoyage au cas où
    
    // Si c'est le mode clair, on s'assure que l'icône est le soleil
    if (currentTheme === 'light') {
        themeBtn.classList.remove('fa-moon');
        themeBtn.classList.add('fa-sun');
    }
}

themeBtn.addEventListener('click', () => {
    // Basculer la classe CSS
    body.classList.toggle('light-mode');
    
    // Basculer l'icône (Si c'est Lune -> Soleil, sinon Soleil -> Lune)
    if (themeBtn.classList.contains('fa-moon')) {
        themeBtn.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeBtn.classList.replace('fa-sun', 'fa-moon');
    }

    // Sauvegarder le choix de l'utilisateur
    localStorage.setItem('selected-theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    localStorage.setItem('selected-icon', themeBtn.classList.contains('fa-sun') ? 'fa-sun' : 'fa-moon');
});