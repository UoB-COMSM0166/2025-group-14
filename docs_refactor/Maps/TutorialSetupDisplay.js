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
        this.startedPursuerTutorial = false;
        this.passedMovementTutorial = false;
        this.startedRepair = false;
        this.endRepair = false;

        this.timer; 
        this.kbPressCount = 0;
        this.kbMaxPresses = 10;

        this.midRepair = false;

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

        if (!this.passedPursuerTutorial) {
            this.runPursuerTutorial();
            this.map.animate();
            return;
        }
        this.map.animate();
        //this.playerCfg.camera();
        // turn off damage and health
        this.playerCfg.movement(true, true);
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
            this.playerCfg.health = this.playerMaxHealth;
            this.kbPressCount++;
            this.textBox = new SpeechBubble(this.player.x-150, this.player.y-100, 150, 75, 
                this.player.x-5, this.player.y - 10,
                this.textboxLookUp() );
            this.startedDamageTutorial = true;
        }

        if (this.kbPressCount == 5) { 
            this.playerCfg.movement(true, true);
            if(!this.startedRepair){
                this.playerCfg.health = 20;
                this.startedRepair = true;
            }
        }

        if (kb.pressed('r') && this.kbPressCount == 5) {
            this.kbPressCount = 6;
            this.midRepair = true;
            this.textBox = null;  
        }

        if (this.startedRepair && this.playerCfg.health != 0 && !this.midRepair) {
            this.endRepair = true;
            this.midRepair = false;
            this.textBox.addText(this.textboxLookUp());
        }

        if (!this.midRepair) {
            this.textBox.updatePosition(
                this.player.x - 150,
                this.player.y - 100,
                this.player.x - 5,
                this.player.y - 10
            );
            this.textBox.show();
        }
        
        this.healthbar.draw();
    
        
        if (this.kbPressCount < 5 && kb.pressed(' ')) {
            this.kbPressCount++;
            this.textBox.addText(this.textboxLookUp());
        } 
        if (this.endRepair && kb.pressed(' ')) {
            this.passedDamageTutorial = true;
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
                text = "Use the arrow keys to try and reach the end of the canal"
                break;
            case 1:
                text = "Good job! Check your health bar at the top left [SPACE]"
                break;
            case 2:
                text = "Colliding with the canal edges reduces your health [SPACE]"
                break;
            case 3:
                text = "Health also depletes slowly from wear and tear [SPACE]"
                break;
            case 4:
                text = "If your health fully depletes then you lose the game [SPACE]"
                break;
            case 5:
                text = "Let's try a repair now, press 'r' to fix your boat [SPACE]"
                break;
            case 6:
                text = "You're fully repaired! [SPACE]"
                break;
            case 7:
                text = "Now the challenge begins — a pursuer is after you! [SPACE]"
                break;
            case 8:
                text = "Collecting rubbish in the canal will slow them down [SPACE]"
                break;
            case 9:
                text = "If the pursuer catches up to you your health will deplete [SPACE]"
                break;
            case 10:
                text = "Try reaching the end of the canal before the pursuer catches up to you"
                break;
            default:
                this.kbPressCount = this.kbMaxPresses;
                text = this.textboxLookUp(this.kbPressCount);
        }
        return text;
    }

    runPursuerTutorial() {
        if (!this.startedPursuerTutorial) {
            this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);
            this.playerCfg.health = this.playerMaxHealth;
            this.kbPressCount = 7;
            this.textBox = new SpeechBubble(this.player.x-150, this.player.y-100, 150, 75, 
                this.player.x-5, this.player.y - 10,
                this.textboxLookUp() );
            this.kbPressCount++;
            this.startedPursuerTutorial = true;
        }
        this.healthbar.draw();
        this.textBox.updatePosition(
            this.player.x - 150, 
            this.player.y - 100, 
            this.player.x - 5, 
            this.player.y - 10
        );
        this.textBox.show();

        if(this.kbPressCount <= 10 && kb.pressed(' ')) {
            this.textBox.addText(this.textboxLookUp());
            this.textBox.show();
            this.kbPressCount++;
        }

        if(this.kbPressCount > 10) {
            this.playerCfg.movement(true, true)
        }
        
        
    }
  
    clearSprites() {
      this.player.remove();
      /* this.pursuer.remove(); */
      this.map.removeSprites();
    }
}