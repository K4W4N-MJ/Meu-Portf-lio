function createGlobalSquares(amount) {
    const container = document.createElement('div');
    container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;';
    document.body.appendChild(container);

    for (let i = 0; i < amount; i++) {
        const square = document.createElement('div');
        square.classList.add('quadrados');

        const size = Math.floor(Math.random() * 150) + 50;
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const rotation = Math.floor(Math.random() * 360);

        square.style.setProperty('--rotation', `${rotation}deg`);
        
        Object.assign(square.style, {
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${rotation}deg)`,
        });

        container.appendChild(square);
    }
}

createGlobalSquares(10);

const reveals = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.4
});

reveals.forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
});



const navLinks = document.querySelectorAll(".navA");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});

window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

const heroText = document.querySelector(".t2");
const originalText = heroText.textContent;
heroText.textContent = "";

let i = 0;

function typeEffect() {
    if (i < originalText.length) {
        heroText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
    }
}

window.addEventListener("load", () => {
    typeEffect();
});