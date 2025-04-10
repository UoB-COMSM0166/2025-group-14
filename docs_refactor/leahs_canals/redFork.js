class redFork extends fork{
    constructor(length, oClock, width){
        super(length, oClock, width);
    }

    createRedBank(){
        const half = this.halfwayPoint(this.redStart, this.redEnd);
        //const circle = new Sprite(half[0], half[1], 50)
        this.redBank = this.createBank(this.redStart, this.redEnd)
        this.redBank.colour = "red";
    }

}