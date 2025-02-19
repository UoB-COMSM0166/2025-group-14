// Friction Force
// The Nature of Code
// The Coding Train / Daniel Shiffman

//sources of inspiration/plagiarism precaution
// https://editor.p5js.org/codingtrain/sketches/zcTpMCpA


class Player {
  constructor(mainX, mainY, mainMass, velLimit, canal) {
    this.position = createVector(mainX, mainY);
    this.acceleration = createVector(0, 0);
    this.w = 10;
    this.h = 5;
    this.velocity = createVector(0, 0);
    this.mass = mainMass;
    this.angle = 0;
    this.mu = 0.02;
    this.velocityLimit = velLimit;
    this.canal = canal;
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

  move() { //trying to adapt Leah's code to mine
    //sets limits based on the locations of the edges of the canal object where the boat is
    // let setting = this.canal;

    //tests if the boat has moved to another canal segment, and shifts it there if so
    this.reachedTheNextOne(this.canal);

    let hitUp = this.didHitUpperBorder();
    // console.log(hitUp);
    let hitDown = this.didHitLowerBorder();
    let hitLeft = this.didHitLeftBorder();
    let hitRight = this.didHitRightBorder();

    // this if & else if statement increases vertical acceleration 
    // in response to UP (87) and DOWN (83) key presses
    if (keyIsDown(DOWN_ARROW) === true && this.position.y < this.canal.getLowerLimit(this.position.x)) {
      //it should be done via appyforce function, not add acceleration, to include mass into the equation
      //because if we will have objects of different masses that has to be accounted for 
      this.applyForce(createVector(0, 0.5));
    }
    // else if (keyIsDown(UP_ARROW) === true && this.position.y > this.canal.getUpperLimit(this.position.x) && (!hitUp)) {
    else if (keyIsDown(UP_ARROW) === true && this.position.y > this.canal.getUpperLimit(this.position.x) + 1) {
      this.applyForce(createVector(0,- 0.5));
    }
    // this if & else if statement increases horisontal acceleration 
    // in response to A (65) and D (68) key presses
    if (keyIsDown(LEFT_ARROW) === true && this.position.x > this.canal.getLeftLimit(this.position.y)) {
      this.applyForce(createVector(-0.5, 0));
    }
    else if (keyIsDown(RIGHT_ARROW) === true && this.position.x < this.canal.getRightLimit(this.position.y)) {
      this.applyForce(createVector(0.5, 0));
    }

    //collision mechanism for the upper border
    if (hitUp) {
      this.position.y += 20;

      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
    }

    //collision mechanism for the bottom border
    if (hitDown) {
      this.position.y -= 20;

      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);

    }

    //collision mechanism for the right border
    if (hitRight) {
      this.position.x -= 20;

      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
    }

    //collision mechanism for the left border
    if (hitLeft) {
      this.position.x += 20;
      
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
    }
  }

  // collidePointEllipse(pointX, pointY, ellipseX, ellipseY, ellipseWidth, ellipseHeight)
  didHitUpperBorder() {
    let x = this.position.x;
    let y = this.position.y;
    return collidePointEllipse(x, this.canal.getUpperLimit(x), x, y, this.w, this.h);
  }

  // collidePointEllipse(pointX, pointY, ellipseX, ellipseY, ellipseWidth, ellipseHeight)
  didHitLowerBorder() {
    let x = this.position.x;
    let y = this.position.y;
    return collidePointEllipse(x, this.canal.getLowerLimit(x), x, y, this.w, this.h);
  }

  // collidePointEllipse(pointX, pointY, ellipseX, ellipseY, ellipseWidth, ellipseHeight)
  didHitLeftBorder() {
    let x = this.position.x;
    let y = this.position.y;
    return collidePointEllipse(this.canal.getLeftLimit(y), y, x, y, this.w, this.h);
  }

  didHitRightBorder() {
    let x = this.position.x;
    let y = this.position.y;
    return collidePointEllipse(this.canal.getRightLimit(y), y, x, y, this.w, this.h);
  }


  reachedTheNextOne(currCanal){ //Leah's function that checks the transition between canals (2 parallel lines)
    let pasturesNew = currCanal.thresholdCheck(this.position.x, this.position.y);
    if(pasturesNew != null){
        this.canal = pasturesNew;
        console.log("switched to canal with name " + this.canal.name)
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

    text(`upper: ${Math.round(this.canal.getUpperLimit(this.position.x))}`, this.position.x - 40, this.position.y - 110);
    text(`right: ${Math.round(this.canal.getRightLimit(this.position.y))}`, this.position.x - 40, this.position.y - 95);
    text(`left: ${Math.round(this.canal.getLeftLimit(this.position.y))}`, this.position.x - 40, this.position.y - 80);
    text(`lower: ${Math.round(this.canal.getLowerLimit(this.position.x))}`, this.position.x - 40, this.position.y - 65);
    text(`x: ${Math.floor(this.position.x)} y: ${Math.floor(this.position.y)}`, this.position.x - 40, this.position.y - 50);
  }
}
