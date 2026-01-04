// ----- CONFIG -----
const GRAIN_INTENSITY = 0.02;      // 0–1, how visible the grain is
const SCRATCH_COUNT = 0;           // Number of simultaneous scratches
const SCRATCH_SPAWN_RATE = 0.02;   // Probability per frame to spawn new scratch
const SCRATCH_SPEED = 1.2;         // Vertical drift speed
const GRAIN_SIZE = 2;              // Grain pixel size (1 = per-pixel)

let scratches = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  
  noStroke();
}

function draw() {
  drawGradient();
  
  drawGrain();
  
  updateScratches();
  drawScratches();
}

function drawGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(8, 8, 15), color(5, 5, 5), inter);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
}

function drawGrain() {
  loadPixels();
  
  for (let x = 0; x < width; x += GRAIN_SIZE) {
    for (let y = 0; y < height; y += GRAIN_SIZE) {
      let grain = random(-GRAIN_INTENSITY, GRAIN_INTENSITY) * 255;
      
      for (let dx = 0; dx < GRAIN_SIZE && x + dx < width; dx++) {
        for (let dy = 0; dy < GRAIN_SIZE && y + dy < height; dy++) {
          let index = 4 * ((y + dy) * width + (x + dx));
          pixels[index] += grain;     // R
          pixels[index + 1] += grain; // G
          pixels[index + 2] += grain; // B
        }
      }
    }
  }
  
  updatePixels();
}

function updateScratches() {
  if (random() < SCRATCH_SPAWN_RATE && scratches.length < SCRATCH_COUNT) {
    scratches.push({
      x: random(width),
      y: random(-height * 0.5, 0), 
      height: random(height * 0.3, height * 1.2),
      width: random(0.5, 2),
      alpha: random(40, 120),
      speed: SCRATCH_SPEED * random(0.8, 1.2),
      life: 1.0 
    });
  }
  
  for (let i = scratches.length - 1; i >= 0; i--) {
    let s = scratches[i];
    s.y += s.speed;
    
    if (s.y > height * 0.7) {
      s.life -= 0.01;
    }
    
    if (s.y > height + s.height || s.life <= 0) {
      scratches.splice(i, 1);
    }
  }
}

function drawScratches() {
  for (let s of scratches) {
    let wobble = sin(frameCount * 0.03 + s.x) * 0.5;
    
    fill(255, 255, 255, s.alpha * s.life);
    rect(s.x + wobble, s.y, s.width, s.height);
    
    fill(255, 255, 255, s.alpha * 0.3 * s.life);
    rect(s.x + wobble - 0.5, s.y, s.width + 1, s.height);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
