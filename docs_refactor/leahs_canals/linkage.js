class linkage extends canalNetwork{
    constructor(origin, destination, outbound, inbound){
        super(null, null, null, null);
        this.origin = origin;
        this.destination = destination;
        this.outbound = outbound;
        this.inbound = inbound;

        //filled by "positionLink" which is called by the map after duplicate linkages are removed
        this.link = null;        
        this.bankSprites = null;
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

    getBankSprites(){return this.bankSprites}

    getDestination(){return this.destination;}

    getInbound(){return this.inbound;}

    getOrigin(){return this.origin;}

    getDestination(){return this.destination;}

    positionLink(){
        let valid = this.findValidLines();
        let redStart = valid[0][0];
        let redEnd = valid[0][1];
        let blackStart = valid[1][0];
        let blackEnd = valid[1][1];

        let link = new linker(redStart, redEnd, blackStart, blackEnd, this.outbound, this.inbound);
       

        this.link = link;
        this.link.createSprites();
        this.bankSprites = this.link.getBanks();

       

    }

    remove(){
        this.link.remove();
        this.bankSprites = [];
    }
}