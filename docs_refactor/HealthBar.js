class HealthBar {
  //constructor(x, y, maxHealth, player) {
  constructor( maxHealth, player) {
    textAlign(LEFT);
    this.x = player.playerSprite.x - (windowWidth/2)+20;
    this.y = player.playerSprite.y - (windowHeight/2)+20;
    this.width = 300;
    this.height = 20;
    this.health = maxHealth;
    this.maxHealth = maxHealth;
    this.playerBoat = player;
  }

  draw() {
    // Update healthBar attributes
    this.update();

    // Text
    fill(0, 0, 0);
    textSize(15);
    textAlign(LEFT)
    //text("Healthbar: " + this.health, this.x, this.y - 10);
    text("Healthbar: " + this.health, this.playerBoat.playerSprite.x-(windowWidth/2)+20, this.playerBoat.playerSprite.y - (windowHeight/2));

    // Draw empty health bar box
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(this.x, this.y, this.width, this.height);

    // Fill health bar up to health
    noStroke();
    fill(255, 0, 0); // red
    rect(
      this.x,
      this.y,
      map(this.health, 0, this.maxHealth, 0, this.width),
      this.height
    );
  }

  // Update health based on player
  update() {
    this.health = this.playerBoat.health;
    // Move with playerBoat
    this.x = this.playerBoat.playerSprite.x - (windowWidth/2)+20;
    this.y = this.playerBoat.playerSprite.y - (windowHeight/2)+20;
  }
}
