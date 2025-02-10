class Player {
  constructor(x, y, canal) {
    this.position = createVector(x, y);
    //this.velocity = createVector(0, 0);
    this.speed = 3;
    this.angle = 0;
    this.w = 60;
    this.h = 30;
    this.lowerYBound = canal.top + this.w / 2;
    this.upperYBound = canal.bottom - this.w / 2;
  }

  // Player movement - pressing the W, A, S, D keys - moves the boat in the given direction
  // Each key press adds to the velocity in the corresponding direction
  move() {
    let tempVelocity = createVector(0, 0);

    if (pressedKeys.w) {
      tempVelocity.y -= 1; // up
    }
    if (pressedKeys.a) {
      tempVelocity.x -= 1; // left
    }
    if (pressedKeys.s) {
      tempVelocity.y += 1; // down
    }
    if (pressedKeys.d) {
      tempVelocity.x += 1; // right
    }

    // Constrain boat within canal
    this.position.y = constrain(
      this.position.y,
      this.lowerYBound,
      this.upperYBound
    );

    // Only update position and angle if player presses W, A, S, D to move the boat
    if (tempVelocity.mag() > 0) {
      // setMag makes sure that movement speed is constant;
      // otherwise, moving diagonally would be faster than going in a single direction
      tempVelocity.setMag(this.speed);
      this.position.add(tempVelocity);

      // Get the angle that we want to turn to, based on the velocity heading
      let targetAngle = tempVelocity.heading();
      // Smooth out the turning motion of the boat
      this.angle = customLerp(this.angle, targetAngle, 0.1);
    }
  }

  // Draws the player to the canvas
  draw() {
    noStroke();
    fill(255, 100);
    push();
    translate(this.position.x, this.position.y); // translates the player to its position vector
    rotate(this.angle); // rotates the direction the player is facing to the vector heading
    ellipse(0, 0, this.w, this.h);
    pop();
  }
}

// Helper function to make turning smoother by taking the shortest direction to rotate
function customLerp(currentAngle, targetAngle, interpolationFactor) {
  // Normalise the difference to be within the range of -PI to PI
  // Modulo 2PI makes sure the angle wraps around correctly,
  // meaning it won't make silly full-circle rotations, instead taking the shorter path
  // E.g., if currentAngle is 170 degrees and targetAngle is -170 degrees,
  //       we want to rotate 20 degrees anti-clockwise instead of 340 degrees clockwise
  let difference = ((targetAngle - currentAngle + PI) % (2 * PI)) - PI;
  // Use p5's built-in lerp() function to interpolate towards target angle
  return currentAngle + lerp(0, difference, interpolationFactor);
}
