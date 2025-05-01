class StartScreen {
    constructor() {
      this.startButton = new Button("Start Game", windowWidth/2, windowHeight/2 + 100, 'seagreen', 30, this.startButtonClick.bind(this));
      this.audioButton = new Button("Sound", windowWidth*7/8, windowHeight*1/8, 'seagreen', 20, this.soundButtonClick.bind(this));
      this.bg = loadImage("assets/StartScreenBg/bg.png");
      this.font = null;
      loadFont("assets/fonts/Kaph-Regular.ttf", (font) => {
        this.font = font;
      });
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        image(this.bg, 0, 0, windowWidth, windowHeight);
        this.startButton.show(); 
        this.audioButton.show();
        if (soundOn) {
          this.audioButton.setLabel("Sound on");
        } else {
          this.audioButton.setLabel("Sound off");
        }
        let centerX = windowWidth/2;
        let centerY = windowHeight/2;
        fill(255, 255, 255);
        textSize(20);
        stroke(2);
        textAlign(CENTER);
        if(this.font) {
          textFont(this.font);
        }
        text("Welcome to", centerX, centerY-100);
        textSize(50);
        stroke(4);
        text("NARROWBOAT CHASE!", centerX, centerY);
        textSize(20);
        stroke(2);
        //update position of button in case of resizing
        this.startButton.setPosition(windowWidth / 2, windowHeight / 2 + 150);
        this.audioButton.setPosition(windowWidth*7/8, windowHeight*1/8);
    }

    // Transition to map selection screen when player clicks on start button
    startButtonClick() {
      console.log("Button clicked!");
      this.startButton.hide();
      this.audioButton.hide();
      if (state === GameState.START_SCREEN) {
        state = GameState.MAP_SELECTION_SCREEN;
      }
  }

  soundButtonClick() {
    if(soundOn) {
      soundOn = false;
    } else {
      soundOn = true;
    }
  }
}