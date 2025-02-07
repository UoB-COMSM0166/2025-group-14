class canal{
    constructor(width, name, startX, startY, endX, endY){
        this.width = width;
        this.name = name;
        this.redBank = new bank(startX, startY, endX, endY);
 

        //calculate angle and derrive other bank
        let a = angleCalc(startX, startY, endX, endY);
        this.opp = Math.sin(a) * width;
        this.adj = Math.cos(a) * width;

        this.blackBank = new bank(startX + this.opp, startY + this.adj, endX + this.opp, endY + this.adj);

        this.before = null;
        this.after = null; 
        this.beforeThreshold;
        this.afterThreshold;
    }

    visualize(){
        stroke("red");
        this.redBank.visualize();
        stroke("black");
        this.blackBank.visualize();
 
 
    }

    setConnections(before, after){
        this.before = before;
        this.after = after;
        if(this.before != null){
            this.setBeforeThreshold();
        }
        if(this.after != null){
            this.setAfterThreshold();
        }
    }

    setBeforeThreshold(){
        let target = this.before;
        let targRed = target.redBank;
        let targBlack = target.blackBank;
        let redGrad = this.redBank.gradient;
        let redOff = this.redBank.offset;
        let blackGrad = this.blackBank.gradient;
        let blackOff = this.blackBank.offset;
        const x1 = linearIntersectX(redGrad, redOff, targRed.gradient, targRed.offset);
        const y1 = linearIntersectY(redGrad, redOff, targRed.gradient, targRed.offset);
        const x2 = linearIntersectX(blackGrad, blackOff, targBlack.gradient, targBlack.offset);
        const y2 = linearIntersectY(blackGrad, blackOff, targBlack.gradient, targBlack.offset);
        this.beforeThreshold = new bank(x1, y1, x2, y2);

        this.redBank.setBeforeIntersect(x1, y1);
        this.blackBank.setBeforeIntersect(x2, y2);


    }

    setAfterThreshold(){
        let target = this.after;
        let targRed = target.redBank;
        let targBlack = target.blackBank;
        let redGrad = this.redBank.gradient;
        let redOff = this.redBank.offset;
        let blackGrad = this.blackBank.gradient;
        let blackOff = this.blackBank.offset;
        const x1 = linearIntersectX(redGrad, redOff, targRed.gradient, targRed.offset);
        const y1 = linearIntersectY(redGrad, redOff, targRed.gradient, targRed.offset);
        const x2 = linearIntersectX(blackGrad, blackOff, targBlack.gradient, targBlack.offset);
        const y2 = linearIntersectY(blackGrad, blackOff, targBlack.gradient, targBlack.offset);
        this.afterThreshold = new bank(x1, y1, x2, y2);
        
        this.redBank.setAfterIntersect(x1, y1);
        this.blackBank.setAfterIntersect(x2, y2);

        


    }


}