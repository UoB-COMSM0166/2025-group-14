class LevelOne {
    
  constructor() {
      // Post-refactor globals
      this.banks;
      this.leftBankConstr; 
      this.rightBankConstr;
      this.player;
      this.playerCfg;
      this.pursuer;
      this.pursuerCfg;
      this.centreCircle;
      //canals
      this.testEdge;
      this.leftBankConstr;
      this.rightBankConstr;
      this.map;
      this.boatAnimation = loadAnimation("Boat-redbrown.png", [
          [64, 64, 64, 32],
          [0, 0, 64, 32],
          [0, 64, 64, 32],
        ]);
      this.timer;
      this.healthbar;
  }

  setup() {
       // Instantiate Timer (to time events that occur over time)
       this.timer = new Timer();
       this.timer.startTimer();

      this.centreCircle = new CentreCirlce();
      this.map = new canalMap();
    
      
      let canals = [this.c1, this.c2, this.c3, this.c4, this.c5];

      this.player = new Sprite(100, 100, 50, 25);
      this.player.addAnimation("boat", this.boatAnimation);
      this.player.animation.frameDelay = 18;
      this.playerCfg = new PlayerConfig(this.player, 100, 3, 1, this.timer, canals);
    
      this.pursuer = new Sprite(40, 100, 50, 25);
      this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, 3);
    
      // Instantiate healthbar
      this.healthbar = new HealthBar(100, this.playerCfg);
  
      this.leftBankConstr = [];
      this.rightBankConstr = [];
    
      camera.x = this.player.x;
      camera.y = this.player.y;
    }

  // Post-refactor display
  display() {
      // clean the previous frame
      clear();
      camera.on();
      this.healthbar.draw();

      this.map.animate();

      this.playerCfg.camera();
      this.playerCfg.movement();
      this.playerCfg.debug();

      this.pursuerCfg.update();
      
      this.mapConstructor();
      this.coordinateGrid();

      if (this.playerCfg.isHealthZero()){
          this.clearSprites();
          state = GameState.LOSE;
      }
      if (keyCode == 87){
          this.clearSprites();
          state = GameState.WIN;
      }
      // TODO BUG - this escape to go to start screen is broken atm
      if (keyCode == 27) {
          this.clearSprites();
          state = GameState.START_SCREEN;
      }
  }

  clearSprites() {
    this.player.remove();
    this.pursuer.remove();
    this.centreCircle.remove();
    this.c1.removeSprites();
    this.c2.removeSprites();
    this.c3.removeSprites();
    this.c4.removeSprites();
    this.c5.removeSprites();
  }

  coordinateGrid() {
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
    
    mapConstructor() {
      // map creation logic
      if (kb.pressing('shift') && mouse.presses()){
        // console.log("Shift if pressed when mouse is clicked");
        this.rightBankConstr.push([mouse.x, mouse.y]);
        if (this.rightBankConstr.length > 1) {
          let rightBank = new Sprite(this.rightBankConstr);
          rightBank.collider = 'static';
          rightBank.colour = "blue";
        }
      }
      else if (mouse.presses()) {
        // console.log("Mouse was clicked");
        this.leftBankConstr.push([mouse.x, mouse.y]);
        if (this.leftBankConstr.length > 1) {
          let leftBank = new Sprite(this.leftBankConstr);
          leftBank.collider = 'static';
          leftBank.colour = "red";
        }
        // console.log(mouse.x);
      }
  }
}