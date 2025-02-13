// Friction Force
// The Nature of Code
// The Coding Train / Daniel Shiffman

//sources of inspiration/plagiarism precaution
// https://editor.p5js.org/codingtrain/sketches/zcTpMCpA


class Player {
  constructor(canal, mainMass, velLimit) {
    this.canal = canal;
    this.position = createVector(canal.startPos[0], canal.startPos[1]);
    this.acceleration = createVector(0, 0);
    this.w = 80;
    this.h = 50;
    this.velocity = createVector(0, 0);
    this.mass = mainMass;
    this.angle = 0;
    this.mu = 0.02;
    this.velocityLimit = velLimit;
  }

  //this is essentially the main function of the class, which was created to encapsulate the class from draw in main.js
  show() {
    this.move();
    this.friction();
    this.updatePosition();
    this.paintPlayerModel();

    //Uncomment this if you want to see the values of the parameters to use in debugging
    this.debugHelperText();
  }

  move() {
    let setting = this.canal;
    let x = this.position[0];
    let y = this.position[1];
    // this if & else if statement increases vertical acceleration 
    // in response to W (87) and S (83) key presses
    if (keyIsDown(83) === true && y < setting.getLowerLimit(x)) {
      //it should be done via appyforce function, not add acceleration, to include mass into the equation
      //because if we will have objects of different masses that has to be accounted for 
      this.applyForce(createVector(0, 0.5));
    }
    else if (keyIsDown(87) === true && this.y > setting.getUpperLimit(x)) {
      this.applyForce(createVector(0,- 0.5));
    }
    // this if & else if statement increases horisontal acceleration 
    // in response to A (65) and D (68) key presses
    if (keyIsDown(65) === true && x > setting.getLeftLimit(y)) {
      this.applyForce(createVector(-0.5, 0));
    }
    else if (keyIsDown(68) === true && x < setting.getRightLimit(y)) {
      this.applyForce(createVector(0.5, 0));
    }

    
  }

  //the formula for friction is F = -v (reverced copy of the velocity vector) * Mu (arbitrary constant) * N (for our purpose can be equated to object's mass) 
  // change the mu parameter if you want to increase/decrease friction
  friction() {
    if (this.velocity.mag() > 0.02){ //this is a bugfix (without it, the stationary object would flip 60 times a second)
      let friction = this.velocity.copy().normalize().mult(-1);
      // Magnitude of Friction
      friction.setMag(this.mu * this.mass);
      this.applyForce(friction);
    }
  }

  updatePosition() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(this.velocityLimit);
    this.acceleration.set(0, 0);
  }

  // rotate(this.velocity.heading()) to direct the player's model in the direction of the velocity vector
  // stroke was added just to show where the model is pointing to
  paintPlayerModel() {
    fill(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    stroke('black'); 
    ellipse(0, 0, this.w, this.h);
    stroke('white'); 
    line(0, 0, this.w / 2, 0);
    pop();
  }

  // this function converts the force into acceleration (Force = Mass * Acceleration -> A = F/M), 
  // and the addition of force vectors recults in a single acceleration vector
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  debugHelperText() {
    fill('black');
    stroke('white');
    text(`vel magnitude: ${this.velocity.mag()}`, this.position.x - 40, this.position.y - 80);
    text(`vel: ${this.velocity}`, this.position.x - 40, this.position.y - 65);
    text(`x: ${Math.floor(this.position.x)} y: ${Math.floor(this.position.y)}`, this.position.x - 40, this.position.y - 50);
  }
}

