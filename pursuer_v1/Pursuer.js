class Pursuer {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 2;
      this.maxForce = 0.3;
      this.r = 16;
    }
  
    pursue(target) {
      let t = target.position.copy();
      let prediction = target.velocity.copy();
      prediction.mult(10);
      t.add(prediction);
      fill(0, 255, 0);
      circle(t.x, t.y, 16);
      return this.seek(t);
    }
  
    arrive(target) {
      // 2nd argument true enables the arrival behavior
      return this.seek(target, true);
    }
  
    seek(target, arrival = false) {
      let force = p5.Vector.sub(target.position, this.position);
      let desiredSpeed = this.maxSpeed;
      if (arrival) {
        let slowRadius = 100;
        let distance = force.mag();
        if (distance < slowRadius) {
          desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
        }
      }
      force.setMag(desiredSpeed);
      force.sub(this.velocity);
      force.limit(this.maxForce);
      return force;
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.set(0, 0);
    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill(255);
      push();
      translate(this.position.x, this.position.y);
      rotate(this.velocity.heading());
      triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
      pop();
    }

  }