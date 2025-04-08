let ball, floor;
let banks;
let leftBankConstr, rightBankConstr;


function setup() {
	new Canvas(windowWidth, windowHeight);
	// world.gravity.y = 5;

  player = new Sprite(100, 100, 50, 25);
  player.maxSpeed = 5;
  // player.friction = 10;
  player.drag = 5;
  player.bounciness = 0.9;
  player.colour = 'green'; 
  // player.collider = 'kinematic';

  leftBankConstr = [];
  rightBankConstr = [];
  
}

function draw() {
  if (kb.pressing('left')) player.applyForce(-40, 0);
  else if (kb.pressing('right')) player.applyForce(40, 0);
  if (kb.pressing('up')) player.applyForce(0, -40);
  else if (kb.pressing('down')) player.applyForce(0, 40);

  let v = createVector(player.vel.x, player.vel.y);
  let heading = v.heading();
  player.rotation = heading;

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

  }

  clear();
}
