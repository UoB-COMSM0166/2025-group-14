let totalCurvePoints = 100; // Define the total number of points for the canal
let aspectRatio = 16/9; 
let numberOfWaves = 1.75; // Define the number of waves in the canal
let amplitude = 400; // Define the amplitude of the waves
let playerScale = 1/30;
let lineThickness = 1;
let canalSideSeparation = 10; //Higher = closer together

function setup() {
  let width = windowWidth;
  let height = windowWidth / aspectRatio;
  createCanvas(width, height);
  pursuer = new Pursuer(width/4, height/2);
  player = new Player(width/2, height/2);
}

function draw() {
  background(60, 75, 20);
  new Canal(amplitude, numberOfWaves); // Create an instance of the Canal class
  
  player.move();
  player.show();

  let steering = pursuer.arrive(player);
  pursuer.applyForce(steering);
  pursuer.update();
  pursuer.show();
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
    strokeWeight(lineThickness);
    beginShape();
    //below is adapted from coding train wave example: https://editor.p5js.org/codingtrain/sketches/EIbEYLTaZ
    for (let i = 0; i <= totalCurvePoints; i++) {
      let angle = map(i, 0, totalCurvePoints, 0, this.numWaves * TWO_PI); // Control number of waves
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2) + width/canalSideSeparation; 
      let x = map(i, 0, totalCurvePoints, 0, width); 
      vertex(x, y);
    }
    endShape();

    beginShape();
    for (let i = 0; i <= totalCurvePoints; i++) {
      let angle = map(i, 0, totalCurvePoints, 0, this.numWaves * TWO_PI); 
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2) - width/canalSideSeparation; 
      let x = map(i, 0, totalCurvePoints, 0, width); 
      vertex(x, y);
    }
    endShape();
  }
}

//adapted from polly branch 
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
    ellipse(0, 0, width*playerScale, height*playerScale);
    pop();
  }
}

//from polly branch - references to canal class commented out
class Pursuer {
  constructor(x, y/*, canal*/) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 2;
    this.maxForce = 0.3;
    this.r = 16;
    //this.lowerYBound = canal.top + this.r;
    //this.upperYBound = canal.bottom - this.r;
  }

  pursue(target) {
    let t = target.position.copy();
    let prediction = target.velocity.copy();
    prediction.mult(10);
    t.add(prediction);
    fill(0, 255, 0);
    circle(t.x, t.y, 16);
    return this.seek(t);
  }

  // Arrival behaviour (slowing down as the pursuer approaches the target, and
  // stopping once it reaches the target) is implemented by setting the 'arrival'
  // argument of the seek method. 
  arrive(target) {
    // 2nd argument true enables the arrival behavior
    return this.seek(target, true);
  }

  // Implements pursuer seek behaviour
  seek(target, arrival = false) {
    // trajectory = target_position - pursuer_position (all vectors!)
    let force = p5.Vector.sub(target.position, this.position);
    let desiredSpeed = this.maxSpeed;
    if (arrival) {
      let slowRadius = 100;  // the threshold around the target which defines the pursuer 'approaching' target
      let distance = force.mag();
      if (distance < slowRadius) {
        // This maps the distance from the range 0-slowRadius to the equivalent position in the range 0-this.maxSpeed
        // I.e. it is a proportionality factor that translates the distance between pursuer and target to the speed of
        // the pursuer (speed slows as distance decreases).
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed); // Magnitude of the force is maxSpeed
    force.sub(this.velocity);   
    force.limit(this.maxForce); // Limit magnitude of the force to maxForce
    return force;
  }

  // Apply the force calculated in the steering calculations to the 
  // pursuer's acceleration (to change its trajectory)
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Update the pursuer's locomotion
  update() {
    this.velocity.add(this.acceleration); // Update velocity and position vectors resulting from changes in acceleration
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    // Limit the pursuer to the boundaries of the canal 
    /*if (this.position.y > this.upperYBound) {
      this.position.y = this.upperYBound;
    }
    if (this.position.y < this.lowerYBound) {
      this.position.y = this.lowerYBound;
    }
    */  
    this.acceleration.set(0, 0);
  }

  // Draw the pursuer to the screen
  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.position.x, this.position.y); // position of pursuer
    rotate(this.velocity.heading());             // orientation of pursuer
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0); // shape
    pop();
  }

}