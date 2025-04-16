class linkage extends linearConnect{
    constructor(origin, destination, outbound, inbound){
        super();
        this.origin = origin;
        this.destination = destination;
        this.outbound = outbound;
        this.inbound = inbound;

        //filled by "positionLink" which is called by the map after duplicate linkages are removed
        this.link = null;   
        this.bankSprites = null;
    }

    bestowCoords(){
        let red = this.redCoords[0];
        let black = this.blackCoords[0];
        let nextRed = this.redCoords[1];
        let nextBlack = this.blackCoords[1];
        this.link.setCoords(red, black, nextRed, nextBlack);
    }

    checkInverse(input){
        /*SIGNIFICANTLY bodged because comparing nonprimitive types in Js is haaard
        will de-bodge if this becomes loadbearing*/

        if(this.origin.getStartCoords()[0] != input.destination.getStartCoords()[0]){
            return false;
        }
        /*
        if(this.destination != input.getOrigin){
            return false;
        }
        if(this.outbound != input.inbound){
            return false;
        }
        if(this.inbound != input.outbound){
            return false;
        }*/
        return true;
    }

    createLink(){
        let start = this.redCoords[0];
        let end = this.redCoords[1];
        let angle = angleCalc(start[0], start[1], end[0], end[1], true, true, true);

        let length = getHypotenuse(start, end);
        let oClock = angleToClock(angle);
        let width = this.outbound.getWidth();
        let player = this.outbound.getPlayer();
        this.link = new canal(length, oClock, width, player);
    }

    determineLength(){
        
    }

    findValidLines(){
        let outExit = this.outbound.getExits();
        let inExit = this.inbound.getExits();

        let lineOne = [outExit[0][0], outExit[0][1], inExit[0][0], inExit[0][1]];
        let lineTwo = [outExit[1][0], outExit[1][1], inExit[1][0], inExit[1][1]];

        if(!checkCrossBetweenBounds(lineOne, lineTwo)){
            return [[outExit[0], inExit[0]], [outExit[1], inExit[1]]];
        }

        lineOne = [outExit[0][0], outExit[0][1], inExit[1][0], inExit[1][1]];
        lineTwo = [outExit[1][0], outExit[1][1], inExit[0][0], inExit[0][1]];

        if(!checkCrossBetweenBounds(lineOne, lineTwo)){
            return [[outExit[0], inExit[1]], [outExit[1], inExit[0]]];
        }

        throw new Error("findValidLines error; message Leah and tell her that her maths is off")
    }

    
    forAllCanals(callback){
        callback(this.link)
    }


    getBankSprites(){return this.bankSprites}

    getDestination(){return this.destination;}

    getInbound(){return this.inbound;}

    getOrigin(){return this.origin;}

    getDestination(){return this.destination;}

    positionLink(){
        this.setRedCoords();
        this.createLink();
        this.setBlackCoords();
        this.bestowCoords();
        this.createSprites();
        
        this.setBankSprites();

        console.log("Wait, that worked?")


        /*let valid = this.findValidLines();
        let redStart = valid[0][0];
        let redEnd = valid[0][1];
        let blackStart = valid[1][0];
        let blackEnd = valid[1][1];

        let link = new linker(redStart, redEnd, blackStart, blackEnd, this.outbound, this.inbound);
       

        this.link = link;
        this.link.createSprites();
        this.bankSprites = this.link.getBanks();*/

    }

    remove(){
        this.link.remove();
        this.bankSprites = [];
    }

    setRedCoords(){
        let valid = this.findValidLines();
        this.redCoords = [[valid[0][0][0], valid[0][0][1]], [valid[0][1][0], valid[0][1][1]]];
    }
}