let total = 100; // Define the total number of points for the canal
let aspectRatio = 16/9; 

function setup() {
  let width = windowWidth;
  let height = windowWidth / aspectRatio;
  createCanvas(width, height);
  player = new Player(width/2, height/2);
}

function draw() {
  background(60, 75, 20);
  new Canal(400, 1.75); // Create an instance of the Canal class
  player.move();
  player.show();
}

class Player{
  constructor(x, y/*, canal*/) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.speed = 3;
    this.w = width/20;
    this.h = height/20;
    //this.lowerYBound = canal.top + (this.w/2);
    //this.upperYBound = canal.bottom - (this.w/2);
  }

  move() {
    this.velocity.set(0, 0);
    
    if (keyIsDown(UP_ARROW)) this.velocity.y = -this.speed;
    if (keyIsDown(DOWN_ARROW)) this.velocity.y = this.speed;
    if (keyIsDown(LEFT_ARROW)) this.velocity.x = -this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.velocity.x = this.speed;

    this.position.add(this.velocity);
  }
  
  show() {
    noStroke();
    fill(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    ellipse(0, 0, width/20, height/20);
    pop();
  }
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

