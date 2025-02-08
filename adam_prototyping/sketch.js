let pixels = 100;
let width = 16 * pixels;
let height = 9 * pixels;
let total = 100; // Define the total number of points for the canal

function setup() {
  createCanvas(width, height);
  x1 = width / 2;
  y1 = height / 2;
}

function draw() {
  background(60, 75, 20);
  new Canal(400, 1.75); // Create an instance of the Canal class
  
   
  if (keyIsDown(UP_ARROW)) {
    y1 -= 2;
    if (keyIsDown(LEFT_ARROW)) {
     x1 -= 2;
    } else if (keyIsDown(RIGHT_ARROW)) {
     x1 += 2;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    y1 += 2;
    if (keyIsDown(LEFT_ARROW)) {
     x1 -= 2;
    } else if (keyIsDown(RIGHT_ARROW)) {
     x1 += 2;
    }
  } else if (keyIsDown(LEFT_ARROW)) {
    x1 -= 2;
  } else if (keyIsDown(RIGHT_ARROW)) {
    x1 += 2;
    
  }
  noStroke();
  fill(0);
  ellipse(x1, y1, pixels/2, pixels/3);
}

class Canal {
  constructor(waveHeight, numWaves) {
    this.waveHeight = waveHeight; // Controls the vertical amplitude of the waves
    this.numWaves = numWaves; // Controls how many waves appear
    this.drawCanal();
  }

  drawCanal() {
    noFill();
    stroke(0, 0, 100);
    strokeWeight(1);
    beginShape();
    for (let i = 0; i <= total; i++) {
      let angle = map(i, 0, total, 0, this.numWaves * TWO_PI); // Control number of waves
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2); 
      let x = map(i, 0, total, 0, width); // Make the canal stretch across the full width
      vertex(x, y);
    }
    endShape();
  }
}

