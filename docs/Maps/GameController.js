class GameController {
  
    constructor() {
    // Post-refactor globals
    this.banks;
    this.player;
    this.playerCfg;
    this.pursuer;
    this.pursuerCfg;
    this.centreCircle;
    this.map;

    // below is to make sure that animations are only loaded in once
    this.playerAnimation = LevelController.playerAnimation;
    this.pursuerAnimation = LevelController.pursuerAnimation;
    this.grassBackground;

    this.timer;
    this.healthbar;

    //what each parameter does is explained below   
    this.playerMaxHealth;
    this.canalCollisionDamage;
    this.damageOverTime;
    this.pursuerDamage;
    this.playerSpeed;
    this.pursuerSpeed;
    this.pauseButton = new Button("Pause", windowWidth/2.5, windowHeight/18, 'seagreen', 20, this.buttonClick.bind(this));
    this.defaultControlButton = new Button("Standard Controls", windowWidth*2/3, windowHeight/18, 'seagreen', 20, () => this.playerCfg.setStandardControls());
    this.alternativeControlButton = new Button("Alternative Controls", windowWidth*2/3, windowHeight*3/18, 'seagreen', 20, () => this.playerCfg.setAlternativeControls());
    this.exitButton = new Button("Exit", windowWidth*5/6, windowHeight/18, 'seagreen', 20, this.buttonExit.bind(this));
    this.isPaused = false;
  }

  setup() {
    this.grassBackground = loadImage("assets/grass-texture.png");
    // Instantiate Timer (to time events that occur over time)
    this.timer = new Timer();
    this.timer.startTimer();

    //this method fetches the selected map from MapController 
    // and creates the player and pursuer sprites setting their location depending on the map

    this.player = MapController.getPlayer(selectedMap);
    this.pursuer = MapController.getPursuer(selectedMap);
    this.map = MapController.getMap(selectedMap, this.player);

    // this method sets the values of the variables that are dependent 
    // on the difficulty level
    this.setDifficultyParameters();

    //initialisation and configuration of the player and pursuer classes
    this.player.addAnimation("boat", this.playerAnimation);
    this.player.animation.frameDelay = 18;
    this.playerCfg = new Player(this.player, this.playerMaxHealth, this.canalCollisionDamage, this.damageOverTime, 
      this.pursuerDamage, this.timer, this.map, this.playerSpeed);

    this.pursuer.addAnimation("boat", this.pursuerAnimation);
    this.pursuer.animation.frameDelay = 18;
    this.pursuerCfg = new Pursuer(this.pursuer, this.player, this.pursuerSpeed);

    // Instantiate healthbar
    this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);

    // center the camera around the player sprite when the game initialises
    camera.x = this.player.x;
    camera.y = this.player.y;
    camera.zoom = 1;

    this.repairButton = new Button("Repair boat", windowWidth*2/3, windowHeight/18, 'seagreen', 20, () => this.playerCfg.repair());

    // for debugging
    // text(`${mouseX} ${mouseY}`, mouseX, mouseY);
  }

  // the selectedMap variable is assigned a value in main (when the player clicks which map they want to play)

  // The below switch statement is the dryest implementation of difficulty selection I (Daniil) came up with 
  // that at the same time sets the difficulty parameters the same on 2 maps and leaves the opportunity to create 
  // different parameters for easy, med and difficult levels for each map. Additionally, the same function could 
  // potentially be used for in-game change of difficulty 

  //what each parameter does:
  // 1) playerMaxHealth - maximum HP assigned to the player at the beginning
  // 2) canalCollisionDamage - amount of HP deducted when you bump into a bank and 
  //when the pursuer catches you
  // 3) damageOverTime - deduction of HP every second
  // 4-5) playerSpeed & pursuerSpeed - limit for the amount of pixels changed per frame (there are 60 frames per second)
  // 6) pursuerFreezeFrames - the amount of frames the pursuer freezes upon picking a piece of garbage
  setDifficultyParameters() {
    switch (selectedMap) {
      case 1:
      case 2:
      default:
        switch (difficultyLevel) { 
          // easy mode: should be hard to die but not too boring
          case 0:
            this.playerMaxHealth = 100; 
            this.canalCollisionDamage = 1;
            this.damageOverTime = 0.25;
            this.playerSpeed = 4;
            this.pursuerSpeed = 2.5;
            this.pursuerDamage = 0.025;
            pursuerFreezeFrames = 15;
            break;
          // medium mode: a fun balance for most players
          case 1:
            this.playerMaxHealth = 100;
            this.canalCollisionDamage = 4;
            this.damageOverTime = 1;
            this.playerSpeed = 4;
            this.pursuerSpeed = 2.65;
            this.pursuerDamage = 0.25; // colliding with pursuer causes player to lose 1/3 of their health
            pursuerFreezeFrames = 10;
            break;
          // hard mode: for players wanting a challenge
          case 2:
            this.playerMaxHealth = 100;
            this.canalCollisionDamage = 8;
            this.damageOverTime = 2;
            this.playerSpeed = 4;
            this.pursuerSpeed = 2.8;
            this.pursuerDamage = 0.5; // colliding with pursuer causes player to lose all of their health and die
            pursuerFreezeFrames = 5;
            break;
        }
    }

  }

  display() {
    // clean the previous frame
    clear();

    this.displayBackground();

    //add the mouse coordinates on the screen for debugging
    /* textSize(20);
    fill(0);
    stroke(256);
    strokeWeight(4);
    text(`x: ${mouse.x} y: ${mouse.y}`, mouseX, mouseY); */

    camera.on();
  
    this.map.animate();

    this.playerCfg.camera();
    this.playerCfg.movement();
    this.playerCfg.debug();

    this.pursuerCfg.update();

    this.healthbar.draw();

    // Show pause button
    this.pauseButton.show();
    this.defaultControlButton.show();
    this.alternativeControlButton.show();
    //update position of button to follow camera
    this.pauseButton.setPosition(windowWidth/2.5, windowHeight/18);
    this.defaultControlButton.setPosition(windowWidth*2/3, windowHeight/18);
    this.alternativeControlButton.setPosition(windowWidth*2/3, windowHeight*3/18);
    this.exitButton.setPosition(windowWidth*4/5, windowHeight/18);
    this.repairButton.setPosition(windowWidth*2/3, windowHeight/18);


    if (!(this.isPaused)) {
      this.defaultControlButton.hideButton();
      this.alternativeControlButton.hideButton();
      this.exitButton.showButton();
      this.repairButton.showButton();
    } else {
      this.exitButton.hideButton();
      this.defaultControlButton.showButton();
      this.alternativeControlButton.showButton();
      this.repairButton.hideButton();
    }


    // uncomment this line of code to detach the camera from the player sprite and have an overview of the map for debugging
    // this.moveCamera();

    if (this.playerCfg.isHealthZero()){
      if (soundOn) {
        shipBreakSound.play();
      }
      this.clearSprites();
      this.pauseButton.remove();
      this.defaultControlButton.remove();
      this.alternativeControlButton.remove();
      this.exitButton.remove();
      this.repairButton.remove();
      state = GameState.LOSE;
    }
    if (kb.pressed('q') || finishLineCrossed){ 
      if (soundOn) {
        winSound.play();
      }
      this.clearSprites();
      this.pauseButton.remove();
      this.defaultControlButton.remove();
      this.alternativeControlButton.remove();
      this.exitButton.remove();
      this.repairButton.remove();
      state = GameState.WIN;
      finishLineCrossed = false;
    }
    
    if (kb.pressed('escape')) {
      this.clearSprites();
      this.pauseButton.remove();
      this.defaultControlButton.remove();
      this.alternativeControlButton.remove();
      this.exitButton.remove();
      this.repairButton.remove();
      state = GameState.START_SCREEN;
    }
  }

  buttonExit() {
    this.clearSprites();
    this.pauseButton.remove();
    this.defaultControlButton.remove();
    this.alternativeControlButton.remove();
    this.exitButton.remove();
    this.repairButton.remove();
    state = GameState.START_SCREEN;
  }

  displayBackground(){
    camera.on();
    //hard coding the size of image seems to help with performance issues
    let tileWidth = 778;
    let tileHeight = 545;
    //chose a proximity thats the size of a large screen (should work on lab machine with no pop in)
    let proximity = 2560;
    imageMode(CENTER);
    // for a box of size 10000 by 10000 pixels fill it with copies of the image ONLY if the player is close
    for(let x = -5000; x < 11000; x += tileWidth) {
      for(let y = -5000; y < 5000; y += tileHeight){
        //is distance of player to nearest image tile less than proximity pixels?
        let visualRadius = dist(this.player.x, this.player.y, x, y);
        if(visualRadius < proximity)
          image(this.grassBackground, x, y, tileWidth, tileHeight);
      }
    }
    camera.off();
  }

  moveCamera() {
    if (kb.pressing('j')) camera.x -= 20;
    else if (kb.pressing('l')) camera.x += 20;
    if (kb.pressing('i')) camera.y -= 20;
    else if (kb.pressing('k')) camera.y += 20;
    if (kb.pressing('u')) {
      camera.x = this.player.x;
      camera.y = this.player.y;
    }
    // when you zoom out, for some reason the player and pursuer objects disappear and you have to restart
    if (kb.pressing('[')) camera.zoomTo(0.2, 1);
  }

  clearSprites() {
    this.player.remove();
    this.pursuer.remove();
    this.map.removeSprites();
  }

  pauseGame() {
    noLoop(); // stops looping over draw/display.
  }

  resumeGame() {
    loop(); // resumes looping
  }

  // If game is paused, click button to play. If game is playing, click button pauses it
  buttonClick() {
    console.log("Button clicked!");
    if (this.isPaused) {
      this.pauseButton.setLabel("PAUSE");
      this.pauseButton.show();
      this.resumeGame();
      this.isPaused = false;
    }
    else {
      this.pauseButton.setLabel("Play");
      this.pauseButton.show();
      this.pauseGame();
      this.isPaused = true;
    }
  }
}
