// Friction Force
// The Nature of Code
// The Coding Train / Daniel Shiffman

//sources of inspiration/plagiarism precaution
// https://editor.p5js.org/codingtrain/sketches/zcTpMCpA


class Player {
  constructor(mainX, mainY, mainMass, velLimit, canal, timer, maxHealth, collisionDamage, damageOverTime) {
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
    // NEW damage stuff!
    this.originalVelocityLimit = this.velLimit; // stores a copy of velLimit so not lost when player is immobilised
    this.velocityMagnitudeCopy = this.velocity.mag();
    this.health = maxHealth; // starts with maxHealth
    this.maxHealth = maxHealth;
    this.zeroHealth = false;
    this.collisionDamage = collisionDamage;
    this.damageOverTime = damageOverTime;
    //this.collisionDamage = 5; // hard-coded values for testing only
    //this.damageOverTime = 1;
    this.timer = timer;
  }

  //this is essentially the main function of the class, which was created to encapsulate the class from draw in main.js
  show() {
    this.move();
    this.friction();
    this.updatePosition();
    this.paintPlayerModel();

    //Uncomment this if you want to see the values of the parameters to use in debugging
    //this.debugHelperText();

    // NEW damage/health code
    // Update damage over time and collision damage (only applies if colliding)
    this.takeDamageOverTime();
    //this.takeCollisionDamage();

    // If health is zero, stops player boat until repaired.
    if (this.zeroHealth) {
      text("Health is zero! Repairs needed...", this.position.x, this.position.y + 20);
      this.haltPlayer();
    }

    // If 'r' key is pressed, repair boat
    if (keyIsDown(82) === true) {
      // If health is zero, repairs take three times as long as default
      if (this.zeroHealth) this.repair(9.0)
      this.repair();
    }
  }

  move() { //trying to adapt Leah's code to mine
    //sets limits based on the locations of the edges of the canal object where the boat is
    let setting = this.canal;

    // this if & else if statement increases vertical acceleration 
    // in response to UP (87) and DOWN (83) key presses
    if (keyIsDown(DOWN_ARROW) === true && this.position.y < setting.getLowerLimit(this.position.x)) {
      //it should be done via appyforce function, not add acceleration, to include mass into the equation
      //because if we will have objects of different masses that has to be accounted for 
      this.applyForce(createVector(0, 0.5));
    }
    else if (keyIsDown(UP_ARROW) === true && this.position.y > setting.getUpperLimit(this.position.x)) {
      this.applyForce(createVector(0, - 0.5));
    }
    // this if & else if statement increases horisontal acceleration 
    // in response to A (65) and D (68) key presses
    if (keyIsDown(LEFT_ARROW) === true && this.position.x > setting.getLeftLimit(this.position.y)) {
      this.applyForce(createVector(-0.5, 0));
    }
    else if (keyIsDown(RIGHT_ARROW) === true && this.position.x < setting.getRightLimit(this.position.y)) {
      this.applyForce(createVector(0.5, 0));
    }

    //tests if the boat has moved to another canal segment, and shifts it there if so
    this.reachedTheNextOne(setting);


    //collision mechanism for the upper border
    if (this.position.y < setting.getUpperLimit(this.position.x)) {
      this.position.y = setting.getUpperLimit(this.position.x);
      this.velocity.y = 0;
      this.acceleration.y = 0;
      this.takeDamage(this.collisionDamage);
    }

    //collision mechanism for the bottom border
    if (this.position.y > setting.getLowerLimit(this.position.x)) {
      this.position.y = setting.getLowerLimit(this.position.x);
      this.velocity.y = 0;
      this.acceleration.y = 0;
      this.takeDamage(this.collisionDamage);
    }

    //collision mechanism for the right border
    if (this.position.x > setting.getRightLimit(this.position.y)) {
      this.position.x = setting.getRightLimit(this.position.y);
      this.velocity.x = 0;
      this.acceleration.x = 0;
      this.takeDamage(this.collisionDamage);
    }

    //collision mechanism for the left border
    if (this.position.x < setting.getLeftLimit(this.position.y)) {
      this.position.x = setting.getLeftLimit(this.position.y);
      this.velocity.x = 0;
      this.acceleration.x = 0;
      this.takeDamage(this.collisionDamage);
    }

    /*
        // NEW! Collision mechanics - Daniil's code, but refactored so that it works with the new 
        // damage mechanics
        this.collisionUpdates();
        */
  }

  /*
  // NEW! Collision mechanics - Daniil's code, but refactored so that it works with the new 
  // damage mechanics
  // Returns a string indicating which, if any, side of the canal the Player is colliding with
  isCollidingWithCanal() {
    let setting = this.canal;
    //collision mechanism for the upper border
    if (this.position.y < setting.getUpperLimit(this.position.x)) {
      return "up";
    }
    //collision mechanism for the bottom border
    else if (this.position.y > setting.getLowerLimit(this.position.x)) {
      return "down";
    }
    //collision mechanism for the right border
    else if (this.position.x > setting.getRightLimit(this.position.y)) {
      return "right";
    }
    //collision mechanism for the left border
    else if (this.position.x < setting.getLeftLimit(this.position.y)) {
      return "left";
    }
    return "not colliding";
  }

  // Uses the return value of isCollidingWithCanal to update the Player's position, 
  // velocity and acceleration vectors. 
  collisionUpdates() {
    let setting = this.canal;
    let collision = this.isCollidingWithCanal();
    if (collision === "up") {
      this.position.y = setting.getUpperLimit(this.position.x);
    }
    else if (collision === "down") {
      this.position.y = setting.getLowerLimit(this.position.x);
    }
    else if (collision === "right") {
      this.position.x = setting.getRightLimit(this.position.y);
    }
    else if (collision === "left") {
      this.position.x = setting.getLeftLimit(this.position.y);
    }
    else if (collision === "no collision") {
      return;
    }
    this.velocity.x = 0;
    this.acceleration.x = 0;
  }
*/

