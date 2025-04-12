// Declaration
class PlayerStatus {
  static NONE = "none";
  static REPAIRING = "repairing";
  static REPAIRS_FINISHED = "repairs_finished";

  static isValid(status) {
      return [PlayerStatus.NONE, PlayerStatus.REPAIRING, PlayerStatus.REPAIRS_FINISHED].includes(status);
  }
}

class PlayerConfig {
  constructor(player, maxHealth, collisionDamage, damageOverTime, timer, map) {
    this.playerSprite = player;
  

    // player.debug = true;
    // player.maxSpeed = 5;
    this.playerSprite.friction = 10;
    this.playerSprite.drag = 5;
    this.playerSprite.bounciness = 0.9;
    // player.collider = 'kinematic';

    this.maxSpeed = 4.5;
    this.maxSpeedCopy = 4.5;

    this.stationary = false;
    this.direcitonSave = 0;
    this.currentVel;
    this.currentVelCopy;

    this.map = map;

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

  camera() {
    camera.zoom = 1;
    // if the player starts to move outside the camera frame, you move the camera
    if (this.playerSprite.canvasPos.x < windowWidth/4 || this.playerSprite.canvasPos.x > windowWidth*3/4) {
      camera.x += this.playerSprite.vel.x;
    }   
    if (this.playerSprite.canvasPos.y < windowHeight/4 || this.playerSprite.canvasPos.y > windowHeight*3/4) {
      camera.y += this.playerSprite.vel.y;
    }
  }

  // added boolean damageOn and healthOn argument so that these can turned off in the tutorial
  movement(damageOn = true, healthOn = true) {
    // player sprite movement logic
    // applying force to the player's sprite in response to wasd or the arrow keys
    if (kb.pressing('left')) this.playerSprite.applyForce(-30, 0);
    else if (kb.pressing('right')) this.playerSprite.applyForce(30, 0);
    if (kb.pressing('up')) this.playerSprite.applyForce(0, -30);
    else if (kb.pressing('down')) this.playerSprite.applyForce(0, 30);

    // the following code 1) prevents exceeding the maxSpeed  
    this.currentVel = createVector(this.playerSprite.vel.x, this.playerSprite.vel.y);
    if (this.currentVel.mag() > this.maxSpeed) {
      this.currentVel.setMag(this.maxSpeed);
      this.playerSprite.vel.x = this.currentVel.x;
      this.playerSprite.vel.y = this.currentVel.y;
    } 

    // 2)preserves the direction when the sprite stops
    if (this.currentVel.mag() > 0.2) this.direcitonSave = this.currentVel.heading();
    
    if (this.currentVel.mag() < 0.2) this.stationary = true; 
    else this.stationary = false;

    if (this.stationary === false) this.playerSprite.rotation = this.currentVel.heading();
    else this.playerSprite.rotation = this.direcitonSave;

    // Update damage over time and collision damage

    if(damageOn) {
      this.takeDamageOverTime();
      this.takeCollisionDamage();
    }

    if(healthOn) {
      // If health is zero, stops player boat until repaired.
      if (this.zeroHealth) {
        // Display speech bubble message
        let zerohealthMessage = new SpeechBubble(this.playerSprite.x-150, this.playerSprite.y-100, 150, 75, 
          this.playerSprite.x-5, this.playerSprite.y - 10,
          "OH NO! Your health is zero! Press the 'r' key to make repairs!");
          zerohealthMessage.show();
        //this.haltPlayer();
      }
    }

    // If 'r' key is pressed, repair boat
    if (keyIsDown(82) === true || this.status === PlayerStatus.REPAIRING) {
      // If health is zero, repairs take twice as long as if health > 0
      if (this.zeroHealth) this.repair(this.repairTime*2)
      this.repair();
    }
 
  }

  debug() {
    //debug info with coordinates ont pot of mivng player
    text(`player.x: ${round(this.playerSprite.x)} player.y: ${round(this.playerSprite.y)}`, this.playerSprite.x, this.playerSprite.y - 30);
    text(`player vel: ${this.currentVel.mag()}`, this.playerSprite.x, this.playerSprite.y - 50);
    // text(`p.canv.x: ${round(player.canvasPos.x)} p.canv.y: ${round(player.canvasPos.y)}`, player.x, player.y - 50);
    // text(`windowWidth/4: ${round(windowWidth/4)} windowWidth*3/4: ${round(windowWidth*3/4)}`, player.x, player.y - 70);
    // text(`windowHeight/4: ${round(windowHeight/4)} windowHeight*3/4: ${round(windowHeight*3/4)}`, player.x, player.y - 90); 
  }

  isHealthZero() {
    return this.zeroHealth;
  }

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
  takeCollisionDamage() {
    let bankSprites = this.map.getBankSprites();
    for (let i = 0; i < bankSprites.length; i++) {
      if (this.playerSprite.collides(bankSprites[i])) {
        this.takeDamage(this.collisionDamage);
      }
    }
    if (this.health <= 0) {
      this.healthIsZero();
    }
  }

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
    let repairMessage = new SpeechBubble(this.playerSprite.x-150, this.playerSprite.y-100, 150, 65, 
      this.playerSprite.x-5, this.playerSprite.y - 10,
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
    this.maxSpeed = 0; // halt player
    this.currentVelCopy = this.currentVel.mag();
    this.currentVel.setMag(0);
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
        this.maxSpeed = this.maxSpeedCopy;
        this.currentVel.setMag(this.currentVelCopy);

        // Reset repairTimer
        this.repairTimer.resetTimer();
        this.zeroHealth = false;
        this.status = PlayerStatus.REPAIRS_FINISHED;
      }
      
    }
  }


}