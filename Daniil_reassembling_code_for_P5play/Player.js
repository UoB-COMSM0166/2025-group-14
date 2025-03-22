// Friction Force
// The Nature of Code
// The Coding Train / Daniel Shiffman

//sources of inspiration/plagiarism precaution
// https://editor.p5js.org/codingtrain/sketches/zcTpMCpA

//also includes the Includes the p5.collide2D addon library (https://github.com/bmoren/p5.collide2D?tab=readme-ov-file#collidepointellipse)


class PlayerStatus {
  static NONE = "none";
  static REPAIRING = "repairing";
  static REPAIRS_FINISHED = "repairs_finished";

  static isValid(status) {
      return [PlayerStatus.NONE, PlayerStatus.REPAIRING, PlayerStatus.REPAIRS_FINISHED].includes(status);
  }
}

class Player extends LeonSprite {
  constructor(
    mainX,
    mainY,
    mainMass,
    velLimit,
    // canal,
    boatFrames,
    timer,
    maxHealth,
    collisionDamage,
    damageOverTime
  ) {
    //also includes the Includes the p5.collide2D addon library (https://github.com/bmoren/p5.collide2D?tab=readme-ov-file#collidepointellipse)
    // 'super' calls the parent constructor, passing it the appropriate sprite sheet
    super(mainX, mainY, boatFrames);
    this.position = createVector(mainX, mainY);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.mass = mainMass;
    this.angle = 0;
    this.mu = 0.02;
    this.velocityLimit = velLimit;
    // this.w = 20; this.h = 30;
    // this.canal = canal;
    this.hitAny = false; //Daniil: for the false function, let this parameter be. Change it when the collision is figured out
    this.collisionOffset = createVector(0, 0);
    this.originalVelocityLimit = velLimit; // stores a copy of velLimit so not lost when player is immobilised
    this.velocityMagnitudeCopy = this.velocity.mag();
    this.health = maxHealth; // starts with maxHealth
    this.maxHealth = maxHealth;
    this.zeroHealth = false;
    this.collisionDamage = collisionDamage;
    this.damageOverTime = damageOverTime;
    this.timer = timer;
    this.repairTime = 3.0;  // time for repairs = 3 seconds. Time for zero-health repairs=repairTime*2
    this.repairTimer = new Timer();
    this.status = PlayerStatus.NONE;
  }

  //this is essentially the main function of the class, which was created to encapsulate the class from draw in main.js
  show() {
    this.move();
    this.friction();
    this.updatePosition();
    this.paintPlayerModel();

    //Uncomment this if you want to see the values of the parameters to use in debugging
    this.debugHelperText();

    // NEW damage/health code
    // Update damage over time and collision damage
    this.takeDamageOverTime();
    this.takeCollisionDamage();

    // If health is zero, stops player boat until repaired.
    if (this.zeroHealth) {
      // Display speech bubble message
      let zerohealthMessage = new SpeechBubble(this.position.x-150, this.position.y-100, 150, 75, 
        this.position.x-5, this.position.y - 10,
        "OH NO! Your health is zero! Press the 'r' key to make repairs!");
        zerohealthMessage.show();
      this.haltPlayer();
    }

    // If 'r' key is pressed, repair boat
    if (keyIsDown(82) === true || this.status === PlayerStatus.REPAIRING) {
      // If health is zero, repairs take twice as long as if health > 0
      if (this.zeroHealth) this.repair(this.repairTime*2)
      this.repair();
    }
  }

