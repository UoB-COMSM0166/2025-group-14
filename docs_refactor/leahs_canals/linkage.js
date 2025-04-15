class linkage{
    constructor(origin, destination, outbound, inbound){
        this.origin = origin;
        this.destination = destination;
        this.outbound = outbound;
        this.inbound = inbound;

        //filled by "positionLink" which is called by the map after duplicate linkages are removed
        this.link = null;        
        this.bankSprites = [];
    }

    checkInverse(input){
        /*SIGNIFICANTLY bodged because comparing nonprimitive types in Js is haaard
        will de-bodgeif this becomes loadbearing*/

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

    determineLength(validLines){
        let start = validLines[0];
        let end = validLines[1];
        let angle = angleCalc(start[0], start[1], end[0], end[1], true, true, true)

    }

    findValidLines(){
        let outExit = this.outbound.getExits();
        let inExit = this.inbound.getExits();

        let lineOne = [outExit[0][0], outExit[0][1], inExit[0][0], inExit[0][1]];
        let lineTwo = [outExit[1][0], outExit[1][1], inExit[1][0], inExit[1][1]];

        if(!checkCrossBetweenBounds(lineOne, lineTwo)){
            return [outExit[0], inExit[0]];
        }

        lineOne = [outExit[0][0], outExit[0][1], inExit[1][0], inExit[1][1]];
        lineTwo = [outExit[1][0], outExit[1][1], inExit[0][0], inExit[0][1]];

        if(!checkCrossBetweenBounds(lineOne, lineTwo)){
            return [outExit[0], inExit[1]];
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
        console.log("valid: " + valid);
        let test = new Sprite(valid)
        test.colour = "seagreen";
        let length = this.determineLength(valid);
        /*let oClock = determineOClock(valid);
        let width = determineWidth(valid);
        let player = this.origin.getPlayer();
        let finish = false;
        this.link = new canal(length, oClock, width, player, finish);

        this.amendCoords();
        this.amendSprites();*/
        //remember that second one involves pushing to the banksprites object

    }
}