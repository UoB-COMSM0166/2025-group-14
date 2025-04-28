class linkage extends linearConnect{
    constructor(origin, destination, outbound, inbound, map, lock, lockDetails){
        super();
        this.origin = origin;
        this.destination = destination;
        this.outbound = this.setCanal(outbound);
        this.inbound = this.setCanal(inbound);
        this.lock = lock;
        this.lockDetails = lockDetails;

        this.map = map;

        this.linkWidth = Math.min(outbound.getWidth(), inbound.getWidth());

        //filled by "positionLink" which is called by the map after duplicate linkages are removed
        this.link = null;   
        this.outBank = null;
        this.outCoords = null;
        this.inBank = null;
        this.inCoords = null;
    }

    adjustCoords(){
        let linkGrad = this.link.getGradient();
        let lROff = this.link.getOffset("red");
        let lBOff = this.link.getOffset("black");

        let outGrad = this.outbound.getGradient();
        let outOff = this.outbound.getOffset(this.outBank);

        let inGrad = this.inbound.getGradient();
        let inOff = this.inbound.getOffset(this.inBank);

        let redStart = linearIntersect(linkGrad, lROff, outGrad, outOff);
        let redEnd = linearIntersect(linkGrad, lROff, inGrad, inOff);
        let blackStart = linearIntersect(linkGrad, lBOff, outGrad, outOff);
        let blackEnd = linearIntersect(linkGrad, lBOff, inGrad, inOff);

        this.redCoords = [redStart, redEnd];
        this.blackCoords = [blackStart, blackEnd];


    }
    
    animate(){
        this.forAllCanals(canal => canal.animate());
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
       console.log("Duplicate linkage identified")
        return true;
    }

    createLink(){
        let start = this.redCoords[0];
        let end = this.redCoords[1];
        let angle = angleCalc(start[0], start[1], end[0], end[1], true, true, true);

        let length = getHypotenuse(start, end);
        let oClock = angleToClock(angle);
        let width = this.linkWidth;
        let player = this.outbound.getPlayer();
        if(this.lock){
            console.log("lockdetails 2: " + this.lockDetails[2])
            this.link = new lock(length, oClock, width, player, this.lockDetails[0], this.lockDetails[1], this.lockDetails[2]);
        }else{
            this.link = new canal(length, oClock, width, player);
        }
        this.link.connect(this.outbound, this.inbound)
    }

    determineTopLine(input){
        let start1 = [input[0][0][0], input[0][0][1]];
        let end1 = [input[0][1][0], input[0][1][1]];
        let start2 = [input[1][0][0], input[1][0][1]];
        let end2 = [input[1][1][0], input[1][1][1]];

        if(start1[1] <= start2[1]){
            return [start1, end1];
        }else{
            return [start2, end2];
        }
    }

    facingBanks(){
        let rsO = this.outbound.getCoord("redStart");
        let bsO = this.outbound.getCoord("blackStart");
        let rsI = this.inbound.getCoord("redStart");
        let bsI = this.inbound.getCoord("blackStart");


        let rhO = halfwayPoint(rsO, this.outbound.getCoord("redEnd"));
        let bhO = halfwayPoint(bsO, this.outbound.getCoord("blackEnd"));
        let rhI = halfwayPoint(rsI, this.inbound.getCoord("redEnd"));
        let bhI = halfwayPoint(bsI, this.inbound.getCoord("blackEnd"));

        let rs2rs = getHypotenuse(rhO, rhI);
        let rs2bs = getHypotenuse(rhO, bhI);
        let bs2bs = getHypotenuse(bhO, bhI);
        let bs2rs = getHypotenuse(bhO, rhI);

        let min = Math.min(rs2rs, rs2bs, bs2bs, bs2rs);
        switch(min){
            case rs2rs:
                this.outBank = "red";
                this.inBank = "red";
                break;
            case rs2bs:
                this.outBank = "red";
                this.inBank = "black";
                break;
            case bs2bs:
                this.outBank = "black";
                this.inBank = "black";
                break;
            case bs2rs:
                this.outBank = "black";
                this.inBank = "red";
                break;
            default:
                throw new Error("FacingBanks switch statement error, contact Leah");
        }



    }

    findExitPoints(){
 
        let outStart = this.outbound.getCoord(this.outBank.concat("Start"));
        let outEnd = this.outbound.getCoord(this.outBank.concat("End"));
        
        let inStart = this.inbound.getCoord(this.inBank.concat("Start"));
        let inEnd = this.inbound.getCoord(this.inBank.concat("End"));
        let inPoint = halfwayPoint(this.inbound.getCoord(this.inBank.concat("Start")), inEnd);
        let outPoint = halfwayPoint(outStart, outEnd);
        if(!this.map.clearRoute(inPoint, outPoint)){
            this.outPoint = outPoint;
            this.inPoint = inPoint
            return [outPoint, inPoint];
        }
        /*for(let i = this.linkWidth; i < this.outbound.getLength(); i++){
            let outPoint = this.segmentPosition2(i, this.outbound, outBank, "Start");
            if(!this.map.clearRoute(inPoint, outPoint)){
                return [outPoint, inPoint];      
            }
        }*/
        throw new Error("no way to link two networks without crossing a line.");
    }

   /* //condemned I hope
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
        
        console.log("outexit: " + outExit[0]);

        if(!checkCrossBetweenBounds(lineOne, lineTwo)){
            return [[outExit[0], inExit[1]], [outExit[1], inExit[0]]];
        }

        throw new Error("findValidLines error; message Leah and tell her that her maths is off")
    }*/

    
    forAllCanals(callback){
        callback(this.link)
    }


    getBankSprites(){return this.bankSprites}

    getCanalExits(canal){
        if(canal.getConnections("next") === null){
            return [canal.getCoord("redEnd"), canal.getCoord("blackEnd")];
        }else if(canal.getConnections("prev") === null){
            return [canal.getCoord("redStart"), canal.getCoord("blackStart")];
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
        this.facingBanks();
        this.findExitPoints();
        this.setRedCoords();
        this.createLink();
        this.setBlackCoords();

        //set coords once to get the gradient and offset, then adjust and reset before creating sprites!
        this.bestowCoords();
        this.adjustCoords();
        this.bestowCoords();

        this.createSprites();
        this.setBankSprites();
        this.rebuildBanks();

        //this.outbound.rebuildToExit(this.link.getCoord("redStart"), this.link.getCoord("blackStart"));
        //this.inbound.rebuildToExit(this.link.getCoord("redEnd"), this.link.getCoord("blackEnd"));
    }

    rebuildBanks(){
        this.outbound.removeOneBank(this.outBank);
        this.inbound.removeOneBank(this.inBank);

        this.outbound.rebuildBank(this.outBank, this.redCoords[0], this.blackCoords[0]);
        this.inbound.rebuildBank(this.inBank, this.redCoords[1], this.blackCoords[1]);
    }

    remove(){
        this.link.remove();
        this.bankSprites = [];
    }

    segmentPosition2(x, canal, bank, pos){
        let width = this.width;
        let grad = canal.getGradient();
        let off = canal.getOffset(bank);
        let coord = canal.getCoord(bank.concat(pos));
        let second = x + this.linkWidth;
        if(canal.getDirection()[0] === "left"){
            x *= -1;
            second *= -1;
        }

        let xOne = x + coord[0];
        let yOne = (xOne * grad) + off;
        return [xOne, yOne];

    }

    //condemned assuming your current attempt works
    segmentPosition(x, canal, bank, pos){
        let width = this.width;
        let grad = canal.getGradient();
        let off = canal.getOffset(bank);
        let coord = canal.getCoord(bank.concat(pos));
        let second = x + this.linkWidth;
        if(canal.getDirection()[0] === "left"){
            x *= -1;
            second *= -1;
        }

        let xOne = x + coord[0];
        let yOne = (xOne * grad) + off;

        let xTwo = second + coord[0];
        let yTwo = (xTwo * grad) + off;
        return [[xOne, yOne], [xTwo, yTwo]];
    }

    setCanal(input){
        input.setLink(this);
        return input;
    }

    setRedCoords(){
        //let valid = this.findValidLines(banks);
        //let line = this.determineTopLine(valid);
        //this.redCoords = [[line[0][0], line[0][1]], [line[1][0], line[1][1]]];
        //this.redCoords = [[points[0][0], points[0][1]] , [points[1][0], points[1][1]]];
        this.redCoords = [this.outPoint, this.inPoint];
    }
}