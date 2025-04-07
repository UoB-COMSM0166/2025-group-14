let ball, floor;
let banks;
let leftBankConstr, rightBankConstr;
let centre;

let playerCfg;

function setup() {
	new Canvas(windowWidth, windowHeight);
	// world.gravity.y = 5;

  centre = new Sprite(0, 0, 50);
  centre.colour = "red";
  centre.collider = 'static';


  player = new Sprite(100, 100, 50, 25);
  playerCfg = new PlayerConfig(player);

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
  playerCfg.camera;

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


  playerCfg.movement();


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

  playerCfg.debug();

  // // like with camera on, if I touch it, everything breaks
  // camera.off();
}
