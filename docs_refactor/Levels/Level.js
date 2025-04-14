class Level {
    constructor(levelNumber) {
        // Post-refactor globals
        this.levelNumber = levelNumber;
        this.player;
        this.playerCfg;
        this.pursuer;
        this.pursuerCfg;
        this.centreCircle;
        this.map;
        // below is to make sure that animations are only loaded in once
        this.playerAnimation = LevelController.playerAnimation;
        this.pursuerAnimation = LevelController.pursuerAnimation;
        this.timer;
        this.healthbar;
        this.playerMaxHealth = 100;
        this.canalCollisionDamage = 3;
        this.damageOverTime = 1;
    }
  
    setup() {
         // Instantiate Timer (to time events that occur over time)
        this.timer = new Timer();
        this.timer.startTimer();
  
        // this.centreCircle = new CentreCirlce();
  
        this.player = new Sprite(265, -328, 35, 25);
  
        this.map = MapController.getMap(this.levelNumber, this.player);
  
        this.player.addAnimation("boat", this.playerAnimation);
        this.player.animation.frameDelay = 18;
        this.playerCfg = new PlayerConfig(this.player, this.playerMaxHealth, this.canalCollisionDamage, this.damageOverTime, this.timer, this.map);
      
        this.pursuer = new Sprite(-442, -327, 25, 15);
        this.pursuer.addAnimation("boat", this.pursuerAnimation);
        this.pursuer.animation.frameDelay = 18;
        this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, 0);
      
        // Instantiate healthbar
        this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);

        camera.x = this.player.x;
        camera.y = this.player.y;
        camera.zoom = 1;
      }
  
    // Post-refactor display
    display() {
      // clean the previous frame
      clear();
  
      textSize(20);
      fill(0);
      stroke(256);
      strokeWeight(4);
      text(`x: ${mouse.x} y: ${mouse.y}`, mouseX, mouseY);
  
      camera.on();
      this.healthbar.draw();
  
      this.map.animate();
  
      this.playerCfg.camera();
      this.playerCfg.movement();
      this.playerCfg.debug();
  
      this.pursuerCfg.update();
  
      this.moveCamera();
  
      if (this.playerCfg.isHealthZero()){
          this.clearSprites();
          state = GameState.LOSE;
      }
      if (keyCode == 86 || finishLineCrossed){ // changes w keycode to q
          this.clearSprites();
          state = GameState.WIN;
          finishLineCrossed = false;
      }
      if (keyCode == 27) {
          this.clearSprites();
          state = GameState.START_SCREEN;
      }
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
      // this.centreCircle.remove();
      this.map.removeSprites();
    }
  
   /*  coordinateGrid() {
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
    } */
  }