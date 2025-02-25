class Timer {
  constructor() {
    this.start = Date.now();
  }

  startTimer() {
    this.start = Date.now();
  }

  getTime() {
    return (Date.now() - this.start) / 1000;
  }

  // Returns true if the argument number of seconds has elapsed, false if not.
  hasElapsed(time = 3.0) {
    if (this.getTime() == time) return true;
    else return false;
  }

  show() {
    fill(0);
    text("Timer: " + this.getTime(), 600, 50);
  }
}
