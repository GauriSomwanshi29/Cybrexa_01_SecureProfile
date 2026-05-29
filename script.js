gsap.registerPlugin(ScrollTrigger);

/* BOOT SEQUENCE */

const bootText = document.getElementById("boot-text");
const bootScreen = document.getElementById("boot-screen");

const bootLines = [
  "STATUS: system_booting...",
  "SYS_LOAD: 100%",
  "welcome to cyber world..."
];

let lineIndex = 0;
let charIndex = 0;

function typeBoot() {
  if (lineIndex < bootLines.length) {
    const line = bootLines[lineIndex];

    if (charIndex < line.length) {
      bootText.innerHTML += line.charAt(charIndex);
      charIndex++;
      setTimeout(typeBoot, 35);
    } else {
      bootText.innerHTML += "<br>";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeBoot, 260);
    }
  } else {
    gsap.to(bootScreen, {
      opacity: 0,
      scale: 1.08,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        bootScreen.style.display = "none";
        startMainAnimations();
      }
    });
  }
}

typeBoot();

/* MATRIX BACKGROUND */

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

sizeCanvas();

const binary = "010101001101";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(3, 3, 7, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0,245,255,0.7)";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = binary[Math.floor(Math.random() * binary.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 55);

window.addEventListener("resize", () => {
  sizeCanvas();
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

/* MAIN GSAP ANIMATIONS */

function startMainAnimations() {
  gsap.to(".reveal", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out"
  });

  gsap.from(".hero-title", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".hero-summary", {
    opacity: 0,
    y: 25,
    delay: 0.35,
    duration: 1,
    ease: "power3.out"
  });
}

/* SCROLL REVEAL */

gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 82%",
      once: true
    }
  });
});

/* 3D TILT CARDS */

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((y / rect.height) - 0.5) * -14;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

/* ROADMAP HOVER LIGHT */

const roadNodes = document.querySelectorAll(".road-node");
const roadLine = document.querySelector(".road-line");

roadNodes.forEach((node, index) => {
  node.addEventListener("mouseenter", () => {
    const fill = (index + 1) / roadNodes.length;

    gsap.to(roadLine, {
      scaleY: fill,
      duration: 0.5,
      ease: "power2.out",
      transformOrigin: "bottom"
    });
  });

  node.addEventListener("mouseleave", () => {
    gsap.to(roadLine, {
      scaleY: 1,
      duration: 0.5,
      ease: "power2.out",
      transformOrigin: "bottom"
    });
  });
});

/* CONTACT BUTTON */

const contactForm = document.querySelector(".contact-form");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  sendBtn.textContent = "TRANSMITTING DATA...";

  setTimeout(() => {
    sendBtn.textContent = "MESSAGE SENT";
  }, 1200);

  setTimeout(() => {
    sendBtn.textContent = "Send Message";
    contactForm.reset();
  }, 2400);
});

/* LIVE CLOCK */

const clock = document.getElementById("clock");

function updateClock() {
  const now = new Date();

  clock.textContent = now.toLocaleTimeString("en-IN", {
    hour12: false
  });
}

setInterval(updateClock, 1000);
updateClock();