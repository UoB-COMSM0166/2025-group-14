// Friction Force
// The Nature of Code
// The Coding Train / Daniel Shiffman

//sources of inspiration/plagiarism precaution
// https://editor.p5js.org/codingtrain/sketches/zcTpMCpA

class Player extends Sprite {
  constructor(
    mainX,
    mainY,
    mainMass,
    velLimit,
    canal,
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
    this.canal = canal;
    this.hitAny = false;
    this.collisionOffset = createVector(0, 0);
    // NEW damage stuff!
    this.originalVelocityLimit = velLimit; // stores a copy of velLimit so not lost when player is immobilised
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
    this.debugHelperText();

    // NEW damage/health code
    // Update damage over time and collision damage
    this.takeDamageOverTime();
    this.takeCollisionDamage();

    // If health is zero, stops player boat until repaired.
    if (this.zeroHealth) {
      // text(
      //   "Health is zero! Repairs needed...",
      //   this.position.x,
      //   this.position.y + 20
      // );
      this.haltPlayer();
    }

    // If 'r' key is pressed, repair boat
    if (keyIsDown(82) === true) {
      // If health is zero, repairs take three times as long as default
      if (this.zeroHealth) this.repair(9.0);
      this.repair();
    }
  }

  move() {
    //trying to adapt Leah's code to mine
    //sets limits based on the locations of the edges of the canal object where the boat is
    // let setting = this.canal;
    //tests if the boat has moved to another canal segment, and shifts it there if so
    this.reachedTheNextOne(this.canal);

    let hitUp = this.didHitBorder(0); // 0 - upper border
    let hitDown = this.didHitBorder(1); // 1 - lower border
    let hitLeft = this.didHitBorder(2); // 2 - left border
    let hitRight = this.didHitBorder(3); // 3 - right border
    this.hitAny = hitUp || hitDown || hitRight || hitLeft;

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

    if (this.hitAny) {
      this.acceleration = createVector(0, 0);
      this.velocity.div(1000);

      if (hitUp) {
        //collision mechanism for the upper border
        this.collisionOffset.set(0, 2.5);
      }
      if (hitDown) {
        //collision mechanism for the bottom border
        this.collisionOffset.set(0, -2.5);
      }
      if (hitRight) {
        //collision mechanism for the right border
        this.collisionOffset.set(-2.5, 0);
      }
      if (hitLeft) {
        //collision mechanism for the left border
        this.collisionOffset.set(2.5, 0);
      }
    }

    this.applyCollisionOffset();

    // Keep the x and y, inherited from Sprite class, in sync with the position
    // this.x = this.position.x;
    // this.y = this.position.y;
  }

  // this function basically draggs the player model off the border
  // when the boat "hits" the edge of the canal
  applyCollisionOffset() {
    this.position.add(this.collisionOffset);

    if (this.collisionOffset.x > 0.2) {
      this.collisionOffset.x -= 0.2;
    } else if (this.collisionOffset.x < -0.2) {
      this.collisionOffset.x += 0.2;
    } else if (Math.abs(this.collisionOffset.x) < 0.2) {
      this.collisionOffset.x = 0;
    }

    if (this.collisionOffset.y > 0.2) {
      this.collisionOffset.y -= 0.2;
    } else if (this.collisionOffset.y < -0.2) {
      this.collisionOffset.y += 0.2;
    } else if (Math.abs(this.collisionOffset.y) < 0.2) {
      this.collisionOffset.y = 0;
    }
  }

  didHitBorder(direction) {
    let x = this.position.x;
    let y = this.position.y;
    let angle = this.velocity.heading();

    //these are the 3 hitboxes. If you want to visualise them
    //you can create 3 circles with the following x&y coordinates.
    //One would be in the front of the ellipse, and 2 on each side.
    //The sin and cos are needed, because the origianl ellipse does not
    //actually rotate, event though it is displayed as rotated along
    // the velocity vector
    // Note, these are the real hitboxes. The coloured circles on the boat
    // (created in the paintPlayerModel()) are there for aesthetic reasons
    let frontHitbox = {
      x: x + (this.height / 2) * cos(angle),
      y: y + (this.height / 2) * sin(angle),
    };
    let rightHitbox = {
      x: x + (this.width / 2) * -1 * sin(angle),
      y: y + (this.width / 2) * cos(angle),
    };
    let leftHitbox = {
      x: x + (this.width / 2) * sin(angle),
      y: y + (this.width / 2) * -1 * cos(angle),
    };

    let upLim = this.canal.getUpperLimit(x);
    let lowLim = this.canal.getLowerLimit(x);
    let leftLim = this.canal.getLeftLimit(y);
    let rightLim = this.canal.getRightLimit(y);

    switch (direction) {
      case 0: //Does front, right or left hitbox cross the upper border?
        let hitUpperFront = frontHitbox.y <= upLim;
        let hitUpperRight = rightHitbox.y <= upLim;
        let hitUpperLeft = leftHitbox.y <= upLim;
        return hitUpperFront || hitUpperRight || hitUpperLeft;
      case 1: //Does front, right or left hitbox cross the lower border?
        let hitLowerFront = frontHitbox.y >= lowLim;
        let hitLowerRight = rightHitbox.y >= lowLim;
        let hitLowerLeft = leftHitbox.y >= lowLim;
        return hitLowerFront || hitLowerRight || hitLowerLeft;
      case 2: //Does front, right or left hitbox cross the left border?
        let hitLeftFront = frontHitbox.x <= leftLim;
        let hitLeftRight = rightHitbox.x <= leftLim;
        let hitLeftLeft = leftHitbox.x <= leftLim;
        return hitLeftFront || hitLeftRight || hitLeftLeft;
      case 3: //Does front, right or left hitbox cross the right border?
        let hitRightFront = frontHitbox.x >= rightLim;
        let hitRightRight = rightHitbox.x >= rightLim;
        let hitRightLeft = leftHitbox.x >= rightLim;
        return hitRightFront || hitRightRight || hitRightLeft;
    }
  }

