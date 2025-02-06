class Player {
  constructor(mainX, mainY) {
    this.x = mainX;
    this.y = mainY;
    this.w = 80;
    this.h = 50;
    this.prevKey = "horisontal";
    this.angle = 0;
    this.xDeltaSpeed = 0;
    this.yDeltaSpeed = 0;
  }

  move() {
    //acceleration when W is presses, and deceleration, when released
    if (keyIsDown(87) === true) { //W
      if (this.yDeltaSpeed > -2){
        this.yDeltaSpeed -= 0.05;
      } 
    }
    else if (keyIsDown(83) === false && this.yDeltaSpeed < 0){
      this.yDeltaSpeed += 0.05;
      if (this.yDeltaSpeed > 0){
        this.yDeltaSpeed = 0;
      }
    }

    /////////////////////////////////////////////////////////////
    if (keyIsDown(83) === true) { //S
      if (this.yDeltaSpeed < 2){
        this.yDeltaSpeed += 0.05;
      }
    }
    else if (keyIsDown(87) === false && this.yDeltaSpeed > 0){
      this.yDeltaSpeed -= 0.05;
      if (this.yDeltaSpeed < 0){
        this.yDeltaSpeed = 0;
      }
    }

    /////////////////////////////////////////////////////////////
    if (keyIsDown(68) === true) { //D
      if (this.xDeltaSpeed < 2){
        this.xDeltaSpeed += 0.05;
      }
    }
    else if (keyIsDown(65) === false && this.xDeltaSpeed > 0){
      this.xDeltaSpeed -= 0.05;
      if (this.xDeltaSpeed < 0){
        this.xDeltaSpeed = 0;
      }
    }
    ///////////////////////////////////////////////////////////////////
    if (keyIsDown(65) === true) { //A
      if (this.xDeltaSpeed > -2){
        this.xDeltaSpeed -= 0.05;
      }
    }
    else if (keyIsDown(68) === false && this.xDeltaSpeed < 0){
      this.xDeltaSpeed += 0.05;
      if (this.xDeltaSpeed > 0){
        this.xDeltaSpeed = 0;
      }
    }

    this.x += this.xDeltaSpeed;
    this.y += this.yDeltaSpeed;
  }

  chngDirShape() {
    if (this.prevKey === "horisontal" && (key === 'w' || key === 's')){
      this.chngShape()
      this.prevKey = "vertical";
    }
    else if (this.prevKey === "vertical" && (key === 'a' || key === 'd')){
      this.chngShape()
      this.prevKey = "horisontal";
    }
  }

  chngShape() {
    let temp = this.w;
    this.w = this.h;
    this.h = temp;
  }

  show() {
    fill(0);
    push();
    translate(this.x, this.y,);
    rotate(this.angle);
    ellipse(0, 0, this.w, this.h);
    pop();
  }
}

