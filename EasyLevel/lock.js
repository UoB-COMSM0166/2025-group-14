class lock extends canal{


    constructor(width, name, startX, startY, endX, endY, fillTime, openTime){
        super(width, name, startX, startY, endX, endY);
      

        //LOCK SPECIFIC - details whether the lock is open or closed
        this.fillTime = fillTime
        this.openTime = openTime
        this.cycle = this.fillTime + this.fillTime + this.openTime + this.openTime;
        this.startFull = this.openTime + this.fillTime;
        this.endFull = this.openTime + this.fillTime + this.openTime;
        this.level = null;


    }

    getFullStatus(){
        let mod = (frameCount/60) % this.cycle;
        text(mod + "/" + this.cycle, this.topBank.endX, this.topBank.endY+(this.width/4));
        if(mod < this.openTime){
            return "empty";
        }else if(mod >= this.openTime && mod < this.startFull){
            return "filling";
        }else if(mod >= this.startFull && mod < this.endFull){
            return "full";
        }else if(mod >= this.endFull){
            return "emptying";
        }else{
            console.log("your math's off, champ");
            return "empty"
        }
   

    }

    getUpperLimit(x){
        let tbLimit = limitY(x, this.topBank.gradient, this.topBank.offset);
        let bthreshLimit = 0;
        let athreshLimit = 0;
        if(this.beforeThreshold.verticalFacing === "up"){
            bthreshLimit = limitY(x, this.beforeThreshold.gradient, this.beforeThreshold.offset);
        }
        if(this.afterThreshold.verticalFacing === "up"){
            athreshLimit = limitY(x, this.afterThreshold.gradient, this.afterThreshold.offset);
        }
        return Math.max(tbLimit, bthreshLimit, athreshLimit);
    }
    
    getLowerLimit(x){
        let bbLimit = limitY(x, this.bottomBank.gradient, this.bottomBank.offset);
        let bthreshLimit = 3000;
        let athreshLimit = 3000;
        if(this.beforeThreshold.verticalFacing === "down"){
            bthreshLimit = limitY(x, this.beforeThreshold.gradient, this.beforeThreshold.offset);
        }
        if(this.afterThreshold.verticalFacing === "down"){
            athreshLimit = limitY(x, this.afterThreshold.gradient, this.afterThreshold.offset);
        }
        return Math.min(bbLimit, bthreshLimit, athreshLimit);

    }

    getRightLimit(y){
        let rbLimit = limitX(y, this.rightBank.gradient, this.rightBank.offset);
        let bthreshLimit = 3000;
        let athreshLimit = 3000;
        if(this.beforeThreshold.horizontalFacing === "right"){
            bthreshLimit = limitX(y, this.beforeThreshold.gradient, this.beforeThreshold.offset);
        }
        if(this.afterThreshold.horizontalFacing === "right"){
            athreshLimit = limitX(y, this.afterThreshold.gradient, this.afterThreshold.offset);
        }
        return Math.min(rbLimit, bthreshLimit, athreshLimit);

    

    }

    getLeftLimit(y){
       let lbLimit = limitX(y, this.leftBank.gradient, this.leftBank.offset);
       let bthreshLimit = 0;
       let athreshLimit = 0;
       if(this.beforeThreshold.horizontalFacing === "left"){
           bthreshLimit = limitX(y, this.beforeThreshold.gradient, this.beforeThreshold.offset);
       }
       if(this.afterThreshold.horizontalFacing === "left"){
           athreshLimit = limitX(y, this.afterThreshold.gradient, this.afterThreshold.offset);
       }
       console.log("bank " + lbLimit + " before " + bthreshLimit + " after " + athreshLimit);
       return Math.max(lbLimit, bthreshLimit, athreshLimit);

   
    }

    thresholdCheck(x, y){

        if(this.level === "filling" || this.level === "emptying"){
            return null;
        }


        if(this.after != null){
            if(this.afterThreshold.checkCross(x, y)){
                if(this.level === "full"){
                    return this.after;
                }else{
                    return null;
                }

            }

        }

        if(this.before != null){
            if(this.beforeThreshold.checkCross(x, y)){
                if(this.level === "empty"){
                    return this.before;
                }else{
                    return null;
                }

            }
    
        }

        return null;

    }

//visualization experiment that got out of hand - putting it on pause and just using a numerical reader for now
   /* indicatorLines(){
        let rPos;
        let bPos;
        let rMax = this.afterThreshold.startX;
        let bMax = this.afterThreshold.endX;
        let rMin = this.beforeThreshold.endX;
        let bMin = this.beforeThreshold.startX;
        let rGulf = rMax - rMin;
        let bGulf = bMax - bMin;
        let seconds = (frameCount/60) % this.startFull
        if(this.level === "full"){
            rPos = rMax;
            bPos = bMax;
        }else if(this.level === "empty"){
            rPos = rMin;
            bPos = bMin;
        }else if(this.level === "filling"){
        
            
            rPos = rMin + (rGulf/(this.startFull/seconds));
            bPos = bMin + (bGulf/(this.startFull/seconds));
        }else{
          

            rPos = rMin + rMax-(rGulf/(this.startFull/seconds));
            bPos = bMin + bMax-(bGulf/(this.startFull/seconds));
        }
        line(this.beforeThreshold.endX, this.beforeThreshold.endY, rPos, limitY(30, this.redBank.gradient, this.redBank.offset));
        line(this.beforeThreshold.startX, this.beforeThreshold.startY, bPos, limitY(30, this.blackBank.gradient, this.blackBank.offset));
 
    }*/


    visualize(){
        stroke("red");
        this.redBank.visualize();
        stroke("black");
        this.blackBank.visualize();
        stroke("blue");
        this.beforeThreshold.visualize();
        stroke("orange");
        this.afterThreshold.visualize();
        let status = this.getFullStatus();
        this.level = status
        text(status, this.topBank.endX, this.topBank.endY+(this.width/2));
        //stroke("green");
        //this.indicatorLines();

    }


}