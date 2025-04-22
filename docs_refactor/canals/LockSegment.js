/*
This is a segment of canal that includes a lock halfway along it. 
It is instantiated and added to the canal network in the same way as normal canals are.

argument types:
- length, oClock, width, openSecs, closedSecs, speed = Numbers
- player = Sprite

- speed changes speed of opening/ closing of gates
- openSecs and closedSecs control how long the lock stays open and closed for on the timer
*/
class lockSegment extends canal {
  constructor(length, oClock, width, player, openSecs = 2, closedSecs = 2, speed = 0.3) {
    super(length, oClock, width, player);

    // * values to change behaviour
    // how far from the edges of the canal the gates stop
    this.OFFSET  = 10;

    // frames per second
    this.openFrames   = openSecs   * 60;
    this.closedFrames = closedSecs * 60;

    this.speed = speed;
    this.width = width;

    this.doorLength   = width * 0.5;
    this.doorThick = 8;

    // maintains state: open, closing, closed, opening
    this.state = "closed";
    this.timer = 0;

    this.anchorL = this.anchorR = null;
    this.leftDoor = this.rightDoor = null;
    this.leftAngle = this.rightAngle = 0;


    // offset from canal edge
    this.baseRot   = radsToDegrees(this.getAngle());
    this.openL   = this.baseRot - (90 - this.OFFSET);
    this.openR   = this.baseRot + 270 - this.OFFSET;
    this.closedL = this.baseRot;
    this.closedR = this.baseRot + 180;
  }

  // sprite creation
  createSprites() {
    super.createSprites();
    this.makeDoors();
  }

  makeDoors() {
    const centreStart = this.pointBetween(this.redStart,   this.blackStart, 0.5);
    const centreEnd   = this.pointBetween(this.redEnd,     this.blackEnd,   0.5);
 
    // mid‑point of the segment
    const centreMid   = this.pointBetween(centreStart, centreEnd, 0.5);
    const acrossRad   = this.degreesToRadians(this.baseRot);
 
    // hinge points for each door
    const ux = Math.cos(acrossRad);
    const uy = Math.sin(acrossRad);
    this.anchorL = [ centreMid[0] - ux * this.width * 0.5, centreMid[1] - uy * this.width * 0.5 ];
    this.anchorR = [ centreMid[0] + ux * this.width * 0.5, centreMid[1] + uy * this.width * 0.5 ];
 
    this.doorLength = Math.hypot(this.anchorR[0] - this.anchorL[0], this.anchorR[1] - this.anchorL[1]) * 0.5;

    // left side
    this.leftDoor  = new Sprite(this.anchorL[0], this.anchorL[1], this.doorLength, this.doorThick);
    this.leftAngle = this.baseRot;
    this.leftDoor.rotation = this.normDeg(this.leftAngle);
    this.leftDoor.collider = "static";
    this.leftDoor.color    = "blue";

    // right side
    this.rightDoor  = new Sprite(this.anchorR[0], this.anchorR[1], this.doorLength, this.doorThick);
    this.rightAngle = this.baseRot + 180;
    this.rightDoor.rotation = this.normDeg(this.rightAngle);
    this.rightDoor.collider = "static";
    this.rightDoor.color    = "green";

    this.allSprites.push(this.leftDoor, this.rightDoor);
  }

  animate() {
    this.canalAnimate();
    this.lockAnimate();

    this.doorState();
    this.doorAnimate();
  }

  lockAnimate(){
    this.timer++;
    if (this.state === "open"   && this.timer >= this.openFrames) {
      this.state = "closing"; 
      this.timer = 0;
    }
    if (this.state === "closed" && this.timer >= this.closedFrames) {
      this.state = "opening"; 
      this.timer = 0;
    }

  }

  // update and apply door state and timer
  doorState() {
    if (this.state === "opening") {
      this.leftAngle  = Math.max(this.openL,  this.leftAngle  - this.speed);
      this.rightAngle = Math.min(this.openR,  this.rightAngle + this.speed);
      if (this.leftAngle === this.openL && this.rightAngle === this.openR) {
        this.state = "open"; 
        this.timer = 0;
      }
    } else if (this.state === "closing") {
      this.leftAngle  = Math.min(this.closedL, this.leftAngle  + this.speed);
      this.rightAngle = Math.max(this.closedR, this.rightAngle - this.speed);
      if (this.leftAngle === this.closedL && this.rightAngle === this.closedR) {
        this.state = "closed"; 
        this.timer = 0;
      }
    }
  }

  // update rotations from the hinge of each door
  doorAnimate() {
    this.leftDoor.rotation  = this.normDeg(this.leftAngle);
    this.rightDoor.rotation = this.normDeg(this.rightAngle);
    const hl = this.doorLength * 0.5;
    this.leftDoor.x  = this.anchorL[0] + hl * Math.cos(this.degreesToRadians(this.leftAngle));
    this.leftDoor.y  = this.anchorL[1] + hl * Math.sin(this.degreesToRadians(this.leftAngle));
    this.rightDoor.x = this.anchorR[0] + hl * Math.cos(this.degreesToRadians(this.rightAngle));
    this.rightDoor.y = this.anchorR[1] + hl * Math.sin(this.degreesToRadians(this.rightAngle));
  }

  // helper functions
  degreesToRadians(d) { return d * Math.PI / 180; }
  normDeg(d)          { return ((d % 360) + 360) % 360; }
}
