class Player {
    constructor(x, y, canal) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.speed = 3;
        this.w = 60;
        this.h = 30;
        this.lowerYBound = canal.top + (this.w/2);
        this.upperYBound = canal.bottom - (this.w/2);
    }

    // Player movement - pressing the up, down, left, right arrow keys causes the
    // player's velocity vector to change to a vector with 0 magnitude in the opposite dimension
    // and a magnitude of this.speed in the indicated direction. E.g. if the player 
    // presses the down key, the velocity changes to (0, this.speed) i.e. a magnitude of 
    // this.speed in the y-dimension. Upward movement is the same vector with opposite direction,
    // i.e. (0, -this.speed).
    move() {
        if (keyIsPressed === true) {
            if (keyCode === 40 && this.position.y < this.upperYBound) {
              this.velocity = createVector(0, this.speed); // down
              this.position.add(this.velocity);
            } else if (keyCode === 38 && this.position.y > this.lowerYBound) {
                this.velocity = createVector(0, -this.speed); // up
                this.position.add(this.velocity);
            } else if (keyCode === 37) {
                this.velocity = createVector(-this.speed, 0); // left
                this.position.add(this.velocity);
            } else if (keyCode === 39) {
                this.velocity = createVector(this.speed, 0); // right
                this.position.add(this.velocity);
            }
            
          }
    }

    // Draws the player to the canvas
    show() {
      noStroke();
      fill(255, 100);
      push();
      translate(this.position.x, this.position.y); // translates the player to its position vector
      rotate(this.velocity.heading()); // rotates the direction the player is facing to the vector heading
      ellipse(0, 0, this.w, this.h);
      pop();
    }
  }