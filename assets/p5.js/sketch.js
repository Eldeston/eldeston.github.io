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
  return noise(x * noiseScale) * 2.0 - 1.0;
}

function fpsCounter(x, y, z){
  let fps = frameCount / z;
  let fpsG = 1.0 - exp(-fps * 0.125);
  let fpsB = 1.0 - exp(-fps * 0.015625);

  fill(255, fpsG * 255, fpsB * 255);
  text(fps, x, y);
}

function flowLine(currTime, y, z, w){
  beginShape();

  // Decreasing vertex size will decrease FPS
  const vertexSize = 16;
  // Store vertex step as a constant to save performance
  const vertexStep = 1 / width;
  
  // Loop for calculating each vertex point
  for(let i = 0; i < width; i += vertexSize){
    let currStep = i * vertexStep;

    let noise0 = perlinCustom(currStep + currTime * 0.125 + z);
    let noise1 = perlinCustom(currStep - currTime * 0.25 + z);
    let noise2 = perlinCustom(currStep * 2.0 + currTime + z);
  
    vertex(i, map((noise0 + noise1 + noise2) * y, -3, 3, 0, height) + w);
  }
  
  endShape();
}

function setup(){
  createCanvas(windowWidth, windowHeight);
 
  background(0);
}

function draw(){
  background(0, 0, 0, 255);
  
  let secondTime = millis() * noiseSpeed;

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

  // fpsCounter(43, 54, secondTime);
}