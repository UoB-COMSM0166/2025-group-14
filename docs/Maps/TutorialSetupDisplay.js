// Runs a tutorial level with three distinct parts - movement, damage and pursuer
// After these tutorials becomes a normal and easy mission to reach the end of the canal
// Feel free to update the text in textbox look up so that info is accurate (fyi adding new textboxes is a little trickier so wouldnt recommend if possible)

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
        this.grassBackground

        this.healthbar;
        this.playerMaxHealth = 100;
        
        this.playerSpeed;

        this.textbox = null;
        
        this.canalCollisionDamage = 3;
        this.damageOverTime = 1;
        this.pursuerDamage = 0.25;

        //flags for seeing if player has successfully moved
        this.movementTutorial = {
            up: false,
            down: false,
            left: false,
            right: false,
        }

        //bools to check if each part of tutorial is a success
        this.passedDamageTutorial = false;
        this.startedDamageTutorial = false;
        this.startedPursuerTutorial = false;
        this.passedMovementTutorial = false;
        this.startedRepair = false;
        this.endRepair = false;
        this.hasDied = false;
        this.cutsceneActive = false;
        this.midRepair = false;

        this.timer; 

        //counter to track which textbox to display and overall flow of tutorial
        this.kbPressCount = 0;
        this.kbMaxPresses = 12;
    }
    
    //normal set up, healthbar and pursuer initialised in their respective tutorials
    setup() {

        this.timer = new Timer();
        this.timer.startTimer();

        this.player = MapController.getPlayer(0);
        this.map = MapController.getMap0(this.player);
  
        this.player.addAnimation("boat", this.playerAnimation);
        this.grassBackground = loadImage("assets/grass-texture.png");
        this.player.animation.frameDelay = 18;
        this.playerMaxHealth = 100;
        this.playerCfg = new PlayerConfig(this.player, this.playerMaxHealth,  this.canalCollisionDamage, this.damageOverTime, this.pursuerDamage, 
            this.timer, this.map, this.playerSpeed);
    
    }

    //switch that displays correct textbox for each point in the game (please edit as you want)
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
        this.displayBackground();
        //press esc to go to start
        if (keyCode == 27) {
          this.clearSprites();
          camera.off();
          state = GameState.START_SCREEN;
        }

        // movement tutorial function run with zoomed in camera
        if (!this.passedMovementTutorial) {
            this.setCamera(1.5, this.player.x, this.player.y);
            this.map.animate();
            this.runMovementTutorial();
            return;
        }
        // damage tutorial function run with normal camera
        if (!this.passedDamageTutorial) {
            this.setCamera(1, this.player.x, this.player.y);
            this.map.animate();
            this.runDamageTutorial();
            return;
        }

        // pursuer tutorial and normal game logic in the runPursuerTutorial function (has win lose conditions)
        if (!this.passedPursuerTutorial) {
            this.runPursuerTutorial();
            return;
        }
  
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
        for(let x = -5000; x < 5000; x += tileWidth) {
          for(let y = -5000; y < 5000; y += tileHeight){
            //is distance of player to nearest image tile less than proximity pixels?
            let visualRadius = dist(this.player.x, this.player.y, x, y);
            if(visualRadius < proximity)
              image(this.grassBackground, x, y, tileWidth, tileHeight);
          }
        }
        camera.off();
      }

    //camera function that zooms to a particular 'zoom' level and a target x/y
    setCamera(zoom, x, y) {
        camera.on();
        camera.zoomTo(zoom, 0.005);
        camera.x = x;
        camera.y = y;
    }

    //checks if player has tried at least 3 move keys and ends movement tutorial when true
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
        // addded a small delay to this so its less jarring 
        if (millis() - this.movementDirectionsTimer > 3000) {
            this.passedMovementTutorial = true;
        }
    }

    //movement tutorial logic with single speech bubble
    runMovementTutorial() {
        this.textBox = new SpeechBubble(this.player.x-150, this.player.y-100, 150, 75, 
        this.player.x-5, this.player.y - 10,
        this.textboxLookUp());
        this.textBox.show();
        this.playerCfg.movement();
        this.setMovementProgress();
    }

    //damage tutorial logic
    runDamageTutorial() {
      //camera.off();
      //when first run initialise a healthbar speechbubble etc
        if (!this.startedDamageTutorial) {
            this.healthbar = new HealthBar(this.playerMaxHealth, this.playerCfg);
            this.playerCfg.health = this.playerMaxHealth;
            this.kbPressCount++;
            this.textBox = new SpeechBubble(this.player.x - 150, this.player.y - 100, 150, 75, 
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp());
            //so it doesnt run again
            this.startedDamageTutorial = true;
        }

        //when you've reached textbox 5 allow movement
        if (this.kbPressCount >= 5) { 
            this.playerCfg.movement(true, true);
        //else display pause text on screen
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
        
        //set player health to 20 for demo purposes
        if (this.kbPressCount == 5) {
            if (!this.startedRepair) {
                this.playerCfg.health = 20;
                this.startedRepair = true;
            }
        }   
        
        //when player hits r makesure that textbox disappears for same amount of time (3 seconds) otherwise health popup is drawn over
        if (kb.pressed('r') && this.kbPressCount == 5 && this.startedRepair && !this.midRepair) {
            this.kbPressCount = 6;
            this.midRepair = true;
            this.repairStartTime = millis();
            this.textBox = null;
        }
        
        // Shows "You're fully repaired" when fully repaired
        if (this.midRepair && millis() - this.repairStartTime > 3000) {
            this.playerCfg.health = this.playerMaxHealth;
            this.endRepair = true;
            this.midRepair = false;
            this.textBox = new SpeechBubble(this.player.x - 150, this.player.y - 100, 150, 75,
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp());  
        }
        
        //update textbox position (when not in mid repair)
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
        //cycle through textboxes when space pressed
        if (this.kbPressCount < 5 && kb.pressed(' ')) {
            this.kbPressCount++;
            this.textBox.addText(this.textboxLookUp());
        }
        
        if (this.endRepair && kb.pressed(' ')) {
            this.passedDamageTutorial = true;
        }
    }

    runPursuerTutorial() {
        //camera is off for some reason when this function is started
        camera.on();
        //intitialise pursuer
        if (!this.startedPursuerTutorial) {
            this.kbPressCount = 7;  
            this.textBox = new SpeechBubble(
                this.player.x - 150, this.player.y - 100, 150, 75, 
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp()
            );
            this.pursuer = MapController.getPursuer(0);
            this.pursuerCfg = new PursuerConfig(this.pursuer, this.player, 1.5);
            this.pursuer.addAnimation("boat", this.pursuerAnimation);
            this.pursuer.animation.frameDelay = 18;
            pursuerFreezeFrames = 15;
            this.startedPursuerTutorial = true;  
        }
        
        this.healthbar.draw();
        
        //health = zero you lose 
        if (this.playerCfg.isHealthZero()){
            this.clearSprites(); 
            state = GameState.LOSE;
          }
        
        //when on textbox 11+ allow movement (pursuer has been explained and normal game logic applies)
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
        
        //run cutscene on textbox 7
        if (this.kbPressCount == 7) {
            this.runCutScene(this.player.x, this.player.y, 
                this.pursuer.x, this.pursuer.y);
            this.map.animate();
            this.textBox.show();
            return;
        }
        
        //cycle textboxes when space pressed
        if (this.kbPressCount < 11 && kb.pressed(' ')) {
            this.kbPressCount++;
            this.textBox = new SpeechBubble(
                this.player.x - 150, this.player.y - 100, 150, 75,
                this.player.x - 5, this.player.y - 10,
                this.textboxLookUp()
            );
        }


        this.setCamera(1, this.player.x, this.player.y);
        this.map.animate();
        camera.off();
        this.textBox.updatePosition(
            this.player.x - 150,
            this.player.y - 100,
            this.player.x - 5,
            this.player.y - 10
        );
        camera.on();
        this.textBox.show();
        

        //win condition passe
        if (finishLineCrossed){ 
            this.clearSprites();
            state = GameState.WIN;
            finishLineCrossed = false;
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
      if(this.pursuer){
        this.pursuer.remove();
      }
      this.map.removeSprites();
    }
}