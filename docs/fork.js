class fork extends canal{
    constructor(width, name, startX, startY, endX, endY){
        super(width, name, startX, startY, endX, endY);
        this.diversion = null;
        this.diversionThreshold = null;
    }

    setConnections(before, after, diversion){
        this.before = before;
        this.after = after;
        this.diversion = diversion;
        if(this.before != null){
            this.setBeforeThreshold();
        }
        if(this.after != null){
            this.setAfterThreshold();
        }
        if(this.diversion != null){
            this.setDiversionThreshold();
        }
    }

    setDiversionThreshold(){
        let target = this.diversion;
        let rupture = this.bankApproach();

        //using top and bottom makes sense now
        //but this strikes me as a likely place to come back and debug
        //yeah okay you definitely need to standardize how you're going to
        //angle your diversion threshold. other than that this seems weirdly close to working?
        //note also that before and after thresholds seem to be flipped from one another
        //I think 1 is before 2 here because a diversion is a kind of after?
        //leah thiS IS YOR FUCKING CODE

        let targTop = target.topBank;
        let targBottom = target.bottomBank;

        let ruptureGrad = rupture.gradient;
        let ruptureOff = rupture.offset;

        const x1 = linearIntersectX(ruptureGrad, ruptureOff, targTop.gradient, targTop.offset);
        const y1 = linearIntersectY(ruptureGrad, ruptureOff, targTop.gradient, targTop.offset);
        const x2 = linearIntersectX(ruptureGrad, ruptureOff, targBottom.gradient, targBottom.offset);
        const y2 = linearIntersectY(ruptureGrad, ruptureOff, targBottom.gradient, targBottom.offset);
        this.diversionThreshold = new bank(x1, y1, x2, y2);

        this.diversion.bottomBank.setBeforeIntersect(x2, y2);
        this.diversion.topBank.setBeforeIntersect(x1, y1);
    }

    bankApproach(){
        return this.blackBank
    }

    
    thresholdCheck(x, y){
        if(this.after != null){
            if(this.afterThreshold.checkCross(x, y)){
                console.log("Swap forward!");
                return this.after;
            }
    
        }
        if(this.before != null){
            if(this.beforeThreshold.checkCross(x, y)){
                console.log("Swap backward!");
                return this.before;
            }
    
        }
        if(this.diversion != null){
            if(this.diversionThreshold.checkCross(x, y)){
                console.log("Swap to the diversion!");
                return this.diversion;
            }
        }
        return null;
    }

}