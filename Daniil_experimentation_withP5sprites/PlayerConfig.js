// Declaration
class PlayerConfig {
  constructor(player) {
    this.playerSprite = player;
  

  // player.debug = true;
  // player.maxSpeed = 5;
  this.playerSprite.friction = 10;
  this.playerSprite.drag = 5;
  this.playerSprite.bounciness = 0.9;
  this.playerSprite.colour = 'green'; 
  // player.collider = 'kinematic';

  this.maxSpeed = 4.5;

  this.stationary = false;;
  this.direcitonSave = 0;
  this.currentVel;
  }

  camera() {
    // if the player starts to move outside the camera frame, you move the camera
    if (this.playerSprite.canvasPos.x < windowWidth/4 || this.playerSprite.canvasPos.x > windowWidth*3/4) {
      camera.x += this.playerSprite.vel.x;
    }   
    if (this.playerSprite.canvasPos.y < windowHeight/4 || this.playerSprite.canvasPos.y > windowHeight*3/4) {
      camera.y += this.playerSprite.vel.y;
    }
  }

  movement() {
    // player sprite movement logic
    // applying force to the player's sprite in response to wasd or the arrow keys
    if (kb.pressing('left')) this.playerSprite.applyForce(-40, 0);
    else if (kb.pressing('right')) this.playerSprite.applyForce(40, 0);
    if (kb.pressing('up')) this.playerSprite.applyForce(0, -40);
    else if (kb.pressing('down')) this.playerSprite.applyForce(0, 40);

    // the following code 1) prevents exceeding the maxSpeed  
    this.currentVel = createVector(this.playerSprite.vel.x, this.playerSprite.vel.y);
    if (this.currentVel.mag() > this.maxSpeed) {
      this.currentVel.setMag(this.maxSpeed);
      this.playerSprite.vel.x = this.currentVel.x;
      this.playerSprite.vel.y = this.currentVel.y;
    } 

    // 2)preserves the direction when the sprite stops
    if (this.currentVel.mag() > 0.2) this.direcitonSave = this.currentVel.heading();
    
    if (this.currentVel.mag() < 0.2) this.stationary = true; 
    else this.stationary = false;

    if (this.stationary === false) this.playerSprite.rotation = this.currentVel.heading();
    else this.playerSprite.rotation = this.direcitonSave;
  }

  debug() {
    //debug info with coordinates ont pot of mivng player
    text(`player.x: ${round(this.playerSprite.x)} player.y: ${round(this.playerSprite.y)}`, this.playerSprite.x, this.playerSprite.y - 30);
    text(`player vel: ${this.currentVel.mag()}`, this.playerSprite.x, this.playerSprite.y - 50);
    // text(`p.canv.x: ${round(player.canvasPos.x)} p.canv.y: ${round(player.canvasPos.y)}`, player.x, player.y - 50);
    // text(`windowWidth/4: ${round(windowWidth/4)} windowWidth*3/4: ${round(windowWidth*3/4)}`, player.x, player.y - 70);
    // text(`windowHeight/4: ${round(windowHeight/4)} windowHeight*3/4: ${round(windowHeight*3/4)}`, player.x, player.y - 90); 
  }


}