// Background Music Mute/Unmute
function toggleMute() {
    var music = document.getElementById('background-music');
    var muteBtn = document.querySelector('.mute-unmute');

    if (music.muted) {
        music.muted = false;
        muteBtn.innerHTML = "🔊";
    } else {
        music.muted = true;
        muteBtn.innerHTML = "🔈";
    }
}

// Rotating Text Functionality
let textSets = [
    { text: "Hi, I'm ByteNinja", tagline: "Welcome to My Studio" },
    { text: "I'm a Freelancer", tagline: "Video Editor | Photographer" },
    { text: "I'm a Network Engineer", tagline: "Network Designer | Network Management and Orchestration | Cyber Security Expert" }
];

let index = 0;

function rotateText() {
    const textElement = document.querySelector('.text-set');
    const taglineElement = document.querySelector('.tagline');

    index = (index + 1) % textSets.length;

    textElement.textContent = textSets[index].text;
    taglineElement.textContent = textSets[index].tagline;
}

setInterval(rotateText, 15000);

// Particle Effect
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const particleCount = 100;
const colors = ["#FF6347", "#40E0D0", "#FFD700", "#FF4500"]; // Customize colors

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle(x, y) {
    return {
        x,
        y,
        size: Math.random() * 4 + 1, // Adjusted size range
        speedX: (Math.random() - 0.5) * 4, // Adjusted speed range
        speedY: (Math.random() - 0.5) * 4, // Adjusted speed range
        color: colors[Math.floor(Math.random() * colors.length)],
        lifetime: Math.random() * 30 + 15 // Adjusted lifetime range
    };
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.lifetime--;
        if (particle.lifetime <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }
}

function animateParticles() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(e.x, e.y));
    }
    canvas.style.display = 'block'; // Show canvas on mouse move
});

window.addEventListener('mouseleave', () => {
    canvas.style.display = 'none'; // Hide canvas when mouse leaves
});
