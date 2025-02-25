class Pursuer {
    constructor(x, y, canal) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 2;
      this.maxForce = 0.3;
      this.r = 16;
      this.lowerYBound = canal.top + this.r;
      this.upperYBound = canal.bottom - this.r;
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
  
    // Arrival behaviour (slowing down as the pursuer approaches the target, and
    // stopping once it reaches the target) is implemented by setting the 'arrival'
    // argument of the seek method. 
    arrive(target) {
      // 2nd argument true enables the arrival behavior
      return this.seek(target, true);
    }
  
    // Implements pursuer seek behaviour
    seek(target, arrival = false) {
      // trajectory = target_position - pursuer_position (all vectors!)
      let force = p5.Vector.sub(target.position, this.position);
      let desiredSpeed = this.maxSpeed;
      if (arrival) {
        let slowRadius = 100;  // the threshold around the target which defines the pursuer 'approaching' target
        let distance = force.mag();
        if (distance < slowRadius) {
          // This maps the distance from the range 0-slowRadius to the equivalent position in the range 0-this.maxSpeed
          // I.e. it is a proportionality factor that translates the distance between pursuer and target to the speed of
          // the pursuer (speed slows as distance decreases).
          desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
        }
      }
      force.setMag(desiredSpeed); // Magnitude of the force is maxSpeed
      force.sub(this.velocity);   
      force.limit(this.maxForce); // Limit magnitude of the force to maxForce
      return force;
    }
  
    // Apply the force calculated in the steering calculations to the 
    // pursuer's acceleration (to change its trajectory)
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    // Update the pursuer's locomotion
    update() {
      this.velocity.add(this.acceleration); // Update velocity and position vectors resulting from changes in acceleration
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      // Limit the pursuer to the boundaries of the canal 
      if (this.position.y > this.upperYBound) {
        this.position.y = this.upperYBound;
      }
      if (this.position.y < this.lowerYBound) {
        this.position.y = this.lowerYBound;
      }
      this.acceleration.set(0, 0);
    }
  
    // Draw the pursuer to the screen
    show() {
      stroke(255);
      strokeWeight(2);
      fill(255);
      push();
      translate(this.position.x, this.position.y); // position of pursuer
      rotate(this.velocity.heading());             // orientation of pursuer
      triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0); // shape
      pop();
    }

  }