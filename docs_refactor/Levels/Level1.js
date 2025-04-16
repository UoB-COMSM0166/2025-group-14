// class Level1 {
    
//   constructor() {
//     this.player;
//     this.playerCfg;
//     this.pursuer;
//     this.pursuerCfg;
//     this.centreCircle;
//     this.map;

//     // below is to make sure that animations are only loaded in once
//     this.playerAnimation = LevelController.playerAnimation;
//     this.pursuerAnimation = LevelController.pursuerAnimation;

//     this.timer;
//     this.healthbar;

//     //what each parameter does:
//     // 1) playerMaxHealth - maximum HP assigned to the player at the beginning
//     // 2) canalCollisionDamage - amount of HP deducted when you bump into a bank and 
//     //when the pursuer catches you
//     // 3) damageOverTime - deduction of HP every second
//     // 4-5) playerSpeed & pursuerSpeed - limit for the amount of pixels changed per frame (there are 60 frames per second)
//     // 6) pursuerFreezeFrames - the amount of frames the pursuer freezes upon picking a piece of garbage
//     if (difficultyLevel === 0) { //easy level
//       this.playerMaxHealth = 100;
//       this.canalCollisionDamage = 3;
//       this.damageOverTime = 0;
//       this.playerSpeed = 4.5;
//       this.pursuerSpeed = 3;
//       pursuerFreezeFrames = 15;
//     } else if (difficultyLevel === 1) { //medium level
//       this.playerMaxHealth = 70;
//       this.canalCollisionDamage = 5;
//       this.damageOverTime = 1;
//       this.playerSpeed = 4.5
//       this.pursuerSpeed = 3;
//       pursuerFreezeFrames = 10;
//     } else if (difficultyLevel === 2) { //hard level
//       this.playerMaxHealth = 50;
//       this.canalCollisionDamage = 10;
//       this.damageOverTime = 1.5;
//       this.playerSpeed = 4.5
//       this.pursuerSpeed = 3;
//       pursuerFreezeFrames = 5;
//     }
//     this.pauseButton = new Button("PAUSE", windowWidth/2.5, windowHeight/18, 'seagreen', 20, this.buttonClick.bind(this));
//     this.isPaused = false;
// }

//   setup() {
//        // Instantiate Timer (to time events that occur over time)
//       this.timer = new Timer();
//       this.timer.startTimer();

//       this.player = new Sprite(100, 100, 35, 25);

//       this.map = MapController.getMap(1, this.player);

//       this.player.addAnimation("boat", this.playerAnimation);
//       this.player.animation.frameDelay = 18;
//       this.playerCfg = new PlayerConfig(this.player, this.playerMaxHealth, this.canalCollisionDamage, this.damageOverTime, this.timer, this.map, this.playerSpeed);
    
//       this.pursuer = new Sprite(40, 100, 50, 25);
//       this.pursuer.addAnimation("boat", this.pursuerAnimation);
//       this.pursuer.animation.frameDelay = 18;
//       this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, this.pursuerSpeed);
    
//       // Instantiate healthbar
//       this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);
  
//       this.leftBankConstr = [];
//       this.rightBankConstr = [];
    
//       camera.x = this.player.x;
//       camera.y = this.player.y;
//     }

//   // Post-refactor display
//   display() {
//       // clean the previous frame
//       clear();
//       camera.on();
//       this.healthbar.draw();

//       this.map.animate();

//       this.playerCfg.camera();
//       this.playerCfg.movement();
//       this.playerCfg.debug();

//       this.pursuerCfg.update();

//       // Show pause button
//       this.pauseButton.show();
//       //update position of button to follow camera
//       this.pauseButton.setPosition(windowWidth/2.5, windowHeight/18);
      
//       this.coordinateGrid();

//       if (this.playerCfg.isHealthZero()){
//         this.clearSprites();
//         this.pauseButton.remove();
//         state = GameState.LOSE;
//       }
//       if (kb.pressed('q') || finishLineCrossed){
//           this.clearSprites();
//           this.pauseButton.remove();
//           state = GameState.WIN;
//           finishLineCrossed = false;
//       }
      
//       if (kb.pressed('escape')) {
//           this.clearSprites();
//           this.pauseButton.remove();
//           state = GameState.START_SCREEN;
//       }

//   }

//   clearSprites() {
//     this.player.remove();
//     this.pursuer.remove();
//     this.map.removeSprites();
//   }

//   coordinateGrid() {
//       // this creates the grid with coordinates. Might be useful for Leah when creating maps
//       for (let horPix = -5000; horPix < 5000; horPix += 300) {
//         for (let vewPix = -5000; vewPix < 5000; vewPix += 300) {
//           textSize(15);
//           fill(0);
//           stroke(0);
//           // strokeWeight(4);
//           text(`${horPix} ${vewPix}`, horPix, vewPix);
//         }
//       }
//   }

//   pauseGame() {
//     noLoop(); // stops looping over draw/display.
//   }

//   resumeGame() {
//     loop(); // resumes looping
//   }

//   // If game is paused, click button to play. If game is playing, click button pauses it
//   buttonClick() {
//     console.log("Button clicked!");
//     if (this.isPaused) {
//       //this.pauseButton.setColour("seagreen");
//       this.pauseButton.setLabel("PAUSE");
//       this.pauseButton.show();
//       this.resumeGame();
//       this.isPaused = false;
//     }
//     else {
//       //this.pauseButton.setColour("skyblue");
//       this.pauseButton.setLabel("PLAY");
//       this.pauseButton.show();
//       this.pauseGame();
//       this.isPaused = true;
//     }
// }

// }