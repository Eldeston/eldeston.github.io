// Disables friendly error to increase performance
p5.disableFriendlyErrors = true;

const speed = 4.0;
const particles = 8196;
const particleSize = 2;
const noiseScale = 1 / 128;
const noiseRotations = 3 * 3.1416;

let particleList = [];

class particle{
  constructor(position, velocity){
    this.position = position;
    this.velocity = velocity;
  }

  updateParticle(){
    // Multiply velocity by speed and add to position to update and move the particle
    this.position.add(this.velocity.mult(speed));

    // Calculate time to animate noise
    let currTime = millis() * 0.0001;
    // Calculate new velocity vector based on perlin noise
    let angle = noise(this.position.x * noiseScale, this.position.y * noiseScale, currTime) * noiseRotations;
    // Create a 2D vector and assign new velocity
    this.velocity = createVector(Math.sin(angle), Math.cos(angle));

    // Finally, color the particle according to current velocity and time
    stroke(Math.abs(this.velocity.x) * 255, Math.abs(this.velocity.y) * 255, Math.sin(currTime) * 255);

    // Check if particle goes outside the window borders and reset position
    if(this.position.x > windowWidth || this.position.x < 0 || this.position.y > windowHeight || this.position.y < 0) this.position = createVector(Math.random() * windowWidth, Math.random() * windowHeight);
  }

  displayParticle(){
    // Simply display the particle with a point
    // circle(this.position.x, this.position.y, 2);
    point(this.position.x, this.position.y);
  }
}

function setup(){
  // Utilize full window size
  createCanvas(windowWidth, windowHeight);
  // Set initial background black
  background(0, 0, 0, 255);

  // Set stroke thickness
  strokeWeight(particleSize);
  // Don't use fill
  noFill();

  // Generate new particles first on setup
  for(let i = 0; i < particles; i++){
    particleList[i] = new particle(createVector(0, 0), createVector(-1, 0));
  }
}

function windowResized(){
  // Keeps window responsive
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  // Set alpha to 8 to create trails
  background(0, 0, 0, 8);
  
  // Load, update, and display particles
  for(let i = 0; i < particleList.length; i++){
    particleList[i].updateParticle();
    particleList[i].displayParticle();
  }
}