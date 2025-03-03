class diversion extends canal{
    constructor(width, name, startX, startY, endX, endY){
        super(width, name, startX, startY, endX, endY);
    }

    setBeforeThreshold(){
        let target = this.before.bankApproach();
        let topGrad = this.topBank.gradient;
        let topOff = this.topBank.offset;
        let bottomGrad = this.bottomBank.gradient;
        let bottomOff = this.bottomBank.offset;
        const x1 = linearIntersectX(topGrad, topOff, target.gradient, target.offset);
        const y1 = linearIntersectY(topGrad, topOff, target.gradient, target.offset);
        const x2 = linearIntersectX(bottomGrad, bottomOff, target.gradient, target.offset);
        const y2 = linearIntersectY(bottomGrad, bottomOff, target.gradient, target.offset);
        this.beforeThreshold = new bank(x2, y2, x1, y1);



    }

}

