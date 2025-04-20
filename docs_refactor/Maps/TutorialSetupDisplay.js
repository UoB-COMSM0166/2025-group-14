//Daniil: the only thing that I have changed here is the name of the class, 
// everything else is the same

class TutorialSetupDisplay {

    constructor() {
        this.player;
        this.playerCfg;
        this.pursuer;
        this.pursuerCfg;
        this.map;
        // below is to make sure that animations are only loaded in once
        this.playerAnimation = LevelController.playerAnimation;
        this.pursuerAnimation = LevelController.pursuerAnimation; 

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
        this.hasDied = false;
        this.cutsceneActive = false;

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
    
    }

    
    textboxLookUp(specificText = null) {
        let text = null;
        let textKey = null;
        if (specificText) {
            textKey = specificText;
        } else textKey = this.kbPressCount;
        switch (textKey) {
            case 0:
                text = "Use the arrow keys to move around the canal"
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
                text = "The canal contains locks. Enter these before the pursuer to allow time for repairs [SPACE]"
                break;
            case 11:
                text = "Try reaching the end of the canal before the pursuer catches up to you"
                break;
            case 12:
                text = "You died - lets try that again!"
                break;
            default:
                this.kbPressCount = this.kbMaxPresses;
                text = this.textboxLookUp(this.kbPressCount);
        }
        return text;
    }
  
    // Post-refactor display
    display() {
        // clean the previous frame
        clear();

        if (keyCode == 27) {
          this.clearSprites();
          camera.off();
          state = GameState.START_SCREEN;
        }

        if (!this.passedMovementTutorial) {
            this.setCamera(1.5, this.player.x, this.player.y);
            this.runMovementTutorial();
            this.map.animate();
            return;
        }

        if (!this.passedDamageTutorial) {
            this.setCamera(1, this.player.x, this.player.y);
            this.runDamageTutorial();
            this.map.animate();
            return;
        }

        if (!this.passedPursuerTutorial) {
            this.runPursuerTutorial();
            this.map.animate();
            return;
        }
  
    }

    setCamera(zoom, x, y) {
        camera.on();
        camera.zoomTo(zoom, 0.005);
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
    
        if (count >= 3 && this.movementDirectionsTimer === undefined) {
            this.movementDirectionsTimer = millis();
        }
        if (millis() - this.movementDirectionsTimer > 2000) {
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
            this.textBox = new SpeechBubble(this.player.x - 150, this.player.y - 100, 150, 75, 
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp());
            this.startedDamageTutorial = true;
        }

        if (this.kbPressCount >= 5) { 
            this.playerCfg.movement(true, true);
        } else {
            camera.off();
            push();
            textAlign(CENTER, CENTER);
            textSize(32); 
            fill(0); 
            noStroke(); 
            text('PAUSED', windowWidth/2, 50);
            pop();
            camera.on()
        }
    
        if (this.kbPressCount == 5) {
            if (!this.startedRepair) {
                this.playerCfg.health = 20;
                this.startedRepair = true;
            }
        }
        
        if (kb.pressed('r') && this.kbPressCount == 5 && this.startedRepair && !this.midRepair) {
            this.kbPressCount = 6;
            this.midRepair = true;
            this.repairStartTime = millis();
            this.textBox = null;
        }
        
        if (this.midRepair && millis() - this.repairStartTime > 3000) {
            this.playerCfg.health = this.playerMaxHealth;
            this.endRepair = true;
            this.midRepair = false;
            this.textBox = new SpeechBubble(this.player.x - 150, this.player.y - 100, 150, 75,
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp());  // Shows "You're fully repaired"
        }
        
        if (!this.midRepair && this.textBox) {
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

    runPursuerTutorial() {
        camera.on();
        if (!this.startedPursuerTutorial) {
            this.kbPressCount = 7;  
            this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);
            this.textBox = new SpeechBubble(
                this.player.x - 150, this.player.y - 100, 150, 75, 
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp()
            );
            this.pursuer = new Sprite(200, 70, 50, 25);
            this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, 3);
            this.pursuer.addAnimation("boat", this.pursuerAnimation);
            this.startedPursuerTutorial = true;  
        }
        
        this.healthbar.draw();
    
        if (this.kbPressCount >= 11) { 
            this.playerCfg.movement(true, true); 
            this.pursuerCfg.update();
        } else {
            camera.off();
            push();
            textAlign(CENTER, CENTER);
            textSize(32); 
            fill(0); 
            noStroke(); 
            text('PAUSED', windowWidth / 2, 50);
            pop();
            camera.on();
        }
        
        if (this.kbPressCount == 7) {
            this.runCutScene(this.player.x, this.player.y, 
                this.pursuer.x, this.pursuer.y);
            this.textBox.show();
            return;
        }
    
        if (this.kbPressCount < 11 && kb.pressed(' ')) {
            this.kbPressCount++;
            this.textBox = new SpeechBubble(
                this.player.x - 150, this.player.y - 100, 150, 75,
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp()
            );
        }

        if (this.kbPressCount < 11) {
            this.setCamera(1, this.player.x, this.player.y);
            camera.off();
            this.textBox.updatePosition(
                this.player.x - 150,
                this.player.y - 100,
                this.player.x - 5,
                this.player.y - 10
            );
            camera.on();
            this.textBox.show();
        } else {
            this.setCamera(1, this.player.x, this.player.y);
        }

        if (finishLineCrossed){ 
            this.clearSprites();
            state = GameState.WIN;
            finishLineCrossed = false;
        }

        if (this.playerCfg.isHealthZero()) {

        }
    }

