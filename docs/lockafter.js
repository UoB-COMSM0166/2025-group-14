class lockafter extends lockcomponent{
    getUpperLimit(x){
        let tbLimit = limitY(x, this.topBank.gradient, this.topBank.offset);
        let bthreshLimit;
        if(this.beforeThreshold.verticalFacing === "up" && this.before.level != "full"){
            bthreshLimit = limitY(x, this.beforeThreshold.gradient, this.beforeThreshold.offset);
            let outp = Math.max(tbLimit, bthreshLimit);
            return outp;
        }else{
            return tbLimit;
        }
    }
    
    getLowerLimit(x){
        let bbLimit = limitY(x, this.bottomBank.gradient, this.bottomBank.offset);
        let bthreshLimit;
        if(this.beforeThreshold.verticalFacing === "down" && this.before.level != "full"){
            bthreshLimit = limitY(x, this.beforeThreshold.gradient, this.beforeThreshold.offset);
        
            let outp = Math.min(bbLimit, bthreshLimit);
            return outp;
        }else{
            return bbLimit;
        }
    }

    getRightLimit(y){
        let rbLimit = limitX(y, this.rightBank.gradient, this.rightBank.offset);
        let bthreshLimit;
        if(this.beforeThreshold.horizontalFacing === "right" && this.before.level != "full"){
            bthreshLimit = limitX(y, this.beforeThreshold.gradient, this.beforeThreshold.offset);
            let outp = Math.min(rbLimit, bthreshLimit);
            return outp;
        }else{
            return rbLimit;
        }
    

    }

    getLeftLimit(y){
       let lbLimit = limitX(y, this.leftBank.gradient, this.leftBank.offset);
       let bthreshLimit;
       if(this.beforeThreshold.horizontalFacing === "left" && this.before.level != "full"){
           bthreshLimit = limitX(y, this.beforeThreshold.gradient, this.beforeThreshold.offset);
           let outp = Math.max(lbLimit, bthreshLimit);
           return outp;
       }else{
           return lbLimit;
       }
   
    }
    

    /*thresholdCheck(x, y){


        if(this.after != null){
            if(this.afterThreshold.checkCross(x, y)){
                return this.after;

            }

        }
        if(this.before != null){
            if(this.beforeThreshold.checkCross(x, y)){
                if(this.before.level === "full"){
                    return this.before;
                }else{
                    return null;
                }

            }
    
        }

        return null;

    }*/
}
