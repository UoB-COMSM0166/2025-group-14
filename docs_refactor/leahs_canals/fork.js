class fork extends canal {
    constructor(length, oClock, width, player){
        super(length, oClock, width, player);
        this.near = null;
        this.far = null;
    }

    setForkPosition(start, end){
        console.log(this.start + "/" + this.end);
        let length = this.getHypotenuse(start, end);
        let mid = length/2;
        let near = mid - this.width/2;
        let far = mid + this.width/2;

        this.near = this.pointOnLine(start, end, near);
        this.far = this.pointOnLine(start, end, far);
    }

}