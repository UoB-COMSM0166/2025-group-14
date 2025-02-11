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
  canal = new Canal(amplitude, numberOfWaves); // Create an instance of the Canal class
  pursuer = new Pursuer(0, height/2, canal);
  player = new Player(width/2, height/2, canal);
}

function draw() {
  background(60, 75, 20);
  canal.show();
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
    this.show();
  }

  show() {
    noFill();
    stroke(0, 0, 100);
    strokeWeight(lineThickness);
    //below is adapted from coding train wave example: https://editor.p5js.org/codingtrain/sketches/EIbEYLTaZ
    
    //Draw top canal boundary
    beginShape();
    for (let i = 0; i <= totalCurvePoints; i++) {
      let angle = map(i, 0, totalCurvePoints, 0, this.numWaves * TWO_PI); 
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2) - width/canalSideSeparation; 
      let x = map(i, 0, totalCurvePoints, 0, width); 
      vertex(x, y);
    }
    endShape();
    
    push();
    stroke(100, 0, 0, 50);
    //Draw middle canal boundary for pathing purposes
    beginShape();
    for (let i = 0; i <= totalCurvePoints; i++) {
      let angle = map(i, 0, totalCurvePoints, 0, this.numWaves * TWO_PI); // Control number of waves
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2);
      let x = map(i, 0, totalCurvePoints, 0, width); 
      vertex(x, y);
    }
    endShape();
    pop();
    
    //Draw bottom canal boundary
    beginShape();
    for (let i = 0; i <= totalCurvePoints; i++) {
      let angle = map(i, 0, totalCurvePoints, 0, this.numWaves * TWO_PI); // Control number of waves
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2) + width/canalSideSeparation; 
      let x = map(i, 0, totalCurvePoints, 0, width); 
      vertex(x, y);
    }
    endShape();
    }

    //calculates the top/bottom boundary limit of the canal based on given x coordinate
    calcTopBoundary(xCoord) {
      let angle = map(xCoord, 0, width, 0, this.numWaves * TWO_PI);
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2) - width/canalSideSeparation; 
      return y;
    }

    calcBottomBoundary(xCoord) {
      let angle = map(xCoord, 0, width, 0, this.numWaves * TWO_PI);
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2) + width/canalSideSeparation; 
      return y;
    }

    calcMiddleBoundary(xCoord) {
      let angle = map(xCoord, 0, width, 0, this.numWaves * TWO_PI);
      let y = map(sin(angle), -1, 1, height / 2 - this.waveHeight / 2, height / 2 + this.waveHeight / 2); 
      return y;
    }
 
}

//adapted from polly branch 
class Player{
  constructor(x, y, canal) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.speed = 3;
  }

  move() {
    this.lowerYBound = canal.calcBottomBoundary(this.position.x);
    this.upperYBound = canal.calcTopBoundary(this.position.x);

    this.velocity.set(0, 0);
    //todo - moves faster than it should when two keys are pressed at once
    if (keyIsDown(UP_ARROW)) this.velocity.y = -this.speed;
    if (keyIsDown(DOWN_ARROW)) this.velocity.y = this.speed;
    if (keyIsDown(LEFT_ARROW)) this.velocity.x = -this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.velocity.x = this.speed;

    this.position.add(this.velocity);

    if (this.position.y > this.lowerYBound) {
      this.position.y = this.lowerYBound;
    } else if (this.position.y < this.upperYBound) {
      this.position.y = this.upperYBound;
    }
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

//from polly branch 
class Pursuer {
  constructor(x, y, canal) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 2;
    this.maxForce = 0.3;
    this.r = 16;
    this.canal = canal;
    this.isDecelerating = false;
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
        this.isDecelerating = true;
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
    this.lowerYBound = canal.calcBottomBoundary(this.position.x);
    this.upperYBound = canal.calcTopBoundary(this.position.x);

    this.velocity.add(this.acceleration); // Update velocity and position vectors resulting from changes in acceleration
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    // Limit the pursuer to the boundaries of the canal 
    
    if (this.position.y > this.lowerYBound) {
      this.position.y = this.lowerYBound;
    } else if (this.position.y < this.upperYBound) {
      this.position.y = this.upperYBound;
    }
     
    this.acceleration.set(0, 0);
  }

  // Draw the pursuer to the screen
  show() {
    this.middleBound = canal.calcMiddleBoundary(this.position.x);
    if (this.isDecelerating === true) {
      text('Arrival behaviour enabled', 10, 30);
      stroke(255);
      strokeWeight(2);
      fill(255);
      push();
      translate(this.position.x, this.position.y); // position of pursuer
      rotate(this.velocity.heading());             // orientation of pursuer
      triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0); // shape
      pop();
    } else {
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
}