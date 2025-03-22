class GamePlay {
    constructor() {

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

    display() {
        translate(-width / 2, -height / 2);
        ResizeCanvas();
        background(128);
        //background("lightblue");

        // For testing - comment out
        //timer.show();


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
    }
}