  reachedTheNextOne(currCanal) {
    //Leah's function that checks the transition between canals (2 parallel lines)
    let pasturesNew = currCanal.thresholdCheck(
      this.position.x,
      this.position.y
    );
    if (pasturesNew != null) {
      this.canal = pasturesNew;
      console.log("switched to canal with name " + this.canal.name);
    }
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
    push();
    translate(this.position.x, this.position.y);
    // Boat sprite points up by default, but it must point right by default because
    // the velocity vector points right by default - i.e., 0 radians points to the right
    // therefore we rotate the boat image by PI/2 radians (90 degrees) to make it point right
    rotate(this.velocity.heading() + HALF_PI);
    if (this.velocity.mag() > 0.05) {
      this.updateAnimation(0.07);
      image(
        this.frames[this.currentFrame],
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    } else {
      this.updateAnimation(0.03);
      image(
        this.frames[this.currentFrame],
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }
    pop();

    // //uncomment these 3 circles, if you need to adjust the position of the hitboxes

    // noStroke();
    // fill("green");
    // circle(
    //   this.position.x + (this.height / 2) * cos(this.velocity.heading()),
    //   this.position.y + (this.height / 2) * sin(this.velocity.heading()),
    //   5
    // );
    // fill("blue");
    // circle(
    //   this.position.x + (this.width / 2) * -1 * sin(this.velocity.heading()),
    //   this.position.y + (this.width / 2) * cos(this.velocity.heading()),
    //   5
    // );
    // fill("red");
    // circle(
    //   this.position.x + (this.width / 2) * sin(this.velocity.heading()),
    //   this.position.y + (this.width / 2) * -1 * cos(this.velocity.heading()),
    //   5
    // );

    // // // uncomment these lines if you want to see the borders of the canal at any given time

    // fill(0);
    // stroke("white");
    // strokeWeight(5);

    // // upper
    // line(
    //   0,
    //   this.canal.getUpperLimit(this.position.x),
    //   windowWidth,
    //   this.canal.getUpperLimit(this.position.x)
    // );
    // // lower
    // line(
    //   0,
    //   this.canal.getLowerLimit(this.position.x),
    //   windowWidth,
    //   this.canal.getLowerLimit(this.position.x)
    // );
    // // left
    // line(
    //   this.canal.getLeftLimit(this.position.y),
    //   0,
    //   this.canal.getLeftLimit(this.position.y),
    //   windowHeight
    // );
    // // right
    // line(
    //   this.canal.getRightLimit(this.position.y),
    //   0,
    //   this.canal.getRightLimit(this.position.y),
    //   windowHeight
    // );
  }

  // this function converts the force into acceleration (Force = Mass * Acceleration -> A = F/M),
  // and the addition of force vectors recults in a single acceleration vector
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  debugHelperText() {
    // fill("black");
    // stroke("white");
    // text(
    //   `upper: ${Math.round(this.canal.getUpperLimit(this.position.x))}`,
    //   this.position.x - 40,
    //   this.position.y - 110
    // );
    // text(
    //   `right: ${Math.round(this.canal.getRightLimit(this.position.y))}`,
    //   this.position.x - 40,
    //   this.position.y - 95
    // );
    // text(
    //   `left: ${Math.round(this.canal.getLeftLimit(this.position.y))}`,
    //   this.position.x - 40,
    //   this.position.y - 80
    // );
    // text(
    //   `lower: ${Math.round(this.canal.getLowerLimit(this.position.x))}`,
    //   this.position.x - 40,
    //   this.position.y - 65
    // );
    // text(
    //   `x: ${Math.floor(this.position.x)} y: ${Math.floor(this.position.y)}`,
    //   this.position.x - 40,
    //   this.position.y - 50
    // );
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
  takeCollisionDamage() {
    if (this.hitAny) {
      this.takeDamage(this.collisionDamage);
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
    console.log("this.velMagCopy: ", this.velocityMagnitudeCopy);
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
      console.log("this.velocityLimit: ", this.velocityLimit);
      console.log("Original velocity limit: ", this.originalVelocityLimit);
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

// fill('black');
// stroke('white');
// strokeWeight(2);
// text(`upper: ${Math.round(this.canal.getUpperLimit(this.position.x))}`, this.position.x - 40, this.position.y - 110);
// text(`right: ${Math.round(this.canal.getRightLimit(this.position.y))}`, this.position.x - 40, this.position.y - 95);
// text(`left: ${Math.round(this.canal.getLeftLimit(this.position.y))}`, this.position.x - 40, this.position.y - 80);
// text(`lower: ${Math.round(this.canal.getLowerLimit(this.position.x))}`, this.position.x - 40, this.position.y - 65);
// text(`x: ${Math.floor(this.position.x)} y: ${Math.floor(this.position.y)}`, this.position.x - 40, this.position.y - 50);
// text(`heading: ${this.velocity.heading()}`, this.position.x - 40, this.position.y - 50);

// }
