class diversion extends canal{
    constructor(width, name, startX, startY, endX, endY, type){
        super(width, name, startX, startY, endX, endY);
        if(type != "out" && type != "in"){
            console.log("Diversion must be set as either in or out");
        }else{
            this.type = type;
        }
    }

    setConnections(before, after){
        this.before = before;
        this.after = after;
        if(this.before != null){
            if(this.type == "out"){
                this.setForkThreshold("before");
            }else{
                this.setBeforeThreshold();
            }
        }
        if(this.after != null){
            if(this.type == "in"){
                this.setForkThreshold("after");
            }else{
                this.setAfterThreshold();
            }
        }
    }

    setForkThreshold(input){
        let target;
        if(input === "before"){
            target = this.before.bankApproach();
        }else{
            target = this.after.bankApproach();
        }
        let topGrad = this.topBank.gradient;
        let topOff = this.topBank.offset;
        let bottomGrad = this.bottomBank.gradient;
        let bottomOff = this.bottomBank.offset;
        const x1 = linearIntersectX(topGrad, topOff, target.gradient, target.offset);
        const y1 = linearIntersectY(topGrad, topOff, target.gradient, target.offset);
        const x2 = linearIntersectX(bottomGrad, bottomOff, target.gradient, target.offset);
        const y2 = linearIntersectY(bottomGrad, bottomOff, target.gradient, target.offset);
        if(input === "before"){
            this.beforeThreshold = new bank(x2, y2, x1, y1);
        }else{
            this.afterThreshold = new bank(x1, y1, x2, y2);
        }

    }



}

