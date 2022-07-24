const MAX_INITIAL_VELOCITY = .5
const MAX_INITIAL_RADIUS = 1

class Particle {
    constructor(){
        this.pos = createVector(Math.random() * winX, (Math.random() * winX) - (winY/2));
        this.radius = (Math.random() * (MAX_INITIAL_RADIUS/2)) + (MAX_INITIAL_RADIUS/2);
        this.mass = Math.PI * this.radius * this.radius;
        this.velocity = createVector(Math.random() * MAX_INITIAL_VELOCITY - (MAX_INITIAL_VELOCITY/2), Math.random() * MAX_INITIAL_VELOCITY - (MAX_INITIAL_VELOCITY/2));
        this.force = createVector(0, 0);
    }

    update() {
        this.pos.add(this.velocity);
    }

    draw() {
        push();
        fill(color('black'));
        circle(this.pos.x, this.pos.y, 2*this.radius);
        pop();
    }
}