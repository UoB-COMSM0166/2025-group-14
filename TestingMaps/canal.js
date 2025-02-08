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
            this.centreX = endX - startX;

        }else{
        
            this.redBank = this.bottomBank;
            this.blackBank = this.topBank;
            this.centreX = startX - endX;

        }

        //determines left and right limits within which the boats can move
        if(startY <= endY){
            this.rightBank = this.redBank;
            this.leftBank = this.blackBank;
            this.centreY = endY - startY;
        }

        
        if(startY > endY){
            this.rightBank = this.blackBank;
            this.leftBank = this.redBank;
            this.centreY = startY + endY;
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
            return limitY(x, this.topBank.gradient, this.topBank.offset);//upperlimit
        }
        
        getLowerLimit(x){
            return limitY(x, this.bottomBank.gradient, this.bottomBank.offset);
        }

        getRightLimit(y){
            return limitX(y, this.rightBank.gradient, this.rightBank.offset);

        }

        getLeftLimit(y){
           return limitX(y, this.leftBank.gradient, this.leftBank.offset);
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