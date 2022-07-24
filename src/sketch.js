const winX = window.innerWidth;
const winY = window.innerHeight;
const NUM_PARTICLES = 400;
const GRAVITATIONAL_CONSTANT = 1;
let particles = [];

function setup() {
  createCanvas(winX, winY);
  for (let i = 0; i < NUM_PARTICLES; i++)
    particles.push(new Particle());
}

function draw() {
  // put drawing code here
  background(128)
  draw_particles();
  draw_info();
}

function draw_particles() {
    gravitate_particles();
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

function gravitate_particles(){
    particles.forEach(particle => {
        particle.force = createVector(0,0);
    });
    for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
            let p0 = particles[i];
            let p1 = particles[j];
            let d = dist(p0.pos.x, p0.pos.y, p1.pos.x, p1.pos.y);
            if (d < p0.radius + p1.radius) {
                join_particles(p0, p1);
                break;
            }
            let fG = GRAVITATIONAL_CONSTANT * ((p0.mass * p1.mass) / (d * d));
            let fGr = fG / d;
            p0.force.x += fGr * (p1.pos.x - p0.pos.x);
            p0.force.y += fGr * (p1.pos.y - p0.pos.y);
            p1.force.x += fGr * (p0.pos.x - p1.pos.x); 
            p1.force.y += fGr * (p0.pos.y - p1.pos.y);
        }
    }
    particles.forEach(particle => {
        let acceleration = createVector(particle.force.x/particle.mass, particle.force.y/particle.mass);
        particle.velocity.add(acceleration);
    });
}

function draw_info(){
    push();
    textSize(32);
    fill(color('black'));
    let fr = frameRate();
    fr = fr > 30 ? 30 : fr;
    text(parseInt(fr), 10, 30);
    text(particles.length, 10, 60);
    pop();
}

function join_particles(p0, p1) {
    let pn = new Particle();
    pn.pos = p0.mass > p1.mass ? p0.pos : p1.pos;
    pn.mass = p0.mass + p1.mass;
    pn.radius = Math.sqrt(pn.mass / Math.PI);
    pn.velocity.x = ((p0.mass * p0.velocity.x) + (p1.mass * p1.velocity.x)) / pn.mass;
    pn.velocity.y = ((p0.mass * p0.velocity.y) + (p1.mass * p1.velocity.y)) / pn.mass;
    particles.splice(particles.indexOf(p0), 1);
    particles.splice(particles.indexOf(p1), 1);
    particles.push(pn);
}