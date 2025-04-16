class linker extends canal{
    constructor(redStart, redEnd, blackStart, blackEnd, origin, destination){
        super(null, null, null, origin.getPlayer());
        this.setCoords(redStart, blackStart, redEnd, blackEnd);
        this.connect(origin, destination);
        console.log("coord: " + this.blackEnd)
    }

    setDirectionalAttributes(){
        //dummy function used to avoid a NAN error in the super constructor
        //if these become necessary let Leah know
        this.xChange =  null;
        this.yChange = null;
        this.xWidth =  null;
        this.yWidth = null;
    }
}