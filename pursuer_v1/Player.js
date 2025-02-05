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
  
    show() {
      noStroke();
      fill(255, 100);
      push();
      translate(this.position.x, this.position.y);
      rotate(this.velocity.heading());
      ellipse(0, 0, this.w, this.h);
      pop();
    }
  }