const noiseScale = 2.0;

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

function flowLine(x, y, z, w){
  noFill();
  stroke(255, 255, 255, 64);

  beginShape();

  // Decreasing vertex size will decrease FPS
  const vertexSize = 8;
  // Store vertex step as a constant to save performance
  const vertexStep = 1 / width;
  
  // Loop for calculating each vertex point
  for(let i = 0; i < width; i += vertexSize){
    let noise0 = perlinCustom(i * vertexStep + x * 0.125 + z);
    let noise1 = perlinCustom(i * vertexStep - x * 0.25 + z);
    let noise2 = perlinCustom(i * vertexStep * 2.0 + x + z);
  
    vertex(i, height / 2 - map((noise0 + noise1 + noise2) * y, -3, 3, -256, 256) + w);
  }
  
  endShape();
}

function setup(){
  createCanvas(windowWidth, windowHeight);
 
  background(0);
}

function draw(){
  background(0, 0, 0, 255);
  
  let secondTime = millis() * 0.001;
  secondTime *= 0.25;

  for(let i = 0; i <= 8; i++){
    flowLine(secondTime, 0.5 + i / 8, 0, 0);
    flowLine(secondTime, 0.5 + i / 8, 120, 0);
  }

  // fpsCounter(43, 54, secondTime);
}