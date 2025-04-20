//Daniil: the only thing that I have changed here is the name of the class, 
// everything else is the same

class TutorialSetupDisplay {

    constructor() {
        this.player;
        this.playerCfg;
        /* this.pursuer;
        this.pursuerCfg; */
        this.map;
        // below is to make sure that animations are only loaded in once
        this.playerAnimation = LevelController.playerAnimation;
        /* this.pursuerAnimation = LevelController.pursuerAnimation; */

        this.healthbar;
        this.playerMaxHealth = 100;
        this.canalCollisionDamage = 3;

        this.movementTutorial = {
            up: false,
            down: false,
            left: false,
            right: false,
        }

        this.passedDamageTutorial = false;
        this.passedMovementTutorial = false;
    }
  
    setup() {
        this.player = new Sprite(-200, -70, 50, 25);
        this.map = MapController.getMap0(this.player);
  
        this.player.addAnimation("boat", this.playerAnimation);
        this.player.animation.frameDelay = 18;
        this.playerCfg = new PlayerConfig(this.player, 100, 3, 1, this.timer, this.map);
      
       /*  this.pursuer = new Sprite(40, 100, 50, 25);
        this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, 3); */
      
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

        if (!this.passedDamageTutorial) {
          
        }
        this.map.animate();
        //this.playerCfg.camera();
        // turn off damage and health
        this.playerCfg.movement(false, false);
        this.playerCfg.debug();
  
        /* this.pursuerCfg.update(); */
        /* if (this.playerCfg.isHealthZero()){
            this.clearSprites();
            state = GameState.LOSE;
        } */
    }

    setCamera() {
        camera.on();
        //camera.zoomTo(3, 0.005);
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
        let text1 = "Lets try moving around the canal, try using the arrows to move";
        let padding = 10;
        let textWidth1 = textWidth(text1);

        
        fill(255); 
        stroke(0); 
        rectMode(LEFT);
        rect(100 - padding, windowHeight*8/10 - 25, textWidth1 + padding*2, 25 + padding*2);
        fill(0); // White text
        text(text1, 100, windowHeight*8/10);
        pop();

        this.playerCfg.movement(false, false);
        this.setMovementProgress();
    }

    runDamageTutorial() {
      //camera.off();
      push();
      fill(0);
      textSize(24);
      stroke(2);
      textAlign(LEFT);
      let text1 = "Lets try moving around the canal, try using the arrows to move";
      let padding = 10;
      let textWidth1 = textWidth(text1);

      
      fill(255); 
      stroke(0); 
      rectMode(LEFT);
      rect(100 - padding, windowHeight*8/10 - 25, textWidth1 + padding*2, 25 + padding*2);
      fill(0); // White text
      text(text1, 100, windowHeight*8/10);
      pop();

      this.playerCfg.movement(false, false);
      this.setMovementProgress();
    }
  
    clearSprites() {
      this.player.remove();
      /* this.pursuer.remove(); */
      this.map.removeSprites();
    }
}