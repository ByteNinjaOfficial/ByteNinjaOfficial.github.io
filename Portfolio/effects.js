import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';

const pc = particlesCursor ({

    el: document.getElementById('particlesCanvas'),
    gpgpuSize: 512,
    colors: [0x00ffff, 0x0000ff], // Particle colors (cyan and blue)
    color: 0xff0000, // Primary color for particles
    coordScale: 0.5,
    noiseIntensity: 0.001,
    noiseTimeCoef: 0.0001,
    pointSize: 5, // Particle size
    pointDecay: 0.0025,
    sleepRadiusX: 250,
    sleepRadiusY: 250,
    sleepTimeCoefX: 0,
    sleepTimeCoefY: 0
})






