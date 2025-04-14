class Level0 {

    constructor() {
        this.banks;
        this.leftBankConstr; 
        this.rightBankConstr;
        this.player;
        this.playerCfg;
        /* this.pursuer;
        this.pursuerCfg; */
        /* this.centreCircle; */
        //canals
        this.testEdge;
        this.leftBankConstr;
        this.rightBankConstr;
        this.map;
        /* this.boatAnimation = loadAnimation("Boat-redbrown.png", [
            [64, 64, 64, 32],
            [0, 0, 64, 32],
            [0, 64, 64, 32],
        ]); */
        // below is to make sure that animations are only loaded in once
        this.boatAnimation = LevelController.playerAnimation;
        /* this.pursuerAnimation = LevelController.pursuerAnimation; */

        this.movementTutorial = {
            up: false,
            down: false,
            left: false,
            right: false,
        }
        this.passedMovementTutorial = false;
    }
  
    setup() {
        this.map = Maps.getMap0(this.player);
        let canals = [this.c1, this.c2, this.c3, this.c4, this.c5];
  
        this.player = new Sprite(100, 100, 50, 25);
        this.player.addAnimation("boat", this.boatAnimation);
        this.player.animation.frameDelay = 18;
        this.playerCfg = new PlayerConfig(this.player, 100, 3, 1, this.timer, canals);
      
       /*  this.pursuer = new Sprite(40, 100, 50, 25);
        this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, 3); */
    
        this.leftBankConstr = [];
        this.rightBankConstr = [];
      
        camera.x = this.player.x;
        camera.y = this.player.y;
      }
  
    // Post-refactor display
    display() {
        // clean the previous frame
        clear();
        
        this.setCamera();

        if (keyCode == 27) {
          this.clearSprites();
          camera.off();
          state = GameState.START_SCREEN;
        }

        if (!this.passedMovementTutorial) {
            camera.off();
            this.runMovementTutorial();
            this.map.animate();
            return;
        }
        this.map.animate();
        //this.playerCfg.camera();
        // turn off damage and health
        this.playerCfg.movement(false, false);
        this.playerCfg.debug();
  
        /* this.pursuerCfg.update(); */
        
        this.mapConstructor();
        this.coordinateGrid();
        this.setMovementProgress();
  
        /* if (this.playerCfg.isHealthZero()){
            this.clearSprites();
            state = GameState.LOSE;
        } */
 
        /* if (keyCode == 87){
            this.clearSprites();
            state = GameState.WIN;
        } */
        //TODO BUG - this escape to go to start screen is broken atm
      
    }

    setCamera() {
        camera.on();
        camera.zoomTo(3, 0.005);
        camera.x = this.player.x;
        camera.y = this.player.y;
    }

    setMovementProgress() {
        if(this.movementTutorial.up && this.movementTutorial.down
            && this.movementTutorial.left && this.movementTutorial.right) {
            this.passedMovementTutorial = true;
        }

        if (kb.pressing(UP_ARROW)) this.movementTutorial.up = true;
        console.log(this.movementTutorial.up);
        if (kb.pressing(DOWN_ARROW)) this.movementTutorial.down = true;
        console.log(this.movementTutorial.down);
        if (kb.pressing(LEFT_ARROW)) this.movementTutorial.left = true;
        console.log(this.movementTutorial.left);
        if (kb.pressing(RIGHT_ARROW)) this.movementTutorial.right = true;
        console.log(this.movementTutorial.right);
    }

    runMovementTutorial() {
        //camera.off();
        push();
        fill(0);
        textSize(24);
        stroke(2);
        textAlign(LEFT);
        let text1 = "Lets try moving left and right, press the left arrow and the right arrow on your keyboard";
        let padding = 10;
        let textWidth1 = textWidth(text1);

        
        fill(255); 
        stroke(0); 
        rectMode(LEFT);
        rect(100 - padding, windowHeight*8/10 - 25, textWidth1 + padding*2, 25 + padding*2);
        fill(0); // White text
        text(text1, 100, windowHeight*8/10);
        pop();

        this.setMovementProgress();
    }
  
    clearSprites() {
      this.player.remove();
      /* this.pursuer.remove(); */
      /* this.centreCircle.remove(); */
      this.map.removeSprites();
      /*this.c1.removeSprites();
      this.c2.removeSprites();
      this.c3.removeSprites();
      this.c4.removeSprites();
      this.c5.removeSprites();*/
        
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