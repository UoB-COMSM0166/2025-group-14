class fork extends canal {
    constructor(length, oClock, width){
        super(length, oClock, width);
    }

    createRedBank(){
        this.redBank = this.createBank(this.redStart, this.redEnd)
        this.redBank.colour = "green";
    }
}