class canal{
    constructor(width, name, startX, startY, endX, endY){
        
        //preliminary maths
        let a = angleCalc(startX, startY, endX, endY);
        let opp = Math.sin(a) * width;
        let adj = Math.cos(a) * width;

        //two banks of "Width" apart
        this.width = width;
        this.name = name;
        this.topBank = new bank(startX, startY, endX, endY);
        this.bottomBank = new bank(startX + opp, startY + adj, endX + opp, endY + adj);

        //designates the banks as "red" or "black", allowing connection of segments redBank to redBank & blackBank to blackBank
        let direction = this.topBank.verticalFacing;
        if(direction === "up"){
            this.redBank = this.topBank;
            this.blackBank = this.bottomBank;
      
        }else{
        
            this.redBank = this.bottomBank;
            this.blackBank = this.topBank;

        }

        //determines left and right limits within which the boats can move
        if(startY <= endY){
            this.rightBank = this.redBank;
            this.leftBank = this.blackBank;
        
        }

        if(startY > endY){
            this.rightBank = this.blackBank;
            this.leftBank = this.redBank;
  
        }

        //set during the connection function; "before" and  "after" are the two canals that connect to this one, with "threshold" being the point between them for the boat to cross
        this.before = null;
        this.after = null; 
        this.beforeThreshold = null;
        this.afterThreshold = null;

    }

    visualize(){
        stroke("red");
        this.redBank.visualize();
        stroke("black");
        this.blackBank.visualize();
        //this.visualizeInterior();
        stroke("black");
        fill("black");
    }

    visualizeInterior(){
        stroke("blue");
        fill("blue");
        beginShape(QUAD_STRIP);
        vertex(this.redBank.startX, this.redBank.startY);
        vertex(this.blackBank.startX, this.blackBank.startY);
        vertex(this.redBank.endX, this.redBank.endY);
        vertex(this.blackBank.endX, this.blackBank.endY);
        endShape(CLOSE);
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
        this.beforeThreshold = new bank(x2, y2, x1, y1);
    

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

        //functions that get the limits of boat motion
        getUpperLimit(x){
            if(false){
                return this.getBufferLimits(x, 0, "before");
            }else if(false){
                return this.getBufferLimits(x, 0, "after");
            }else{
                return this.getStandardLimits(x, 0);
            }
        }
        
        getLowerLimit(x){
            if(false){
                return this.getBufferLimits(x, 1, "before");
            }else if(false){
                return this.getBufferLimits(x, 1, "after");
            }else{
                return this.getStandardLimits(x, 1);
            }
        }

        getRightLimit(y){
            if(false){
                return this.getBufferLimits(y, 3, "before");
            }else if(false){
                return this.getBufferLimits(y, 3, "after");
            }else{
                return this.getStandardLimits(y, 3);
            }
        }

        getLeftLimit(y){
            if(false){
                return this.getBufferLimits(y, 2, "before");
            }else if(false){
                return this.getBufferLimits(y, 2, "after");
            }else{
                return this.getStandardLimits(y, 2);
            }
        }

        
        getBufferLimits(inp, direction, buffer){
            //0-3 = up down left right;
            let targetCurrent;
            let targetComparison;
            let comparison;
            let vertical;
            let bigNum;
            switch(buffer){
                case "before":
                    comparison = this.before;
                    break;
                case "after":
                    comparison = this.after;
                    break;
            }

            switch(direction){
                case 0:
                    targetCurrent = this.topBank;
                    targetComparison = comparison.topBank;
                    vertical = true;
                    bigNum = false;
                    break;
                case 1:
                    targetCurrent = this.bottomBank;
                    targetComparison = comparison.bottomBank;
                    vertical = true;
                    bigNum = true;
                    break;
                case 2:
                    targetCurrent = this.leftBank;
                    targetComparison = comparison.leftBank;
                    vertical = false;
                    bigNum = false;
                    break;
                case 3:
                    targetCurrent = this.rightBank;
                    targetComparison = comparison.rightBank;
                    vertical = false;
                    bigNum = true;
                    break;

            }
            let targOut;
            let compOut;
            if(vertical){
                targOut = limitY(inp, targetCurrent.gradient, targetCurrent.offset);
                compOut = limitY(inp, targetComparison.gradient, targetComparison.offset);
            }else{
                targOut = limitX(inp, targetCurrent.gradient, targetCurrent.offset);
                compOut = limitX(inp, targetComparison.gradient, targetComparison.offset);

            }
            if(bigNum){
                return Math.max(targOut, compOut);
            }else{
                return Math.min(targOut, compOut);
            }
            
        }

   
        
        getStandardLimits(inp, direction){
            //0-3 = up down left right;
            let target;
            let vertical;
            switch(direction){
                case 0:
                    target = this.topBank;
                    vertical = true;
                    break;
                case 1:
                    target = this.bottomBank;
                    vertical = true;
                    break;
                case 2:
                    target = this.leftBank;
                    vertical = false;
                    break;
                case 3:
                    target = this.rightBank;
                    vertical = false;
                    break;

            }
            if(vertical){
                return limitY(inp, target.gradient, target.offset);
            }else{
                return limitX(inp, target.gradient, target.offset);
            }
            
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
            return null;

        }





}