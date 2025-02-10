//sources of inspiration/plagiarism precaution
// https://editor.p5js.org/codingtrain/sketches/zcTpMCpA


class Player {
  //changed the function a little bit
  constructor(mainX, mainY, mainM, mainCurrent) {
    this.pos = createVector(mainX, mainY);
    this.acc = createVector(0, 0);
    this.dim = createVector(80, 50);
    this.vel = createVector(0, 0);
    this.mass = mainM;
    this.angle = 0;
    this.mu = 0.02;
    this.curr = mainCurrent;
  }

  //changed the function a little bit
  friction() {
    //the formula for friction is F = -v (velocity vector) * Mu (arbitrary constant) * N (for our purpose can be equated to object's mass) 

    // Direction of Friction - copy the velocity vector, normalise it, and reverse the x&y coordinates
    let friction = this.vel.copy().normalize().mult(-1);

    // Magnitude of Friction
    friction.setMag(this.mu * this.mass);
    this.applyForce(friction);
  }

  //plagiarism warning
  applyForce(force) {
    //F = M * A -> A = F/M; static function is used here so that you don't update the value of the divided vector 
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  setCurrent(curr) {
    this.pos.add(curr);
  }

  //there is a better way to represent this, check later
  show() {
    //plagiarism warning
    //what these 3 lines do is essentially update the velocity vector if there is any kind of accelereaiton
    //if there is any kind of velocity, then you move the poisition of the object, 
    //when you apply force to an object, you add to acceleration with each frame. To avoid acceleration accumulation, you have to reset it 
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    // angleMode(DEGREES);
    fill(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    ellipse(0, 0, this.dim.x, this.dim.y);
    stroke('white'); 
    line(0, 0, this.dim.x / 2, 0);

    pop();

    fill(256);
    fill(0);

    text(`vel: ${this.vel}`, this.pos.x - 40, this.pos.y - 65);
    text(`x: ${Math.floor(this.pos.x)} y: ${Math.floor(this.pos.y)}`, this.pos.x - 40, this.pos.y - 50);
    // this.angle -= 0.5;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  //this function is written completely by me
  move() {
    // this if & else if statement increases vertical acceleration 
    // in response to W (87) and S (83) key presses
    if (keyIsDown(83) === true) {
      this.acc.add(createVector(0, 0.05));
    }
    else if (keyIsDown(87) === true) {
      this.acc.add(createVector(0, -0.05));
    }

    // this if & else if statement increases horisontal acceleration 
    // in response to A (65) and D (68) key presses
    if (keyIsDown(65) === true) {
      this.acc.add(createVector(-0.05, 0));
    }
    else if (keyIsDown(68) === true) {
      this.acc.add(createVector(0.05, 0));
    }
  }
}

