class bank{
    constructor(startX, startY, endX, endY){
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.gradient = gradient(startX, startY, endX, endY);
        this.offset = offset(this.gradient, startX, startY);
        this.angle = Math.atan(this.gradient);
        this.angleInDegrees = toDegrees(this.angle);
        this.length = length(startX, startY, endX, endY);



        this.horizontalFacing = null;
        this.verticalFacing = null;
        this.horizontalPointing = null;
        this.verticalPointing = null;
        this.setDirection();
    }

    setDirection(){
        if(this.startX >= this.endX){
            this.verticalFacing = "down";
            this.horizontalPointing = "left";
        }else{
            this.verticalFacing = "up";
            this.horizontalPointing = "right";
        }
        if(this.startY >= this.endY){
            this.horizontalFacing = "left";
            this.verticalPointing = "up";
        }else{
            this.horizontalFacing = "right";
            this.verticalPointing = "down";
        }
    }

    setBeforeIntersect(x, y){
        this.startX = x;
        this.startY = y;
        this.setDirection();

    }

    setAfterIntersect(x, y){
        this.endX = x;
        this.endY = y;
        this.setDirection();
    }
    
    
    visualize(){
        let x1 = this.startX;
        let y1 = this.startY;
        let x2 = this.endX;
        let y2 = this.endY;

        line(x1, y1, x2, y2);



    }

    checkCross(x, y){
        let limX = limitX(y, this.gradient, this.offset);
        let limY = limitY(x, this.gradient, this.offset);
        let xBool = false;
        let yBool = false;

        if(this.horizontalFacing === "right" && x > limX){
            xBool = true;
        }
        if(this.horizontalFacing === "left" && x < limX){
            xBool = true;
        }
        if(this.verticalFacing === "up" && y < limY){
            yBool = true;
        }
        if(this.verticalFacing === "down" && y > limY){
            yBool = true;
        }

        if(xBool && yBool){
            return true;
        }else{
            return false;
        }

      
    }


}