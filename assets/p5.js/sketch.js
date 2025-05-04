const noiseScale = 2.0;
const noiseSpeed = 0.25 * 0.001;

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

function perlinCustom(x){
  return noise(x) * 2.0 - 1.0;
}

function fpsCounter(x, y, z){
  let fps = frameCount / z;
  let fpsG = 1.0 - exp(-fps * 0.125);
  let fpsB = 1.0 - exp(-fps * 0.015625);

  fill(255, fpsG * 255, fpsB * 255);
  text(fps, x, y);
}

function flowLine(currTime, y, z, w){
  // Peak crest height
  const peakCrest = 1.0;
  // Get half of width
  const halfWidth = width * 0.5;
  // Get half of height multiplied
  const halfHeight = (height / 6) * peakCrest * y;

  // Decreasing vertex size will improve FPS
  const vertexSize = width / 128;
  // Store vertex step as a constant to save performance
  const vertexStep = 1 / width;

  beginShape();
  
  // Loop for calculating each vertex point
  for(let i = -halfWidth; i < halfWidth; i += vertexSize){
    const currStep = (i * vertexStep + z) * noiseScale;

    let noise0 = perlinCustom(currStep + currTime * 0.125);
    let noise1 = perlinCustom(currStep - currTime * 0.25);
    let noise2 = perlinCustom(currStep * 2.0 + currTime);
  
    vertex(i, (noise0 + noise1 + noise2) * halfHeight + w);
  }
  
  endShape();
}

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  let secondTime = millis() * noiseSpeed;

  background(0, 0, 0, 255);
  translate(width * 0.5, height * 0.5);

  noFill();
  strokeWeight(2);

  for(let i = 0; i <= 8; i++){
    stroke(255, 128, 0, 64);
    flowLine(secondTime, 0.5 + i / 8, 0, 0);

    stroke(0, 128, 255, 64);
    flowLine(secondTime, 0.5 + i / 8, 111, 0);

    stroke(0, 255, 0, 64);
    flowLine(secondTime, 0.5 + i / 8, 977, 0);
  }

  fpsCounter(-width * 0.45, -height * 0.25, secondTime);
}