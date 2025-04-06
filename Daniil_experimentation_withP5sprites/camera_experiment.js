let ball, floor;
let banks;
let leftBankConstr, rightBankConstr;
let centre;
let maxSpeed;

let stationary;
let direcitonSave;



function setup() {
	new Canvas(windowWidth, windowHeight);
	// world.gravity.y = 5;

  centre = new Sprite(0, 0, 50);
  centre.colour = "red";
  centre.collider = 'static';


  player = new Sprite(100, 100, 50, 25);
  // player.debug = true;
  // player.maxSpeed = 5;
  player.friction = 10;
  player.drag = 5;
  player.bounciness = 0.9;
  player.colour = 'green'; 
  // player.collider = 'kinematic';
  maxSpeed = 4.5;

  leftBankConstr = [];
  rightBankConstr = [];


  camera.x = player.x;
  camera.y = player.y;

  
  stationary = false;
  direcitonSave = 0;
}

function draw() {

  // clean the previous frame
  clear();

  // not necessarily sure what camera.on() does exactly, but if I touch it everything breaks
  camera.on();

  // if the player starts to move outside the camera frame, you move the camera
  if (player.canvasPos.x < windowWidth/4 || player.canvasPos.x > windowWidth*3/4) {
    camera.x += player.vel.x;
  }   
  if (player.canvasPos.y < windowHeight/4 || player.canvasPos.y > windowHeight*3/4) {
    camera.y += player.vel.y;
  }

  // this creates the grid with coordinates. Might be useful for Leah when creating maps
  for (let horPix = -5000; horPix < 5000; horPix += 300) {
    for (let vewPix = -5000; vewPix < 5000; vewPix += 300) {
      textSize(15);
      fill(0);
      stroke(0);
      // strokeWeight(4);
      text(`${horPix} ${vewPix}`, horPix, vewPix);
    }
  }

  // player sprite movement logic
  // applying force to the player's sprite in response to wasd or the arrow keys
  if (kb.pressing('left')) player.applyForce(-40, 0);
  else if (kb.pressing('right')) player.applyForce(40, 0);
  if (kb.pressing('up')) player.applyForce(0, -40);
  else if (kb.pressing('down')) player.applyForce(0, 40);


  // the following code 1) prevents exceeding the maxSpeed  
  let currentVel = createVector(player.vel.x, player.vel.y);
  if (currentVel.mag() > maxSpeed) {
    currentVel.setMag(maxSpeed);
    player.vel.x = currentVel.x;
    player.vel.y = currentVel.y;
  } 

  // 2)preserves the direction when the sprite stops
  if (currentVel.mag() > 0.2) direcitonSave = currentVel.heading();
  
  if (currentVel.mag() < 0.2) stationary = true; 
  else stationary = false;

  if (stationary === false) player.rotation = currentVel.heading();
  else player.rotation = direcitonSave;

  // map creation logic
  if (kb.pressing('shift') && mouse.presses()){
    // console.log("Shift if pressed when mouse is clicked");
    rightBankConstr.push([mouse.x, mouse.y]);
    if (rightBankConstr.length > 1) {
      let rightBank = new Sprite(rightBankConstr);
      rightBank.collider = 'static';
      rightBank.colour = "blue";
    }
  }
  else if (mouse.presses()) {
    // console.log("Mouse was clicked");
    leftBankConstr.push([mouse.x, mouse.y]);
    if (leftBankConstr.length > 1) {
      let leftBank = new Sprite(leftBankConstr);
      leftBank.collider = 'static';
      leftBank.colour = "red";
    }
    // console.log(mouse.x);

  }

    //debug info with coordinates ont pot of mivng player
    text(`player.x: ${round(player.x)} player.y: ${round(player.y)}`, player.x, player.y - 30);
    text(`player vel: ${currentVel.mag()}`, player.x, player.y - 50);
    // text(`p.canv.x: ${round(player.canvasPos.x)} p.canv.y: ${round(player.canvasPos.y)}`, player.x, player.y - 50);
    // text(`windowWidth/4: ${round(windowWidth/4)} windowWidth*3/4: ${round(windowWidth*3/4)}`, player.x, player.y - 70);
    // text(`windowHeight/4: ${round(windowHeight/4)} windowHeight*3/4: ${round(windowHeight*3/4)}`, player.x, player.y - 90); 

  // // like with camera on, if I touch it, everything breaks
  // camera.off();
}
