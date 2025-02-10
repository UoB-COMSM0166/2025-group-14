class Canal {
  constructor(yMax, yMin) {
    this.top = yMin;
    this.bottom = yMax;
  }

  draw() {
    stroke(255);
    strokeWeight(1);
    line(0, this.top, windowWidth, this.top);
    line(0, this.bottom, windowWidth, this.bottom);
  }
}
