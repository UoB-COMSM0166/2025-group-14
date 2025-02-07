class canal{
    constructor(width, name, startX, startY, endX, endY, farCorner){
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
        this.beforeThreshold = null;
        this.afterThreshold = null;
        this.farCorner = farCorner;

        if(startY <= endY){
            this.rightBank = this.redBank;
            this.leftBank = this.blackBank
            console.log("for canal " + this.name + "the red bank is on the right");
        }

        
        if(startY > endY){
            this.rightBank = this.blackBank;
            this.leftBank = this.redBank;
            console.log("for canal " + this.name + "the red bank is on the left");
        }
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

        //functions that get the limits of boat motion
        getUpperLimit(x){
            return limitY(x, this.redBank.gradient, this.redBank.offset);//upperlimit
        }
        
        getLowerLimit(x){
            return limitY(x, this.blackBank.gradient, this.blackBank.offset);
        }

        getRightLimit(y){
            return limitX(y, this.rightBank.gradient, this.rightBank.offset);

        }

        getLeftLimit(y){
           return limitX(y, this.leftBank.gradient, this.leftBank.offset);
        }
        

        thresholdCheck(x, y){
            let afterBorderHor = this.farCorner;
            let afterBorderVer = this.farCorner;
            let beforeBorderHor = 0;
            let beforeBorderVer = 0;

            if(this.after != null){
        
                afterBorderHor = limitX(y, this.afterThreshold.gradient, this.afterThreshold.offset);
                afterBorderVer = limitY(x, this.afterThreshold.gradient, this.afterThreshold.offset);

            }
            if(this.before != null){

                beforeBorderHor = limitX(y, this.beforeThreshold.gradient, this.beforeThreshold.offset);
                beforeBorderVer = limitY(x, this.beforeThreshold.gradient, this.beforeThreshold.offset);
            }

            //console.log("x: " + x + " y: " + y + " bX: " + afterBorderHor + " by " + afterBorderVer);



            if(y > afterBorderVer && x > afterBorderHor){
                console.log("Swap forward!");
                return this.after;
        

            }

            
            if(y < beforeBorderVer && x < beforeBorderHor){
                console.log("Swap backwards!");
                return this.before;
            }

            return null;

        }



}