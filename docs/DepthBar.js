class DepthBar {
  //constructor(x, y, maxHealth, player) {
  constructor(isEmpty) {
    textAlign(LEFT);
    this.x;
    this.y;
    this.width = 100;
    this.height = 10;
    this.maxDepth = 100;
    this.depth;
    if (isEmpty) this.depth = 0;
    else this.depth = this.maxDepth;
  }

  draw(depthPercent, x, y) {
    // Update healthBar attributes
    this.update(depthPercent, x, y);

    // Text
    fill(0, 0, 0);
    textSize(12);
    textAlign(LEFT)
    //text("Healthbar: " + this.health, this.x, this.y - 10);
    let depthText;
    if (this.depth == 100) depthText = "FULL";
    else if (this.depth == 0) depthText = "EMPTY";
    else depthText = Math.round(this.depth).toString() + "%";
    text("Lock depth: " + depthText, this.x, this.y - 5);
  

    // Draw depth bar box
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(this.x, this.y, this.width, this.height);

    // Fill depth bar up to % depth of lock
    noStroke();
    fill("seagreen");
    rect(
      this.x,
      this.y,
      map(this.depth, 0, this.maxDepth, 0, this.width),
      this.height
    );
  }

  // Update depth based on lock filling/emptying
  update(depthPercent, x, y) {
    this.depth = depthPercent;
    this.x = x;
    this.y = y;
  }
}