  move() {

    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      // W = 83
      this.applyForce(createVector(0, 0.5));
    } else if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      // S = 87
      this.applyForce(createVector(0, -0.5));
    }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      // A = 65
      this.applyForce(createVector(-0.5, 0));
    } else if (keyIsDown(RIGHT_ARROW) | keyIsDown(68)) {
      // D = 68
      this.applyForce(createVector(0.5, 0));
    }
  }

  isHealthZero() {
    return this.zeroHealth;
  }

  //the formula for friction is F = -v (reverced copy of the velocity vector) * Mu (arbitrary constant) * N (for our purpose can be equated to object's mass)
  // change the mu parameter if you want to increase/decrease friction
  friction() {
    if (this.velocity.mag() > 0.02 && !this.hitAny) {
      //this is a bugfix (without it, the stationary object would flip 60 times a second)
      let friction = this.velocity.copy().normalize().mult(-1);
      // Magnitude of Friction
      friction.setMag(this.mu * this.mass);
      this.applyForce(friction);
      // text(`friction: ${friction.mag()}`, this.position.x - 40, this.position.y - 35);
    }
  }

  updatePosition() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(this.velocityLimit);
    this.acceleration.set(0, 0);
  }

  // rotate(this.velocity.heading()) to direct the player's model in the direction of the velocity vector
  paintPlayerModel() {
    fill(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    stroke('black'); 
    rectMode(CENTER);
    rect(0, 0, this.height, this.width);
    stroke('white'); 
    line(0, 0, this.height / 2, 0);
    pop();

    // Leon's code for the image of the sprite

    // push();
    // translate(this.position.x, this.position.y);
    // // Boat sprite points up by default, but it must point right by default because
    // // the velocity vector points right by default - i.e., 0 radians points to the right
    // // therefore we rotate the boat image by PI/2 radians (90 degrees) to make it point right
    // rotate(this.velocity.heading() + HALF_PI);
    // if (this.velocity.mag() > 0.05) {
    //   this.updateAnimation(0.07);
    //   image(
    //     this.frames[this.currentFrame],
    //     -this.width / 2,
    //     -this.height / 2,
    //     this.width,
    //     this.height
    //   );
    // } else {
    //   this.updateAnimation(0.03);
    //   image(
    //     this.frames[this.currentFrame],
    //     -this.width / 2,
    //     -this.height / 2,
    //     this.width,
    //     this.height
    //   );
    // }
    // pop();

    // //uncomment these 3 circles, if you need to adjust the position of the hitboxes

    noStroke();
    fill("green");
    circle(
      this.position.x + (this.height / 2) * cos(this.velocity.heading()),
      this.position.y + (this.height / 2) * sin(this.velocity.heading()),
      5
    );
    fill("blue");
    circle(
      this.position.x + (this.width / 2) * -1 * sin(this.velocity.heading()),
      this.position.y + (this.width / 2) * cos(this.velocity.heading()),
      5
    );
    fill("red");
    circle(
      this.position.x + (this.width / 2) * sin(this.velocity.heading()),
      this.position.y + (this.width / 2) * -1 * cos(this.velocity.heading()),
      5
    );
  }

  // this function converts the force into acceleration (Force = Mass * Acceleration -> A = F/M),
  // and the addition of force vectors recults in a single acceleration vector
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  debugHelperText() {

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

  // Collision damage
  takeCollisionDamage() {  //Daniil: this function will not work untill new collision mechanics is figured out
    if (this.hitAny) {
      this.takeDamage(this.collisionDamage);
    }
    if (this.health <= 0) {
      this.healthIsZero();
    }
  }

  //Daniil: not sure if having this function for the development is a good idea, but it doesn't substantially hurt 
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
  repair() {
    // If health is zero, repairs take twice as long as if health > 0
    let timeTaken = this.repairTime
    if (this.zeroHealth) timeTaken = timeTaken * 2;
    this.status = PlayerStatus.REPAIRING;

    // Stop movement for repairTime
    this.haltPlayer(timeTaken);

    // Display speech bubble message
    let repairMessage = new SpeechBubble(this.position.x-150, this.position.y-100, 150, 65, 
      this.position.x-5, this.position.y - 10,
      "Repairing...repairs will take " + timeTaken + " seconds...");
    repairMessage.show();

    if (this.status === PlayerStatus.REPAIRS_FINISHED) {
      // Update health to maxHealth
      this.health = this.maxHealth;
      this.zeroHealth = false;
    }
  }

  // Stops boat for a given amount of time
  haltPlayer(timeHalted = null) {
    //this.repairTimer.show();
   // this.halted = true;
    this.velocityLimit = 0; // halt player
    this.velocityMagnitudeCopy = this.velocity.mag();
    this.velocity.setMag(0);
    // If argument not given, halt player indefinitely (until repairs occur)
    // If argument IS given, halt player until the given number of seconds have elapsed
    if (timeHalted != null) {
      // If timer hasnt already started, start it
      if (!this.repairTimer.isStarted()) {
        this.repairTimer.startTimer();
      }
      // While timer < timeHalted, boat is immobile. 
      if (this.repairTimer.hasElapsed(timeHalted) === true) {
        // Timer reaches timeTaken for repairs. Boat movement reset.
        // Revert limitVelocity to original value (allow boat to move again)
        this.velocityLimit = this.originalVelocityLimit;
        this.velocity.setMag(this.velocityMagnitudeCopy);

        // Reset repairTimer
        this.repairTimer.resetTimer();
        this.zeroHealth = false;
        this.status = PlayerStatus.REPAIRS_FINISHED;
      }
      
    }
  }
}