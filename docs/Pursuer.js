class Pursuer {
    constructor(x, y, canal, maxSpeed = 2, maxForce = 0.3) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = maxSpeed;
      this.maxForce = maxForce;
      this.r = 16;
      this.canal = canal;
      this.debugMode = true;
    }

    setTarget(player) {
      if (this.lineOfSight(this.canal, player)) {
        return player;
      } 
      let whichWay = this.findOptimalPath();
      let direction = "forward";
      if(whichWay) {
        direction = "reverse";
      }
      let { x, y } = PursuerPath.getPath(this.canal, direction);
      return new Player(x, y, 0, 0, this.canal);
    }
    
  
    // Arrival behaviour (slowing down as the pursuer approaches the target, and
    // stopping once it reaches the target) is implemented by canal the 'arrival'
    // argument of the seek method. 
    arrive(player, target) {
      let arrivalEnabled = false;
      if(player === target) {
        arrivalEnabled = true;
      }
      return this.seek(target, arrivalEnabled);
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

      let canalSegment = this.canal;
      let upper = canalSegment.getUpperLimit(this.position.x) + 1;
      let right = canalSegment.getRightLimit(this.position.y) - 1;
      let left = canalSegment.getLeftLimit(this.position.y) + 1;
      let lower = canalSegment.getLowerLimit(this.position.x) - 1;

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
      this.reachedTheNextOne(canalSegment);
      this.acceleration.set(0, 0);
    }
  
    // Draw the pursuer to the screen
    show() {
      if (this.debugMode) { this.debugHelperText(); }
      if (this.debugMode && this.lineOfSight()) { this.debugHelperLines(this.position, player.position, `red`, 20); }
      
      stroke(255);
      strokeWeight(2);
      fill(255);
      push();
      translate(this.position.x, this.position.y); // position of pursuer
      rotate(this.velocity.heading());             // orientation of pursuer
      triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0); // shape
      pop();
    }

    //leah code that updates which canal segment the pursuer is currently in
    reachedTheNextOne(canalSegment){ 
      let pasturesNew = canalSegment.thresholdCheck(this.position.x, this.position.y);
      if(pasturesNew != null){
          this.canal = pasturesNew;
      }
    }
    //if multiple branches are introduced in future then this will have to be refactored
    //function returns true if pursuer has unobstructed line of sight to player
    //TODO: if player is on the red boundary then intersection will return true (i.e. pursuer is blind)
    lineOfSight() {
      let canal = this.canal;
      let target = {x: player.position.x, y: player.position.y};
      let position = {x: this.position.x, y: this.position.y};
      do {
        let startCorner = PursuerPath.getStartCorner(canal);
        let endCorner = PursuerPath.getEndCorner(canal);
        if(Intersect.doIntersect(startCorner, endCorner, position, target)) {
          return false;
        }
        canal = canal.after;
      } while (canal != this.canal && canal != null);
      return true;
    }
    
    //if multiple branches are introduced in future then this will have to be refactored (recursion?)
    //if fastest route found going canal.start -> canal.end then false, else returns true
    findOptimalPath() {
      let canal = this.canal;
      let startCorner = PursuerPath.getStartCorner(canal);
      let endCorner = PursuerPath.getEndCorner(canal);

      let dist1 = PursuerPath.calcDist(this.position, startCorner);
      let dist2 = PursuerPath.calcDist(this.position, endCorner);

      if (this.debugMode) { 
        this.debugHelperLines(this.position, startCorner, `green`); 
        this.debugHelperLines(this.position, endCorner, `blue`);
      }

      do {
        canal = canal.before;
        startCorner = PursuerPath.getStartCorner(canal);
        endCorner = PursuerPath.getEndCorner(canal);
        if (canal === player.canal) {
          dist1 += PursuerPath.calcDist(endCorner, player.position);
          if (this.debugMode) {this.debugHelperLines(endCorner, player.position, `green`)};
        } else {
          dist1 += PursuerPath.calcDist(endCorner, startCorner);
          if (this.debugMode) {this.debugHelperLines(endCorner, startCorner, `green`)};
        }
      } while (canal != this.canal && canal != null && canal != player.canal);
      
      canal = this.canal;

      do {
        canal = canal.after;
        startCorner = PursuerPath.getStartCorner(canal);
        endCorner = PursuerPath.getEndCorner(canal);
        if (canal === player.canal) {
          dist2 += PursuerPath.calcDist(startCorner, player.position);
          if (this.debugMode) {this.debugHelperLines(startCorner, player.position, `blue`)};
        } else {
          dist2 += PursuerPath.calcDist(startCorner, endCorner);
          if (this.debugMode) {this.debugHelperLines(startCorner, endCorner, `blue`)};
        }
      } while (canal != this.canal && canal != null && canal != player.canal);
      
      if (this.debugMode) { 
        this.debugHelperLines(0, 0, `green`, 40, dist1); 
        this.debugHelperLines(0, 0, `blue`, 60, dist2);
      }

      return dist1 <= dist2;
    }

    debugHelperText() {
      push();
      textSize(10);
      fill('blue');
      stroke('white');
      text(`upper: ${Math.round(this.canal.getUpperLimit(this.position.x))}`, this.position.x - 40, this.position.y - 110);
      text(`right: ${Math.round(this.canal.getRightLimit(this.position.y))}`, this.position.x - 40, this.position.y - 95);
      text(`left: ${Math.round(this.canal.getLeftLimit(this.position.y))}`, this.position.x - 40, this.position.y - 80);
      text(`lower: ${Math.round(this.canal.getLowerLimit(this.position.x))}`, this.position.x - 40, this.position.y - 65);
      text(`x: ${Math.floor(this.position.x)} y: ${Math.floor(this.position.y)}`, this.position.x - 40, this.position.y - 50);
      pop();
      }

    debugHelperLines(from, to, color, offset, distance) {
      push();
      if (from) {
        stroke(color);
        strokeWeight(5);
        line(from.x, from.y, to.x, to.y);
        distance = PursuerPath.calcDist(from, to);
      }
      noStroke();
      textSize(20);
      fill(color);
      if (offset) {
        text(`Distance to target: ` + round(distance), 20, offset);
      }
      pop();
    }
  }


  