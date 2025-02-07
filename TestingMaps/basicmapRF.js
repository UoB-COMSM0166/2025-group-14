class canal{
    constructor(width, color, startX, startY, endX, endY){
        this.width = width;
        this.colour = color;
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
        this.redBank.visualize;
        stroke("black");
        this.blackBank.visualize;
 
 
    }

    setConnections(before, after){
        this.before = before;
        this.after = after;
        if(this.before != null){
            this.setBeforeThreshold();
        }
        if(this.after != null){
            this.setAfterThreshold
        }
    }


}

class bank{
    constructor(startX, startY, endX, endY,){
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.gradient = gradient(startX, startY, endX, endY);
        this.offset = offset(gradient, startX, startY);
    }

    visualize(){
        line(this.startX, this.startY, this.endX, this.endY);

    }


}


class boat{
    constructor(canal, size, speed){
        this.canal = canal;
        this.size = size;
        this.speed = speed;
        this.afterThresholdGrad = null;
        this.afterThresholdOffset = null;
        this.beforeThresholdGrad = null;
        this.beforeThresholdOffset = null;

        //starting position
        let a = angleCalc(canal.redBankStartX, canal.redBankStartY, canal.redBankEndX, canal.redBankEndY);
        let opp = Math.sin(a) * this.canal.width;
        let adj = Math.cos(a) * this.canal.width;

        this.x = canal.redBankStartX + (opp/2);
        this.y = canal.redBankStartY + (adj/2);
        if(this.canal.after != null){
            this.setThreshold(this.canal.after);
        }
        if(this.canal.before != null){
            this.setThreshold(this.canal.before);
        }

    }

    setThreshold(inp){
        let target;
        let current = this.canal;
        if(this.canal.after != null && this.canal.after === inp){
            target = this.canal.after;
        }
        if(this.canal.before != null && this.canal.before === inp){
            target = this.canal.before;
        }

        let currentGrad = current.redBank.gradient;
        let currentOff = current.redBank.offset;
        let targGrad = target.redBank.gradient;
        let targOff = target.redBank.offset;

        const x1 = linearIntersectX(currentGrad, currentOff, targGrad, targOff);
        const y1 = linearIntersectY(currentGrad, currentOff, targGrad, targOff);

        currentGrad = current.blackBank.gradient;
        currentOff = current.blackBank.offset;
        targGrad = target.blackBank.gradient;
        targOff = target.blackBank.offset;

        const x2 = linearIntersectX(currentGrad, currentOff, targGrad, targOff);
        const y2 = linearIntersectY(currentGrad, currentOff, targGrad, targOff);

        if(this.canal.after != null && this.canal.after === inp){
            this.afterThresholdGrad = gradient()
        }
        if(this.canal.before != null && this.canal.before === inp){
            target = this.canal.before;
        }
        

    }


    setAfterThreshold(){
        if(this.canal.after != null){
            let after = this.canal.after;
            let current = this.canal;
            const LIX = linearIntersectX(current.blackBankGrad, current.blackBankOffset, after.blackBankGrad, after.blackBankOffset);
            const LIY = linearIntersectY(current.blackBankGrad, current.blackBankOffset, after.blackBankGrad, after.blackBankOffset);
            console.log("lix " + LIX);
            console.log(LIY);
            this.afterThresholdGrad = gradient(LIX, LIY, current.redBankEndX, current.redBankEndY);
            this.afterThresholdOffset = -1 * ((this.afterThresholdGrad * LIX) - LIY);
            console.log("THG " + this.afterThresholdGrad);
            console.log("THO " + this.afterThresholdOffset)


        }
    }

}




//general functions
function angleCalc(startX, startY, endX, endY){
    let opp = endY - startY;
    let adj = startX-endX;
    let tanoutp = opp/adj;
    return Math.atan(tanoutp);

} 

function gradient(x1, y1, x2, y2){
    const numer = y2-y1;
    const denom = x2-x1;
    const outp = numer/denom;
    return outp;
}

function linearIntersectX(a1, c1, a2, c2){
    return ((-1*c2) + c1)/((-1*a1) + a2);


}

function linearIntersectY(a1, c1, a2, c2){
    return ((c1*a2) - (c2*a1))/((-1*a1)+a2);
}

function offset(gradient, X, Y){
    return -1 * ((gradient * X) - Y);
}