    // run a *cinematic* camera pan from the point A to B and back
    runCutScene(fromX, fromY, toX, toY) {
        // only want to initialise on first call
        if (!this.cutsceneActive) {
            this.cutsceneActive = true;
            //take a timestamp of when the cutscene started
            this.cutsceneStartTime = millis();
            this.cutsceneDuration = 2000; 
            // add additional delay to allow user to read text box
            this.initialDelay = 1000;
            this.cutsceneFromX = fromX;
            this.cutsceneFromY = fromY;
            this.cutsceneToX = toX;
            this.cutsceneToY = toY;
            this.returningToStart = false; 
            this.returnStartTime = 0;
        }
        //how long has passed since cutscene started
        let timeElapsed = millis() - this.cutsceneStartTime;

        //wait for initial delay
        if (timeElapsed < this.initialDelay && !this.returningToStart) {
            return;
        }

        //lerp below needs to have a value between 0-1 to work out the progress of the panning
        // the return pan needs a different calculation or it hitches for some reason
        let cutSceneProgress;
        if (!this.returningToStart) {
            cutSceneProgress = Math.min((timeElapsed - this.initialDelay)/this.cutsceneDuration, 1);
        } else {
            cutSceneProgress = Math.min((millis() - this.returnStartTime)/this.cutsceneDuration, 1);
        }
    
        // use lerp to set camera smoothly from point A to B (calculates each point on a line between the two)
        let cameraX;
        let cameraY;
        if(!this.returningToStart) {
            cameraX = lerp(this.cutsceneFromX, this.cutsceneToX, cutSceneProgress);
            cameraY = lerp(this.cutsceneFromY, this.cutsceneToY, cutSceneProgress);
        } else {
            cameraX = lerp(this.cutsceneToX, this.cutsceneFromX, cutSceneProgress);
            cameraY = lerp(this.cutsceneToY, this.cutsceneFromY, cutSceneProgress);
        }
        this.setCamera(1.2, cameraX, cameraY);
    
        if (cutSceneProgress == 1) {
            if(!this.returningToStart) {
                this.returningToStart = true;
                //reset the timer for cutscrene
                this.returnStartTime = millis();
            } else {
                this.cutsceneActive = false;
                this.kbPressCount++;
            }
        }
    }

    clearSprites() {
      this.player.remove();
      this.pursuer.remove();
      this.map.removeSprites();
    }
}