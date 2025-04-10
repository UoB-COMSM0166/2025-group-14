class GamePlay {
    
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
        this.c1;
        this.c2;
        this.c3; 
        this.c4; 
        this.c5;
        this.network;
        this.boatAnimation = loadAnimation("Boat-redbrown.png", [
            [64, 64, 64, 32],
            [0, 0, 64, 32],
            [0, 64, 64, 32],
          ]);
        this.timer;
        this.healthbar;
    }

    setup() {
        // Pre-refactor setup
        /*
        //set the canvas size the first time when the program starts
        createCanvas(windowWidth, windowHeight, WEBGL);
        textFont(font);
        oldWindowWidth = windowWidth;
        oldWindowHeight = windowHeight;
        */
      
        // Post-refactor setup
        
          // world.gravity.y = 5;
         // Instantiate Timer (to time events that occur over time)
         this.timer = new Timer();
         this.timer.startTimer();

        this.centreCircle = new CentreCirlce();
      
        this.c1 = new canal(300, 2, 100); //right, up
        this.c2 = new canal(770, 4.5, 150); //right, down
        this.c3 = new lock(470, 7, 130); //left, down
        this.c4 = new canal(600, 10, 220); //left up
        this.c5 = new canal(400, 9, 60);
        this.network = new canalNetwork(-50, -350, [this.c1, this.c2, this.c3, this.c4, this.c5]);print("Canal network x and y:" + this.network.x + ", " + this.network.y);
        
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
      
    /*
        setup() {
            waterTileFrame = waterSpritesheet.get(0, 0, 16, 16);
            c1 = new canal(canalWidth, "Starter", 200, 300, 400, 450, waterTileFrame);
            c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600, waterTileFrame);
            c3 = new canal(
                canalWidth,
                "ThirdElement",
                200,
                500,
                550,
                620,
                waterTileFrame
            );
            c4 = new canal(canalWidth, "Uphill", 550, 400, 600, 100, waterTileFrame);
            c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150, waterTileFrame);
            c6 = new canal(canalWidth, "victory", 100, 150, 200, 300, waterTileFrame);
            c1.setConnections(c6, c2);
            c2.setConnections(c1, c3);
            c3.setConnections(c2, c4);
            c4.setConnections(c3, c5);
            c5.setConnections(c4, c6);
            c6.setConnections(c5, c1);
            // b = new boat(2, c1, 250, 200, 10, 20);
    
            //TODO: Create helper function or class in a separate file
            //TODO: called "loadSpriteSheet" that takes in the spritesheet and JSON file
            for (let frame of boatJson.frames) {
                let pos = frame.position;
                let img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
                boatFrames.push(img);
                let pursuerImg = pursuerBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
                pursuerBoatFrames.push(pursuerImg);
            }
    
            // Instantiate Timer (to time events that occur over time)
            timer = new Timer();
            timer.startTimer();
    
            //to create a player object you need x coordinate, y coordinate, mass of the boat, the boat speed limit, and the start canal
            player = new Player(
                160,
                320,
                5,
                3,
                c6,
                boatFrames,
                timer,
                playerMaxHealth,
                playerCollisionDamage,
                playerDamageOverTime
            );
    
            // Instantiate healthbar
            healthbar = new HealthBar(playerMaxHealth, player);
    
            // canal = new oldCanal(300, 100);
            pursuer = new Pursuer(100, 200, canal, 3, 0.3, pursuerBoatFrames);
    
        }
        */

    // Pre-refactor display
    /*
    display() {
        translate(-width / 2, -height / 2);
        ResizeCanvas();
        background(183, 233, 193);
        //background("lightblue");

        // For testing - comment out
        //timer.show();

        c1.visualize();
        c2.visualize();
        c3.visualize();
        c4.visualize();
        c5.visualize();
        c6.visualize();

        // b.visualize(); // visualising the Leah's boat

        // pursuer object appear and behaviour
        let steering = pursuer.arrive(player);
        pursuer.applyForce(steering);
        pursuer.update();
        pursuer.show();

        //to make the player model appear on the screen
        player.show(); // visualising Daniil's boat

        // display and update healthbar
        healthbar.draw();

        // Just for now, let's say that you lose when your health get to zero
        // and you win if I press the w key. Then, transition to win/lose screen.
        if (player.isHealthZero()){
            state = GameState.LOSE;
        }
        if (keyCode == 87){
            state = GameState.WIN;
        }

        // If player presses Esc key, go back to start screen
        if (keyCode == 27) {
            state = GameState.START_SCREEN;
        }
    }
    */

    // Post-refactor display
    display() {
        // clean the previous frame
        clear();

        // not necessarily sure what camera.on() does exactly, but if I touch it everything breaks
        camera.on();

        this.healthbar.draw();

        this.network.animate();


        this.playerCfg.camera();

        // coordinateGrid();

        this.playerCfg.movement();
        this.playerCfg.debug();

        this.pursuerCfg.update();

        this.mapConstructor();

        this.coordinateGrid();

        // // like with camera on, if I touch it, everything breaks
        // camera.off();

        // Game control flow logic
        // Just for now, let's say that you lose when your health get to zero
        // and you win if I press the w key. Then, transition to win/lose screen.
        if (this.playerCfg.isHealthZero()){
            this.clearSprites();
            state = GameState.LOSE;
        }
        if (keyCode == 87){
            this.clearSprites();
            state = GameState.WIN;
        }

        // If player presses Esc key, go back to start screen
        if (keyCode == 27) {
            this.clearSprites();
            state = GameState.START_SCREEN;
        }
    }

    clearSprites() {
        this.player.remove();
        this.pursuer.remove();
        this.centreCircle.remove();
        //canals
        /*
        this.c1.remove();
        this.c2.remove();
        this.c3.remove(); 
        this.c4.remove(); 
        this.c5.remove();
        */
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