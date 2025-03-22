class LeonSprite {
  constructor(x, y, frames, speed = 0.05) {
    this.x = x;
    this.y = y;
    this.frames = frames;
    this.currentFrame = 0;
    this.speed = speed;
    this.index = 0;
    this.numFrames = this.frames.length;
    this.width = this.frames[0].width;
    this.height = this.frames[0].height;
  }

  updateAnimation(altSpeed) {
    if (altSpeed) {
      this.speed = altSpeed;
    }
    // Increment the index by the speed.
    // Speed is used to dictate the number of frames (still images)
    // that we want to jump by each time; this is what creates the animation effect    this.index += this.speed;
    this.index += this.speed;
    // Round the index to the nearest whole number
    this.currentFrame = floor(this.index) % this.numFrames;
  }

  displayAnimation() {
    this.updateAnimation();
    image(
      this.frames[this.currentFrame],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
