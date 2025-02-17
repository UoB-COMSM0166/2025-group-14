class Sprite {
  constructor(x, y, animation, speed) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.speed = speed;
    this.length = this.animation.length;
    this.width = this.animation[0].width;
    this.index = 0;
  }

  show() {
    // Round the index to the nearest whole number
    let index = floor(this.index) % this.length;
    image(this.animation[index], this.x, this.y);
  }

  animate() {
    // Increment the index by the speed.
    // Speed is used to dictate the number of frames (still images)
    // that we want to jump by each time; this is what creates the animation effect
    this.index += this.speed;
  }
}
