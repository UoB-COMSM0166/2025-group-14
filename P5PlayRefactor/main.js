let banks;
let leftBankConstr, rightBankConstr;


let playerCfg, pursuerCfg;
let boatAnimation;

let allCanals;

//canals
let testEdge;
let c1, c2, c3, c4, c5

function setup() {
	new Canvas();

  //Contains all of the sprite initialisation logic
  //Should bee called only when you want to start a game
  gameplaySetup();

}

function draw() {

  // Updates the sprites position on the map
  //Containts the logic for the dynamic physics for each sprite
  gameplayUpdate();

  // press r to restart the game (the condition)
  // deletes all of the existing sprites and reinstantiates them
  conditionalGameRestart();

  // press p to pause the game
  // as of now just stops the pursuer, but when locks are finished 
  // possible to extend to freezing them as well 
  conditionalGamePause();

  // press c to continue the game
  // makes the pursuer chase you again
  conditionalGameContinue();

  // // obsolete code, that maybe useful in certain circumstances
  // mapConstructor();
}


function gameplaySetup() {
  // world.gravity.y = 5;

  boatAnimation = loadAnimation("Boat-redbrown.png", [
    [64, 64, 64, 32],
    [0, 0, 64, 32],
    [0, 64, 64, 32],
  ]);

  centreCircle = new CentreCirlce();

  player = new Sprite(100, 100, 50, 25);
  player.addAnimation("boat", boatAnimation);
  player.animation.frameDelay = 18;

  playerCfg = new PlayerConfig(player);

  pursuer = new Sprite(40, 100, 50, 25);
  pursuerCfg = new PursuerConfig(pursuer, player, 3);


  leftBankConstr = [];
  rightBankConstr = [];

  camera.x = player.x;
  camera.y = player.y;

  //Message for Leah: for some reason, when I try to use all canals instead of instantiating the canals individually,
  // I get a type error from the methods that control the gates of the canal. It may be related to why the gates are 
  // spinning uncontrollably
  // allCanals = [new canal(300, 2, 100), new canal(770, 4.5, 150), new lock(470, 7, 130), new canal(600, 10, 220), new canal(400, 9, 60)];
  c1 = new canal(300, 2, 100); //right, up
  c2 = new canal(770, 4.5, 150); //right, down
  c3 = new lock(470, 7, 130); //left, down
  c4 = new canal(600, 10, 220); //left up
  c5 = new canal(400, 9, 60);
  network = new canalNetwork(-50, -350, [c1, c2, c3, c4, c5]);
}

function gameplayUpdate() {
  // clean the previous frame
  clear();

  // not necessarily sure what camera.on() does exactly, but if I touch it everything breaks
  camera.on();

  network.animate();

  playerCfg.camera();
  playerCfg.movement();
  playerCfg.debug();

  pursuerCfg.update();

  // mapConstructor();

  //adds the x&y positions on the map
  coordinateGrid();

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

function conditionalGameRestart() {
  if (kb.released('r')) {
    deleteAllSprites();
    reinstantiateAllSprites();
  }
}

function deleteAllSprites() {
  // this part of the function removes all of the sprites
  // if you only reinstantiate the spirte, duplicate sprite will be created
  // call this function when transitioning to a different screen
  centreCircle.exterminate();

  c1.removeSprites();
  c2.removeSprites();
  c3.removeSprites();
  c4.removeSprites();
  c5.removeSprites();

  player.remove();
  pursuer.remove();
}

function reinstantiateAllSprites() {
  //this part of the function reinstantiates all of the sprites
  player = new Sprite(100, 100, 50, 25);
  player.addAnimation("boat", boatAnimation);
  playerCfg = new PlayerConfig(player);
  pursuer = new Sprite(40, 100, 50, 25);
  pursuerCfg = new PursuerConfig(pursuer, player, 3);
  pursuerCfg.setStopPursuing(false);

  camera.x = player.x;
  camera.y = player.y;

  c1 = new canal(300, 2, 100); //right, up
  c2 = new canal(770, 4.5, 150); //right, down
  c3 = new lock(470, 7, 130); //left, down
  c4 = new canal(600, 10, 220); //left up
  c5 = new canal(400, 9, 60);
  network = new canalNetwork(-50, -350, [c1, c2, c3, c4, c5]);

  centreCircle.reincarnate();
}

function conditionalGamePause() {
  if (kb.released('p')) {
    pursuerCfg.setStopPursuing(true);
    playerCfg.setContinueMoving(false);
  }
}

function conditionalGameContinue() {
  if (kb.released('c')) {
    pursuerCfg.setStopPursuing(false);
    playerCfg.setContinueMoving(true);
  }
}



// function mapConstructor() {
//   // map creation logic
//   if (kb.pressing('shift') && mouse.presses()){
//     // console.log("Shift if pressed when mouse is clicked");
//     rightBankConstr.push([mouse.x, mouse.y]);
//     if (rightBankConstr.length > 1) {
//       let rightBank = new Sprite(rightBankConstr);
//       rightBank.collider = 'static';
//       rightBank.colour = "blue";
//     }
//   }
//   else if (mouse.presses()) {
//     // console.log("Mouse was clicked");
//     leftBankConstr.push([mouse.x, mouse.y]);
//     if (leftBankConstr.length > 1) {
//       let leftBank = new Sprite(leftBankConstr);
//       leftBank.collider = 'static';
//       leftBank.colour = "red";
//     }
//     // console.log(mouse.x);
//   }
// }
