class bank{
    constructor(startX, startY, endX, endY){
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.gradient = gradient(startX, startY, endX, endY);
        this.offset = offset(this.gradient, startX, startY);
        this.beforeIntersectX = null;
        this.beforeIntersectY = null;
        this.afterIntersectX = null;
        this.afterIntersectY = null;
    }

    setBeforeIntersect(x, y){
        this.beforeIntersectX = x;
        this.beforeIntersectY = y;
    }

    setAfterIntersect(x, y){
        this.afterIntersectX = x;
        this.afterIntersectY = y
    }
    
    
    visualize(){
        let x1 = this.startX;
        let y1 = this.startY;
        let x2 = this.endX;
        let y2 = this.endY;

        if(this.beforeIntersectX != null){
            x1 = this.beforeIntersectX;
            y1 = this.beforeIntersectY;
        }

        if(this.afterIntersectX != null){
            x2 = this.afterIntersectX;
            y2 = this.afterIntersectY;
        }


        line(x1, y1, x2, y2);



    }


}