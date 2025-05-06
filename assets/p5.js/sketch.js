const speed = 4.0;
const particles = 256;
const noiseScale = 1 / 128;
const noiseRotations = 1 * 3.1416;

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
    this.velocity = createVector(cos(angle), sin(angle));

    // Check if particle goes outside the window borders and reset position
    if(this.position.x > windowWidth || this.position.x < 0 || this.position.y > windowHeight || this.position.y < 0) this.position = createVector(random(windowWidth), random(windowHeight));

    fill(abs(this.velocity.x * 255), abs(this.velocity.y * 255), sin(millis() * 0.001) * 255)
  }

  displayParticle(){
    circle(this.position.x, this.position.y, 2);
  }
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
  return noise(x * noiseScale, y * noiseScale, 0) * 2.0 - 1.0;
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  background(0, 0, 0, 255);

  for(let i = 0; i < particles; i++){
    particleList[i] = new particle(createVector(random(windowWidth), random(windowHeight)), createVector(-1, 0));
  }
}

// Keeps window responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(0, 0, 0, 8);
  noStroke();
  
  for(let i = 0; i < particleList.length; i++){
    particleList[i].updateParticle();
    particleList[i].displayParticle();
  }
}