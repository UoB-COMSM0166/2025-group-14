class Pursuer {
    constructor(x, y, canal, maxSpeed = 3, maxForce = 0.3) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = maxSpeed;
      this.maxForce = maxForce;
      this.r = 16;
      this.canal = canal;
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

      let setting = this.canal;
      let upper = setting.getUpperLimit(this.position.x) + 1;
      let right = setting.getRightLimit(this.position.y) - 1;
      let left = setting.getLeftLimit(this.position.y) + 1;
      let lower = setting.getLowerLimit(this.position.x) - 1;

      // Limit the pursuer to the boundaries of the canal
      // upper limit
     
      if (this.position.y < upper) {
        this.position.y = upper;
      }
      // lower limit
      if (this.position.y > lower) {
        this.position.y = lower;
      }
      // right limit
      if (this.position.x > right) {
        this.position.x = right;
      }
      //left limit
      if (this.position.x < left) {
        this.position.x = left;
      }
      // call leah's function so that canal boundaries are updated
      this.reachedTheNextOne(setting);
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

      stroke('red');
      line(this.position.x, this.position.y, player.position.x, player.position.y);
      this.debugHelperText();
    }
    //from Leah code
    reachedTheNextOne(setting){ 
      let pasturesNew = setting.thresholdCheck(this.position.x, this.position.y);
      if(pasturesNew != null){
          this.canal = pasturesNew;
          console.log("switched to canal with name " + this.canal.name)
      }
    }

    debugHelperText() {
      fill('blue');
      stroke('white');
      text(`PERSUER STATS`, 50, 35);
      text(`upper: ${Math.round(this.canal.getUpperLimit(this.position.x))}`, 50, 50);
      text(`right: ${Math.round(this.canal.getRightLimit(this.position.y))}`, 50, 65);
      text(`left: ${Math.round(this.canal.getLeftLimit(this.position.y))}`, 50, 80);
      text(`lower: ${Math.round(this.canal.getLowerLimit(this.position.x))}`, 50, 95);
      text(`x: ${Math.floor(this.position.x)} y: ${Math.floor(this.position.y)}`, 50, 110);
    }
  }
