// // reminder for the cooldown variables:
// // both pursuerMoveCooldown and pursuerDamageCooldown are global variables that are instantiated in the pursuer config file above pursuer class
// // pursuerMoveCooldown is assigned a cooldown number of frames in the collect function in the canal file (which is at the bottom)
// // pursuerDamageCooldown is assigned a cooldown number of frames in the movement method of the player config

// class Level2 {
    
//   constructor() {
//       // Post-refactor globals
//       this.banks;
//       this.player;
//       this.playerCfg;
//       this.pursuer;
//       this.pursuerCfg;
//       this.centreCircle;
//       this.map;

//       // below is to make sure that animations are only loaded in once
//       this.playerAnimation = LevelController.playerAnimation;
//       this.pursuerAnimation = LevelController.pursuerAnimation;

//       this.timer;
//       this.healthbar;

//     //what each parameter does:
//     // 1) playerMaxHealth - maximum HP assigned to the player at the beginning
//     // 2) canalCollisionDamage - amount of HP deducted when you bump into a bank and 
//     //when the pursuer catches you
//     // 3) damageOverTime - deduction of HP every second
//     // 4-5) playerSpeed & pursuerSpeed - limit for the amount of pixels changed per frame (there are 60 frames per second)
//     // 6) pursuerFreezeFrames - the amount of frames the pursuer freezes upon picking a piece of garbage
//       if (difficultyLevel === 0) { //easy level
//         this.playerMaxHealth = 100;
//         this.canalCollisionDamage = 3;
//         this.damageOverTime = 1;
//         this.playerSpeed = 4.5;
//         this.pursuerSpeed = 3;
//         pursuerFreezeFrames = 15;
//       } else if (difficultyLevel === 1) { //medium level
//         this.playerMaxHealth = 70;
//         this.canalCollisionDamage = 5;
//         this.damageOverTime = 1.2;
//         this.playerSpeed = 4.5
//         this.pursuerSpeed = 3;
//         pursuerFreezeFrames = 10;
//       } else if (difficultyLevel === 2) { //hard level
//         this.playerMaxHealth = 50;
//         this.canalCollisionDamage = 10;
//         this.damageOverTime = 1.5;
//         this.playerSpeed = 4.5
//         this.pursuerSpeed = 3;
//         pursuerFreezeFrames = 5;
//       }
//       this.pauseButton = new Button("PAUSE", windowWidth/2.5, windowHeight/18, 'seagreen', 20, this.buttonClick.bind(this));
//       this.isPaused = false;
//   }

//   setup() {
//     // Instantiate Timer (to time events that occur over time)
//     this.timer = new Timer();
//     this.timer.startTimer();

//     // this.centreCircle = new CentreCirlce();

//     this.player = new Sprite(265, -328, 35, 25);

//     this.map = MapController.getMap(2, this.player);

//     this.player.addAnimation("boat", this.playerAnimation);
//     this.player.animation.frameDelay = 18;
//     this.playerCfg = new PlayerConfig(this.player, this.playerMaxHealth, this.canalCollisionDamage, this.damageOverTime, 
//       this.timer, this.map, this.playerSpeed);
  
//     this.pursuer = new Sprite(-442, -327, 25, 15);
//     this.pursuer.addAnimation("boat", this.pursuerAnimation);
//     this.pursuer.animation.frameDelay = 18;
//     this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, this.pursuerSpeed);
  
//     // Instantiate healthbar
//     this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);

//     this.leftBankConstr = [];
//     this.rightBankConstr = [];
  
//     camera.x = this.player.x;
//     camera.y = this.player.y;

//     camera.zoom = 1;

//     // text(`${mouseX} ${mouseY}`, mouseX, mouseY);


//   }

//   // Post-refactor display
//   display() {
//     // clean the previous frame
//     clear();

//     textSize(20);
//     fill(0);
//     stroke(256);
//     strokeWeight(4);
//     text(`x: ${mouse.x} y: ${mouse.y}`, mouseX, mouseY);

//     camera.on();
//     this.healthbar.draw();

//     this.map.animate();

//     this.playerCfg.camera();
//     this.playerCfg.movement();
//     this.playerCfg.debug();

//     this.pursuerCfg.update();

//     // Show pause button
//     this.pauseButton.show();
//     //update position of button to follow camera
//     this.pauseButton.setPosition(windowWidth/2.5, windowHeight/18);

//     this.moveCamera();

//     if (this.playerCfg.isHealthZero()){
//         this.clearSprites();
//         this.pauseButton.remove();
//         state = GameState.LOSE;
//     }
//     if (kb.pressed('q') || finishLineCrossed){ 
//         this.clearSprites();
//         this.pauseButton.remove();
//         state = GameState.WIN;
//         finishLineCrossed = false;
//     }
    
//     if (kb.pressed('escape')) {
//         this.clearSprites();
//         this.pauseButton.remove();
//         state = GameState.START_SCREEN;
//     }


//   }

//   moveCamera() {
//     if (kb.pressing('j')) camera.x -= 20;
//     else if (kb.pressing('l')) camera.x += 20;
//     if (kb.pressing('i')) camera.y -= 20;
//     else if (kb.pressing('k')) camera.y += 20;
//     if (kb.pressing('u')) {
//       camera.x = this.player.x;
//       camera.y = this.player.y;
//     }
//     // when you zoom out, for some reason the player and pursuer objects disappear and you have to restart
//     if (kb.pressing('[')) camera.zoomTo(0.2, 1);
//   }

//   clearSprites() {
//     this.player.remove();
//     this.pursuer.remove();
//     this.map.removeSprites();
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