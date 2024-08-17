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
    { text: "I'm a Freelance", tagline: "Video Editor | Photographer" },
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

// Mouse Trail Effect
const trailColors = ["#FFD700", "#00BFFF"]; // Golden and blue colors
const trailSize = 10; // Size of the circles in the trail
const trailLength = 20; // Number of circles in the trail

let mouseTrail = [];

// Create trail elements
for (let i = 0; i < trailLength; i++) {
    let trailElement = document.createElement('div');
    trailElement.classList.add('trail-circle');
    trailElement.style.width = trailSize + 'px';
    trailElement.style.height = trailSize + 'px';
    trailElement.style.borderRadius = '50%';
    trailElement.style.backgroundColor = trailColors[i % trailColors.length];
    trailElement.style.pointerEvents = 'none';
    document.body.appendChild(trailElement);
    mouseTrail.push(trailElement);
}

// Update trail positions
window.addEventListener('mousemove', function (e) {
    for (let i = trailLength - 1; i > 0; i--) {
        mouseTrail[i].style.left = mouseTrail[i - 1].style.left;
        mouseTrail[i].style.top = mouseTrail[i - 1].style.top;
    }
    mouseTrail[0].style.left = e.pageX - trailSize / 2 + 'px';
    mouseTrail[0].style.top = e.pageY - trailSize / 2 + 'px';
});
