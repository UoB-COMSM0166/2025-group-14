//a one-canal version of the network designed to be created by maps to link two networks
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

        //filled by "positionLink" which is called by the map during setup
        this.link = null;   
        this.outBank = null;
        this.outCoords = null;
        this.inBank = null;
        this.inCoords = null;
    }

    adjustCoords(){
        //coordinates need to be adjusted during development as other canal details are calculated
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

    createLink(){
        //creates a new canal object that links the two linked canals by their respective halfway points
        let start = this.redCoords[0];
        let end = this.redCoords[1];
        let angle = angleCalc(start[0], start[1], end[0], end[1], true, true, true);

        let length = getHypotenuse(start, end);
        let oClock = angleToClock(angle);
        let width = this.linkWidth;
        let player = this.outbound.getPlayer();
        if(this.lock){
            this.link = new Lock(length, oClock, width, player, this.lockDetails[0], this.lockDetails[1], this.lockDetails[2]);
        }else{
            this.link = new Canal(length, oClock, width, player);
        }
        this.link.connect(this.outbound, this.inbound)
    }

    facingBanks(){
        //determines which side of the two canals being connected to attach the link to
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
        //determines where in the two linked canals the link should connect to
 
        let outStart = this.outbound.getCoord(this.outBank.concat("Start"));
        let outEnd = this.outbound.getCoord(this.outBank.concat("End"));
        
        let inStart = this.inbound.getCoord(this.inBank.concat("Start"));
        let inEnd = this.inbound.getCoord(this.inBank.concat("End"));
        let inPoint = halfwayPoint(this.inbound.getCoord(this.inBank.concat("Start")), inEnd);
        let outPoint = halfwayPoint(outStart, outEnd);
        this.outPoint = outPoint;
        this.inPoint = inPoint
        return [outPoint, inPoint];
    }
    
    forAllCanals(callback){
        callback(this.link)
    }


    getBankSprites(){return this.bankSprites}

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

    setCanal(input){
        input.setLink(this);
        return input;
    }

    setRedCoords(){
        this.redCoords = [this.outPoint, this.inPoint];
    }
}