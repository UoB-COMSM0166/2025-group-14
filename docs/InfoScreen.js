// Source of duck assets: https://caz-creates-games.itch.io/ducky-3?download
// Creator: Caz Creates Games

class InfoScreen {

    constructor() {
        //this.duck = loadAni(
        //    'assets/ducky1.png',
        //    'assets/ducky2.png'
        //);
        
        this.duck = loadAni(
            'assets/duck_walk1.png',
            'assets/duck_walk2.png',
            'assets/duck_walk3.png',
            'assets/duck_walk4.png',
            'assets/duck_walk5.png',
            'assets/duck_walk6.png'
        );
        
        this.duck.frameDelay = 30;
        this.duck.scale = 3;
        
    }
    

    /*
    preload() {
        this.duck = new Sprite(0, 0, 30, 30, 'static');
        this.duck.spriteSheet = 'assets/ducky_3_spritesheet.png';
        //duck.anis.offset.x = 2;
        this.duck.anis.frameDelay = 8;
        this.duck.friction = 0;

        this.duck.addAnis({
            smallbounce: { row: 0, frames: 2 },
            waddle1: { row: 1, frames: 6 },
            bigbounce: { row: 2, frames: 5, frameDelay: 4 },
            waddle2: { row: 3, frames: 6 }
        });
        this.duck.changeAni('bigbounce');

        allSprites.pixelPerfect = true;
    }
       

    setup() {
        //duckAni = loadAni('assets/ducky_3_spritesheet.png', {
        //    width: 192, height: 128, frames: [0, 1]
        //});
        this.duck = loadAni(
            'assets/ducky1.png',
            'assets/ducky2.png'
        );
        this.duck.frameDelay = 10;
    }
         */

    display() {
        let instructionY = -180;
        let instructionX = -600;
        let instructionSpacing = 70; 
        let instructionBoxWidth = 1200;
        //background("lightblue");
        background(183, 233, 193);
        fill(0);
        
        let duckX = -450;
        let duckY = -270;
        let duckSpacing = 150;
        let numberOfDucks = 7;

        for (let i = 0; i < numberOfDucks; i++) {
            animation(this.duck, duckX+(i*duckSpacing), duckY);
        }
        //animation(this.duck, 0, -270);

        textSize(20)
        textAlign(LEFT);
        text("OH NO! One moment you were enjoying the peaceful idyll of life on the canal - just you, your narrowboat, and the occasional duck - and the next, you are being chased by [....]!", instructionX, instructionY, instructionBoxWidth);
        text("You must reach [...] without being caught! Use the arrow keys to navigate your boat along the canal.", instructionX, instructionY + instructionSpacing, instructionBoxWidth);
        text("But be careful: banging into the canal walls with cause your boat to take damage. Your boat may also take some damage over time.", instructionX, instructionY + (instructionSpacing*2), instructionBoxWidth);
        text("You can choose to stop and make repairs at any time by pressing the 'r' key...but watch out for the pursuer on your tail!", instructionX, instructionY + (instructionSpacing*3), instructionBoxWidth);
        text("Be warned: if your health reaches zero, you will be forced to stop until the repairs are complete. More substantial damage means a longer wait for repairs!", instructionX, instructionY + (instructionSpacing*4), instructionBoxWidth);
        text("One last thing: you can press [Esc] key at any time to go back to the Start Menu.", instructionX, instructionY + (instructionSpacing*5), instructionBoxWidth);
        
        textAlign(CENTER);
        textSize(30);
        stroke(3);
        text("Press [SPACE] to continue", 0, instructionY+(instructionSpacing*6.5));
        
        // Transition to gameplay screen when player presses the SPACE key
        if (state === GameState.INFO_SCREEN && keyCode == 32) {
          state = GameState.PLAY_GAME;
        }
    }
}