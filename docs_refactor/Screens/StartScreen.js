class StartScreen {

    constructor() {
      this.levelButton = new Button("LEVELS", windowWidth/2, windowHeight/2 + 150, 'seagreen', 30, this.buttonClick());
    }

    display() {
        new Canvas(windowWidth, windowHeight);
        this.startButton.show(); 
        //background("lightblue");
        let centerX = windowWidth/2;
        let centerY = windowHeight/2;
        background(183, 233, 193);
        fill(0);
        textSize(20);
        stroke(2);
        textAlign(CENTER);
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