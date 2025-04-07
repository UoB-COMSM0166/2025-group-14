let banks;
let leftBankConstr, rightBankConstr;


let playerCfg;

function setup() {
	new Canvas(windowWidth, windowHeight);
	// world.gravity.y = 5;

  centreCircle = new CentreCirlce();

  player = new Sprite(100, 100, 50, 25);
  playerCfg = new PlayerConfig(player);

  pursuer = new Sprite(40, 100, 50, 25);
  pursuerCfg = new PursuerConfig(pursuer, player, 3);

  leftBankConstr = [];
  rightBankConstr = [];

  camera.x = player.x;
  camera.y = player.y;

}

function draw() {

  // clean the previous frame
  clear();

  // not necessarily sure what camera.on() does exactly, but if I touch it everything breaks
  camera.on();
  playerCfg.camera();

  // coordinateGrid();

  playerCfg.movement();
  playerCfg.debug();

  pursuerCfg.update();

  mapConstructor();

  coordinateGrid();

  // // like with camera on, if I touch it, everything breaks
  // camera.off();
}

function coordinateGrid() {
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
}

function mapConstructor() {
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
}
