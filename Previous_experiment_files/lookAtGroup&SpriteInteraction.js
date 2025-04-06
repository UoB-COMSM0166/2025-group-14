let ball, floor;
let banks;
let leftBankConstr, rightBankConstr;


function setup() {
	new Canvas(windowWidth, windowHeight);
	// world.gravity.y = 5;

  player = new Sprite(windowWidth / 2, windowHeight / 2, 25, 50);
  player.maxSpeed = 5;
  // player.friction = 10;
  player.drag = 2;
  player.bounciness = 1.3;
  player.colour = 'green'; 
  // player.collider = 'kinematic';

  banks = new Group();
  banks.w = 200;
  banks.h = 10;
  banks.color = 'skyblue';
  banks.text = (i) => i;
  banks.collider = 'static';

  let bank0 = new banks.Sprite();
  bank0.x = 200;
  bank0.y = 50;
  let bank1 = new banks.Sprite();
  bank1.x = 200;
  bank1.y = 50;

	ball = new Sprite();
	ball.diameter = 50;
	ball.y = 30;
  
	floor = new Sprite();
	floor.y = 190;
	floor.w = 238;
	floor.h = 5;
	floor.collider = 'static';
  floor.rotation = 2;

  leftBankConstr = [];
  rightBankConstr = [];
  
}

function draw() {
  if (kb.pressing('left')) player.applyForce(-20, 0);
  else if (kb.pressing('right')) player.applyForce(20, 0);
  if (kb.pressing('up')) player.applyForce(0, -20);
  else if (kb.pressing('down')) player.applyForce(0, 20);

  let v = createVector(player.vel.x, player.vel.y);
  let heading = v.heading();
  player.rotation = heading;

  if (kb.pressing('shift') && mouse.presses()){
    // console.log("Shift if pressed when mouse is clicked");
    rightBankConstr.push([mouse.x, mouse.y]);
  }
  else if (mouse.presses()) {
    // console.log("Mouse was clicked");
    leftBankConstr.push([mouse.x, mouse.y]);
    if (leftBankConstr.length > 2) {
      let floor = new Sprite(leftBankConstr);
      floor.collider = 'static';
    }
    // else if (leftBankConstr.length > 2) {
    //   floor.remove();
    //   let floor = new Sprite(leftBankConstr);
    //   floor.collider = 'static';
    // }

    // for (let i = 0; i < leftBankConstr.length; i += 1) {
    //   console.log(leftBankConstr[i]);
    // }
  }

  clear();
}
