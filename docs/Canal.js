// PROVISIONAL!
// This canal object is JUST for testing compatability between Player and Pursuer core features. 
// It is just so that the Pursuer works (takes a Canal object as argument to define its boundaries currently;
// this can be modified as needed once the canal feature is merged)

class Canal {
    constructor(yMax, yMin) {
        this.top = yMin;
        this.bottom = yMax;
    }

    show() {
        stroke(255);
        strokeWeight(1);
        line(0, this.top, 400, this.top);
        line(0, this.bottom, 400, this.bottom);
    }
}
