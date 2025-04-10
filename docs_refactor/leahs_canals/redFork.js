class redFork extends fork{
    constructor(length, oClock, width, player){
        super(length, oClock, width, player);
    }

    createRedBank(){
        this.setForkPosition(this.redStart, this.redEnd);
        const circle = new Sprite(this.near[0], this.near[1], 50);
        this.redBank = this.createBank(this.redStart, this.redEnd)
        this.redBank.colour = "red";

        
    }


}