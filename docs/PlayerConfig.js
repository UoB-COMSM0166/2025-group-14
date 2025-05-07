// Declaration
class PlayerStatus {
  static NONE = "none";
  static REPAIRING = "repairing";
  static REPAIRS_FINISHED = "repairs_finished";

  static isValid(status) {
      return [PlayerStatus.NONE, PlayerStatus.REPAIRING, PlayerStatus.REPAIRS_FINISHED].includes(status);
  }

  // this.alternativeControls = false;

  static alternativeControls = false;
}



class PlayerConfig {
  constructor(player, maxHealth, collisionDamage, damageOverTime, pursuerDamage, timer, map, speed) {
    this.playerSprite = player;
  

    // player.debug = true;
    // player.maxSpeed = 5;
    this.playerSprite.friction = 10;
    this.playerSprite.drag = 5;
    this.playerSprite.bounciness = 0.9;
    this.playerSprite.mass = 5;

    // player.collider = 'kinematic';

    this.maxSpeed = speed;
    this.maxSpeedCopy = speed;

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
    this.pursuerDamage = this.maxHealth * pursuerDamage; // amount of health lost if collide with pursuer
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


    if (PlayerStatus.alternativeControls) {
      let acc = 0;

      if (kb.pressing('left')) this.playerSprite.rotationSpeed = -2;
      else if (kb.pressing('right')) this.playerSprite.rotationSpeed = 2;
      else this.playerSprite.rotationSpeed = 0;
      if (kb.pressing('up')) acc = 1;
      else if (kb.pressing('down')) acc = -0.3; 
      
      if (kb.pressing('up') || kb.pressing('down')) {
        engineSound.setVolume(0.1)
      } else {
        engineSound.setVolume(0.05)
      }
      let rad = radians(this.playerSprite.rotation);
      let vector = p5.Vector.fromAngle(rad, (80 * acc));
      this.playerSprite.applyForce(vector);
  
      acc = 0;

      // the following code 1) prevents exceeding the maxSpeed  
      this.currentVel = createVector(this.playerSprite.vel.x, this.playerSprite.vel.y);
      if (this.currentVel.mag() > this.maxSpeed) {
        this.currentVel.setMag(this.maxSpeed);
        this.playerSprite.vel.x = this.currentVel.x;
        this.playerSprite.vel.y = this.currentVel.y;
      } 
    } else {
      let dirX = 0;
      let dirY = 0;
  
      if (kb.pressing('left')) dirX -= 1;
      else if (kb.pressing('right')) dirX += 1;
      if (kb.pressing('up')) dirY -= 1;
      else if (kb.pressing('down')) dirY += 1;

      if (kb.pressing('up') || kb.pressing('down') || kb.pressing('left') || kb.pressing('right')) {
        engineSound.setVolume(0.4)
      } else {
        engineSound.setVolume(0.2)
      }
  
      this.playerSprite.applyForce(createVector(dirX, dirY).normalize().mult(80));
  
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
    }

    // Update damage over time and collision damage

    if(damageOn) {
      this.takeDamageOverTime();
      this.takeCollisionDamage();
      if (pursuerCatched){
        pursuerCatched = false;
        this.takeDamage(this.pursuerDamage);
        //print("Player take pursuer damage");
      } 
    }

    if(healthOn) {
      // If health is zero, stops player boat until repaired.
      if (this.zeroHealth) {
        // Display speech bubble message
        let zerohealthMessage = new SpeechBubble(this.playerSprite.x-150, this.playerSprite.y-100, 150, 75, 
          this.playerSprite.x-5, this.playerSprite.y - 10,
          "OH NO! Your health is zero! Press the 'r' key to make repairs!");
          //Adam: commented this out as I think game ends if health is
          //zerohealthMessage.show();
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

  setStandardControls(){
    // this.standardControls = true;
    PlayerStatus.alternativeControls = false;
  }
  
  setAlternativeControls(){
    // this.standardControls = false;
    PlayerStatus.alternativeControls = true;
  }

  debug() {
    //debug info with coordinates ont pot of mivng player
    /* text(`player.x: ${round(this.playerSprite.x)} player.y: ${round(this.playerSprite.y)}`, this.playerSprite.x, this.playerSprite.y - 30);
    text(`player vel: ${this.currentVel.mag()}`, this.playerSprite.x, this.playerSprite.y - 50); */
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
        if (soundOn) {
          wallCollisionSound.play();
        }
      }
    }
    if (this.health <= 0) {
      this.healthIsZero();
    }
  }

  // Decrements health by [damagePoints] points every [timeInterval] seconds.
  takeDamageOverTime(timeInterval = 2.0) {
    // Get current time from Main timer (started during setup)
    let timeElapsed = 0;
    if (this.timer) {
      timeElapsed = this.timer.getTime();
    } else {
      console.log("timer undefined")
    }
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

    if (soundOn && (!repairHammer.isPlaying() || !repairDrill.isPlaying() || !repairSaw.isPlaying())  ) {
      repairDrill.play();
      repairSaw.play();
      repairHammer.play();
    }

    if (this.status === PlayerStatus.REPAIRS_FINISHED) {
      // Update health to maxHealth
      repairDrill.pause();
      repairSaw.pause();
      repairHammer.pause();
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