  reachedTheNextOne(setting) { //Leah's function that checks the transition between canals (2 parallel lines)
    let pasturesNew = setting.thresholdCheck(this.position.x, this.position.y);
    if (pasturesNew != null) {
      this.canal = pasturesNew;
      console.log("switched to canal with name " + this.canal.name)
    }
  }

  //the formula for friction is F = -v (reverced copy of the velocity vector) * Mu (arbitrary constant) * N (for our purpose can be equated to object's mass) 
  // change the mu parameter if you want to increase/decrease friction
  friction() {
    if (this.velocity.mag() > 0.02) { //this is a bugfix (without it, the stationary object would flip 60 times a second)
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

  // EVERYTHING BELOW THIS IS NEW -> DAMAGE MECHANICS!
  // Updates the health attribute based on damage taken
  takeDamage(damagePoints) {
    this.health -= damagePoints;
    if (this.health <= 0) {
      this.healthIsZero();
    }
  }

  // If health is <= zero, makes sure health cannot go below zero and sets
  // zeroHealth attribute to true.
  healthIsZero() {
    this.health = 0; // health cannot go below zero
    this.zeroHealth = true;
  }


  /*
// Returns true if player is colliding with canal
collideWithCanal() {
  if (this.isCollidingWithCanal() != "not colliding") return true;
  else return false;
}

// Take damage equal to collisionDamage if player has collided with the side of the canal
takeCollisionDamage() {
  // Timer ensures that collision damage can only be taken once per second.
  //let timeElapsed = this.timer.getTime();
  //let secondsBeforeNextDamage = 1.0;
  //let timeLimit = secondsBeforeNextDamage / (frameRate() * secondsBeforeNextDamage);

  //if (timeElapsed % timeInterval < timeLimit && this.collideWithCanal() === true) {
  //if (this.collideWithCanal() === true) {
  if (this.isCollidingWithCanal != "not colliding") {
      this.takeDamage(this.collisionDamage);
  }
}
*/

  // Decrements health by [damagePoints] points every [timeInterval] seconds.
  takeDamageOverTime(timeInterval = 2.0) {
    // Get current time from Main timer (started during setup)
    let timeElapsed = this.timer.getTime();
    // Set the comparison value - depends on frame rate. Ensures that condition for taking damage is
    // only true ONCE per timeInterval (rather than multiple times, which is what you get if you use
    // integer seconds).
    let timeLimit = timeInterval / (frameRate() * timeInterval);
    // need float comparison as calls this functions multiple times in a single second - prevents it decrementing the health multiple times in a given second
    if (timeElapsed % timeInterval < timeLimit) {
      this.takeDamage(this.damageOverTime); // If condition true, player takes damage
    }
    if (this.health <= 0) {
      this.healthIsZero();
    }
  }

  // Returns health attribute to maxHealth
  repair(timeTaken = 3.0) {

    // Stop movement for 3 seconds
    this.haltPlayer(timeTaken);

    // Update health to maxHealth
    this.health = this.maxHealth;
    this.zeroHealth = false;
  }


  // Stops boat for a given amount of time
  haltPlayer(timeHalted = null) {
    this.velocityLimit = 0; // halt player
    this.velocityMagnitudeCopy = this.velocity.mag();
    this.velocity.setMag(0);
    // If argument not given, halt player indefinitely (until repairs occur)
    // If argument IS given, halt player until the given number of seconds have elapsed
    if (timeHalted != null) {
      let timer = new Timer();
      timer.startTimer();
    
      //text("Repairing...", this.position.x, this.position.y + 5);
      // While timer < timeHalted, boat is immobile. 
      while (timer.hasElapsed(timeHalted) === false) {
        // Print a text message to boat position saying that repairs are ongoing...
        //text("Repairing...", 500, 500);
        continue;
      }
      // Timer reaches timeTaken for repairs. Boat movement reset.
      // Revert limitVelocity to original value (allow boat to move again)
      this.velocityLimit = this.originalVelocityLimit;
      this.velocity.setMag(this.velocityMagnitudeCopy);
    }
  }
}


// //collision mechanism for the upper border
// if (this.position.y < setting.getUpperLimit(this.position.x)) {
//   this.position.y = setting.getUpperLimit(this.position.x) + 2;
//   this.velocity.y *= -0.5;
//   this.acceleration.y *= -0.2;
// }

// //collision mechanism for the bottom border
// if (this.position.y > setting.getLowerLimit(this.position.x)) {
//   this.position.y = setting.getLowerLimit(this.position.x) - 2;
//   this.velocity.y *= -0.5;
//   this.acceleration.y *= -0.2;
// }

// //collision mechanism for the right border
// if (this.position.x > setting.getRightLimit(this.position.y)) {
//   this.position.x = setting.getRightLimit(this.position.y) - 2;
//   this.velocity.x *= -0.5;
//   this.acceleration.x *= -0.2;
// }

// //collision mechanism for the left border
// if (this.position.x < setting.getLeftLimit(this.position.y)) {
//   this.position.x = setting.getLeftLimit(this.position.y) + 2;
//   this.velocity.x *= -0.5;
//   this.acceleration.x *= -0.2;
// }

