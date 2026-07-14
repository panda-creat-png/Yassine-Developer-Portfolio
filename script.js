// =============================================
// Yassine Bistaine — Premium Portfolio JS
// =============================================

gsap.registerPlugin(ScrollTrigger);

// --- Preloader ---
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("preloader").classList.add("hidden");
        initAnimations();
    }, 1400);
});

// --- Scroll Progress ---
const scrollProgress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = h > 0 ? (window.scrollY / h) * 100 + "%" : "0%";
});

// --- Header scroll ---
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
});

// --- Mobile Nav ---
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
});

navMenu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// --- Active Nav Link ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link:not(.nav-cta)");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
});

// --- Typing Effect ---
const typedEl = document.querySelector(".typing-text");
const texts = [
    "Full Stack Developer",
    "Junior Developer Avancé",
    "Problem Solver",
    "React & Node.js Dev"
];
let textIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
    const current = texts[textIdx];
    if (!isDeleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeLoop, 2200);
            return;
        }
        setTimeout(typeLoop, 70);
    } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            textIdx = (textIdx + 1) % texts.length;
            setTimeout(typeLoop, 500);
            return;
        }
        setTimeout(typeLoop, 35);
    }
}

// --- Photo Tilt Effect ---
const photoTilt = document.getElementById("photo-tilt");
if (photoTilt && window.matchMedia("(pointer: fine)").matches) {
    photoTilt.addEventListener("mousemove", (e) => {
        const rect = photoTilt.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        photoTilt.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    photoTilt.addEventListener("mouseleave", () => {
        photoTilt.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
    });
}

// --- Counter Animation ---
function animateCounters() {
    document.querySelectorAll(".stat-num").forEach(counter => {
        const target = +counter.dataset.target;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
}

// --- Skill Bars Animation ---
function animateSkillBars() {
    document.querySelectorAll(".skill-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.width + "%";
    });
}

// --- GSAP Animations ---
function initAnimations() {
    typeLoop();

    // Hero reveals
    gsap.to(".hero-text .reveal", {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2
    });
    gsap.to(".hero-photo.reveal", {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4
    });

    // Section reveals
    gsap.utils.toArray(".reveal").forEach(el => {
        if (el.closest(".hero-text") || el.classList.contains("hero-photo")) return;
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Stats counter
    ScrollTrigger.create({
        trigger: ".stats-bar",
        start: "top 80%",
        once: true,
        onEnter: animateCounters
    });

    // Skill bars
    ScrollTrigger.create({
        trigger: ".skills-layout",
        start: "top 75%",
        once: true,
        onEnter: animateSkillBars
    });

    // Timeline stagger
    gsap.from(".timeline-item", {
        scrollTrigger: { trigger: ".timeline", start: "top 80%" },
        x: -40, opacity: 0, duration: 0.7, stagger: 0.2, ease: "power3.out"
    });

    // Project cards
    gsap.from(".project-card", {
        scrollTrigger: { trigger: ".projects-layout", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
    });
}

// --- Theme Toggle ---
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = themeBtn.querySelector("i");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    themeIcon.classList.replace(isLight ? "fa-moon" : "fa-sun", isLight ? "fa-sun" : "fa-moon");
    localStorage.setItem("theme", isLight ? "light" : "dark");
});
