class StartScreen {
    constructor() {
      this.startButton = new Button("Start Game", windowWidth/2, windowHeight/2 + 150, 'seagreen', 30, this.buttonClick.bind(this));
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
    }

    // Transition to map selection screen when player clicks on start button
    buttonClick() {
      console.log("Button clicked!");
      this.startButton.hide();
      if (state === GameState.START_SCREEN) {
        state = GameState.MAP_SELECTION_SCREEN;
      }
  }
}