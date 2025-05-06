const speed = 4.0;
const particles = 128;
const noiseScale = 1 / 128;
const noiseRotations = 4 * 3.1416;

let particleList = [];

class particle{
  constructor(position, velocity){
    this.position = position;
    this.velocity = velocity;
  }

  updateParticle(){
    // Multiply velocity by speed and add to position to update and move the particle
    this.position.add(this.velocity.mult(speed));

    // Calculate new velocity
    let angle = perlinCustom(this.position.x, this.position.y) * noiseRotations;
    // Create a 2D vector and assign new velocity
    this.velocity = createVector(cos(angle), sin(angle));

    // Finally, color the particle according to current velocity and time
    stroke(abs(this.velocity.x) * 255, abs(this.velocity.y) * 255, cos(millis() * 0.001) * 255)

    // Check if particle goes outside the window borders and reset position
    if(this.position.x > windowWidth || this.position.x < 0 || this.position.y > windowHeight || this.position.y < 0) this.position = createVector(random(windowWidth), random(windowHeight));
  }

  displayParticle(){
    // Simply display the particle with a circle
    // circle(this.position.x, this.position.y, 2);
    point(this.position.x, this.position.y);
  }
}

// FPS counter
function fpsCounter(x, y){
  let fps = frameRate();
  let fpsG = 1.0 - exp(-fps * 0.125);
  let fpsB = 1.0 - exp(-fps * 0.015625);

  fill(255, fpsG * 255, fpsB * 255);
  textAlign(CENTER);
  text(fps, x, y);
}

/*
function squared(x){
  return x * x;
}

function mix(x, y, z){
  return x + (y - x) *z;
}

function coordFract(x, axis){
  // return x;
  return fract(x / axis) * axis;
}
*/

function perlinCustom(x, y){
  return noise(x * noiseScale, y * noiseScale, 0);
}

function setup(){
  // Utilize full window size
  createCanvas(windowWidth, windowHeight);

  // Set initial background black
  background(0, 0, 0, 255);

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
  noFill();
  strokeWeight(4);

  background(0, 0, 0, 8);
  
  for(let i = 0; i < particleList.length; i++){
    particleList[i].updateParticle();
    particleList[i].displayParticle();
  }

  // noStroke();
  // fpsCounter(windowWidth * 0.125, windowHeight * 0.125)
}