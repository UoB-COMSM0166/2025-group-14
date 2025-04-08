class Timer {
    constructor() {
      this.start = Date.now();
      this.timing = false;
    }

    // Returns true if the timer has started. false otherwise
    isStarted() {
      return this.timing;
    }
  
    startTimer() {
      this.start = Date.now();
      this.timing = true;
    }

    resetTimer() {
      this.start = Date.now();
      this.timing = false;
    }
  
    getTime() {
      return (Date.now() - this.start) / 1000;
    }
  
    // Returns true if the argument number of seconds has elapsed, false if not.
    hasElapsed(time) {
      if (this.getTime() >= time) return true;
      else return false;
    }

  show() {
    fill(0);
    text("Timer: " + this.getTime(), 600, 50);
  }
}
