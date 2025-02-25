class HealthBar {
    constructor (x, y, maxHealth, player) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 10;
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.playerBoat = player;
    }

    draw() {
        // Update healthBar attributes
        this.update();

        // Text 
        text("Healthbar: " + this.health, this.x, this.y - 4);

        // Draw empty health bar box
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(this.x, this.y, this.width, this.height);

        // Fill health bar up to health
        noStroke();
        fill(255, 0, 0); // red
        rect(this.x, this.y, map(this.health, 0, this.maxHealth, 0, this.width), this.height);
    }

    // Update health based on player
    update() {
        this.health = this.playerBoat.health;
    }
}