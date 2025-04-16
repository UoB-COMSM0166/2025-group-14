class linkage extends linearConnect{
    constructor(origin, destination, outbound, inbound){
        super();
        this.origin = origin;
        this.destination = destination;
        this.outbound = this.setCanal(outbound);
        this.inbound = this.setCanal(inbound);

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

    determineTopLine(input){
        let start1 = [input[0][0][0], input[0][0][1]];
        let end1 = [input[0][1][0], input[0][1][1]];
        let start2 = [input[1][0][0], input[1][0][1]];
        let end2 = [input[1][1][0], input[1][1][1]];

        if(start1[1] <= start2[1]){
            return[start1, end1];
        }else{
            return[start2, end2];
        }
    }

    findValidLines(){
        let outExit = this.getCanalExits(this.outbound);
        let inExit = this.getCanalExits(this.inbound);

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

    getCanalExits(canal){
        if(canal.getConnections("next") === null){
            return[canal.getCoord("redEnd"), canal.getCoord("blackEnd")];
        }else if(canal.getConnections("prev") === null){
            return[canal.getCoord("redStart"), canal.getCoord("blackStart")];
        }else{
            throw new Error("Feature under construction, shouldn't have seen this bit yet");
        }
    }

    getDestination(){return this.destination;}

    getInbound(){return this.inbound;}

    getOrigin(){return this.origin;}

    getOutbound(){return this.outbound;}

    getDestination(){return this.destination;}

    positionLink(){
        this.setRedCoords();
        this.createLink();
        this.setBlackCoords();
        this.bestowCoords();
        this.createSprites();
        this.setBankSprites();
        this.outbound.rebuildToExit(this.link.getCoord("redStart"), this.link.getCoord("blackStart"));
        this.inbound.rebuildToExit(this.link.getCoord("redEnd"), this.link.getCoord("blackEnd"));
    }

    remove(){
        this.link.remove();
        this.bankSprites = [];
    }

    setCanal(input){
        input.setLink(this);
        return input;
    }

    setRedCoords(){
        let valid = this.findValidLines();
        let line = this.determineTopLine(valid);
        this.redCoords = [[line[0][0], line[0][1]], [line[1][0], line[1][1]]];
    }
}