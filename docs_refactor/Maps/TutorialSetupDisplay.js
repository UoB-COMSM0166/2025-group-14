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
        
        this.playerSpeed;
        
        this.canalCollisionDamage = 3;
        this.damageOverTime = 1;

        this.movementTutorial = {
            up: false,
            down: false,
            left: false,
            right: false,
        }

        this.passedDamageTutorial = false;
        this.startedDamageTutorial = false;
        this.passedMovementTutorial = false;

        this.timer; 
        this.kbPressCount = 0;
        this.kbMaxPresses = 6;

        this.textbox = null;
    }
  
    setup() {

        this.timer = new Timer();
        this.timer.startTimer();

        this.player = new Sprite(100, 70, 50, 25);
        this.map = MapController.getMap0(this.player);
  
        this.player.addAnimation("boat", this.playerAnimation);
        this.player.animation.frameDelay = 18;
        this.playerMaxHealth = 100;
        this.playerCfg = new PlayerConfig(this.player, this.playerMaxHealth,  this.canalCollisionDamage, this.damageOverTime, this.timer, this.map, this.playerSpeed);
      
       /*  this.pursuer = new Sprite(40, 100, 50, 25);
        this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, 3); */
      
        /* camera.x = this.player.x;
        camera.y = this.player.y; */
      }
  
    // Post-refactor display
    display() {
        // clean the previous frame
        clear();
        this.setCamera(1.5, this.player.x, this.player.y);

        if (keyCode == 27) {
          this.clearSprites();
          camera.off();
          state = GameState.START_SCREEN;
        }

        if (!this.passedMovementTutorial) {
            this.runMovementTutorial();
            this.map.animate();
            return;
        }

        this.setCamera(1, this.player.x, this.player.y);
        if (!this.passedDamageTutorial) {
            this.runDamageTutorial();
            this.map.animate();
            return;
        }
        this.map.animate();
        //this.playerCfg.camera();
        // turn off damage and health
        this.playerCfg.movement(false, false);
        this.playerCfg.debug();
  
        /* this.pursuerCfg.update(); */
    }

    setCamera(zoom, x, y) {
        camera.on();
        //camera.zoomTo(zoom, 0.005);
        camera.x = x;
        camera.y = y;
    }

    setMovementProgress() {
        if (kb.pressing(UP_ARROW)) this.movementTutorial.up = true;
        if (kb.pressing(DOWN_ARROW)) this.movementTutorial.down = true;
        if (kb.pressing(LEFT_ARROW)) this.movementTutorial.left = true;
        if (kb.pressing(RIGHT_ARROW)) this.movementTutorial.right = true;

        let count = 0;
        if (this.movementTutorial.up) count++;
        if (this.movementTutorial.down) count++;
        if (this.movementTutorial.left) count++;
        if (this.movementTutorial.right) count++;
    
        if (count >= 3) {
            this.passedMovementTutorial = true;
        }
    }

    runMovementTutorial() {
        this.textBox = new SpeechBubble(this.player.x-150, this.player.y-100, 150, 75, 
        this.player.x-5, this.player.y - 10,
        this.textboxLookUp());
        this.textBox.show();
        this.playerCfg.movement();
        this.setMovementProgress();
    }

    runDamageTutorial() {
      //camera.off();
        if (!this.startedDamageTutorial) {
            this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);
            this.health = this.playerMaxHealth;
            this.kbPressCount++;
            this.textBox = new SpeechBubble(this.player.x-150, this.player.y-100, 150, 75, 
                this.player.x-5, this.player.y - 10,
                this.textboxLookUp() );
            this.startedDamageTutorial = true;
        }
        this.healthbar.draw();
        this.textBox.updatePosition(
            this.player.x - 150, 
            this.player.y - 100, 
            this.player.x - 5, 
            this.player.y - 10
        );
        this.textBox.show();
        if(this.health > 0 && this.kbPressCount >= 6) {
            this.playerCfg.movement(true, true);
        } 
        if (this.kbPressCount == 6) {
            this.health = 0;
        }
        if(this.health == 0) {
            this.kbPressCount = 5;
        } else if(kb.pressed(' ')) {
            this.kbPressCount++;
            this.textBox.addText(this.textboxLookUp());
            this.textBox.show();
        }
    }

    textboxLookUp(specificText = null) {
        let text = null;
        let textKey = null;
        if (specificText) {
            textKey = specificText;
        } else textKey = this.kbPressCount;
        switch (textKey) {
            case 0:
                text = "Lets try moving around the canal, use the arrow keys to navigate"
                break;
            case 1:
                text = "Nice one! Now look at the top left corner and you'll see a healthbar [SPACE]"
                break;
            case 2:
                text = "Hitting the edge of the canal will cause your health to drain [SPACE]"
                break;
            case 3:
                text = "You will also slowly lose health over time due to wear and tear [SPACE]"
                break;
            case 4:
                text = "When your health drops to zero you must repair by pressing the \'r\' key [SPACE]"
                break;
            case 5:
                text = "Let's have a go at this now [SPACE]"
                break;
            case 6:
                text = ""
            break;
            default:
                this.kbPressCount = this.kbMaxPresses;
                text = this.textboxLookUp(this.kbPressCount);
        }
        return text;
    }

    runGarbageTutorial() {
        
    }

    runPursuerTutorial() {

    }
  
    clearSprites() {
      this.player.remove();
      /* this.pursuer.remove(); */
      this.map.removeSprites();
    }
}