# Progress

| To Do | Doing | Done |
|---|---|---|
|||Health attributes in Player class|
|||Health bar instantiation and display|
|||Implement Timer class and instances|
|||Implement damage over time methods in Player|
|||Test that displayed health bar updates as damage taken|
|||Implement collision damage mechanisms (requires Canal merge)|
|||Implement repair method|

# Conceptually:
- health bar/points inducates state of boat
- health reduces over time
- collision with canal reduces health
- when health is 0, boat stops until repaired
- repair stops boat for 3 secs but eeturns to max health

# Attributes: 
- health
- maxHealth. 

Initialise health to maxHealth

# Methods: 
void display HealthPoints
void takeDamage() - modifies health attribute.
boolean collideWithCanal() 
void noHealth() - stops movement (set maxVelocity to 0?)
void repair() - return health to maxHealth
void takeDamageOverTime(time = 3 secs) - decrements health by n points every m seconds.


## Health bar:

From https://editor.p5js.org/manno/sketches/iX61TJgRv 

Also from https://editor.p5js.org/Sarena/sketches/S4Nv5SZ6Q

```js
class healthBar {
    constructor (x, y, player) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 20;
        this.health = player.health;
        this.maxHealth = player.maxHealth;
        this.colour = (255, 0, 0, 0.8);
        this.playerBoat = player;
    }

    draw() {
        // Update healthBar attributes
        this.update();

        // Draw empty health bar box
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(this.x, this.y, this.width, this.height);

        // Fill health bar up to health
        noStroke();
        fill(255, 0, 0);
        rect(10, 10, map(health, 0, maxHealth, 0, 200), 20);
    }

    // Update health based on player
    update() {
        this.health = this.player.health;
    }
}
```

```js
// In Main.js 
function setup() {
    ...
    let healthBar = new healthBar(10, 10, player);
}

function draw() {
    ...
    healthBar.draw();
}
```

## Player health

```js
class Player {
  constructor(mainX, mainY, mainMass, velLimit, maxHealth, collisionDamage, damageOverTime) {
    this.position = createVector(mainX, mainY);
    this.acceleration = createVector(0, 0);
    this.w = 80;
    this.h = 50;
    this.velocity = createVector(0, 0);
    this.mass = mainMass;
    this.angle = 0;
    this.mu = 0.02;
    this.velocityLimit = velLimit;
    // New damage stuff!
    this.originalVelocityLimit = this.velLimit; // stores a copy of velLimit so not lost when player is immobilised
    this.maxHealth = maxHealth;
    this.health = maxHealth; // starts with maxHealth
    this.zeroHealth = false;
    this.collisionDamage = collisionDamage;
    this.damageOverTime = damageOverTime;
  }

  //...

  // Updates the health attribute based on damage taken
  takeDamage(damagePoints) {
    this.health -= damagePoints;
    if (this.health <= 0) {
        healthIsZero();
    }
  }

  // If health is <= zero, makes sure health cannot go below zero and sets
  // zeroHealth attribute to true.
  healthIsZero() {
    this.health = 0; // health cannot go below zero
    this.zeroHealth = true;
  } 

  // TODO once Canal.js is finalised and merged
  // Returns true if player is colliding with canal
  collideWithCanal() {

  }

  // Take damage equal to collisionDamage if player has collided with the side of the canal
  takeCollisionDamage() {
    if (this.collideWithCanal() === true) {
        this.takeDamage(this.collisionDamage);
    }
  }

  // Decrements health by [damagePoints] points every [timeInterval] seconds.
  takeDamageOverTime(timeInterval = 5) {
    // 1 second = 1000 milliseconds. 
    let timeElapsed = millis() * 1000;
    // To update damage every [timeInterval] seconds, see if the number of seconds elapsed
    // since the sketch started modulo [timeInterval] = 0
    if (timeElapsed % timeInterval === 0) {
        takeDamage(this.damageOverTime);
    } 
    if (this.health <= 0) {
        healthIsZero();
    }
  }

  // Returns health attribute to maxHealth
  repair(timeTaken = 3) {
    // Stop movement for 3 seconds
    let timer = new Timer();
    timer.startTimer();
    this.velocityLimit = 0;
    while (timer.hasElapsed(timeTaken) === false) {
        continue;
    }

    // Revert limitVelocity to original value (allow boat to move again)
    this.velocityLimit = this.originalVelocityLimit;

    // Update health to maxHealth
    this.health = this.maxHealth;
  }


  // Update the show() method to accomodate health, collisions and repair
  show() {
    // Daniel's movement code
    this.move();
    this.friction();
    this.updatePosition();
    this.paintPlayerModel();

    // New damage/health code
    // Update damage over time and collision damage (only applies if colliding)
    this.takeDamageOverTime();
    this.takeCollisionDamage();

    // If 'r' key is pressed, repair boat
    if (keyIsDown(82) === true) {
        this.repair()
    }
  }
}
```

## Timer

There are so many methods in the health/damage feature that involve doing something for a certain number of units of time that it seems sensible to implement a Timer. This can be done in the Main file, but I think for clarity and concordancy with OOP principles, it is better to encapsulate this functionality in a dedicated Timer class.

This code uses the code found here as a starting point: https://editor.p5js.org/abrahamavnisan/sketches/z-8nvd_vM

```js
class Timer {
  constructor() {
    this.start = Date.now();
  }

  startTimer() {
    this.start = Date.now();
  }

  getTime() {
    return (Date.now() - this.start) / 1000;
  }

  // Returns true if the argument number of seconds has elapsed, false if not.
  hasElapsed(time = 3) {
    if (getTime() === time) return true;
    else return false;
  }
}
```

```js
// In Main.js
let timer = new Timer();
```

