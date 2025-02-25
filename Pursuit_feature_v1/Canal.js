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