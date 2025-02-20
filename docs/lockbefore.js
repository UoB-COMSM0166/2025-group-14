class lockbefore extends lockcomponent{
                getUpperLimit(x){
                    let tbLimit = limitY(x, this.topBank.gradient, this.topBank.offset);
                    let athreshLimit;
                    if(this.afterThreshold.verticalFacing === "up" && this.after.level != "empty"){
                        athreshLimit = limitY(x, this.afterThreshold.gradient, this.afterThreshold.offset);
                        let outp = Math.max(tbLimit, athreshLimit);
                        return outp;
                    }else{
                        return tbLimit;
                    }
                }
                
                getLowerLimit(x){
                    let bbLimit = limitY(x, this.bottomBank.gradient, this.bottomBank.offset);
                    let athreshLimit;
                    if(this.afterThreshold.verticalFacing === "down"  && this.after.level != "empty"){
                        athreshLimit = limitY(x, this.afterThreshold.gradient, this.afterThreshold.offset);
                    
                        let outp = Math.min(bbLimit, athreshLimit);
                        return outp;
                    }else{
                        return bbLimit;
                    }
                }
        
                getRightLimit(y){
                    let rbLimit = limitX(y, this.rightBank.gradient, this.rightBank.offset);
                    let athreshLimit;
                    if(this.afterThreshold.horizontalFacing === "right" && this.after.level != "empty"){
                        athreshLimit = limitX(y, this.afterThreshold.gradient, this.afterThreshold.offset);
                        let outp = Math.min(rbLimit, athreshLimit);
                        return outp;
                    }else{
                        return rbLimit;
                    }
                
        
                }
        
                getLeftLimit(y){
                   let lbLimit = limitX(y, this.leftBank.gradient, this.leftBank.offset);
                   let athreshLimit;
                   if(this.afterThreshold.horizontalFacing === "left" && this.after.level != "empty"){
                       athreshLimit = limitX(y, this.afterThreshold.gradient, this.afterThreshold.offset);
                       let outp = Math.max(lbLimit, athreshLimit);
                       return outp;
                   }else{
                       return lbLimit;
                   }
               
                }
                
    
                /*thresholdCheck(x, y){
    

                    if(this.after != null){
                        if(this.afterThreshold.checkCross(x, y)){
                            if(this.after.level === "empty"){
                                return this.after;
                            }else{
                                return null;
                            }
            
                        }
        
                    }
                    if(this.before != null){
                        if(this.beforeThreshold.checkCross(x, y)){
                            console.log("Swap backward!");
                            return this.before;
                        }
                
                    }
        
                    return null;
        
                }*/
}