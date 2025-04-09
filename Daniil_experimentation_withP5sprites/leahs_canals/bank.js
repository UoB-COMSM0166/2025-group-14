class bank{
    constructor(colour, coordinates){

        //create sprite
        this.sprite = new Sprite(coordinates);
        this.sprite.collider = "static";
        this.sprite.colour = colour;
        
        //positional information
        this.start = coordinates[0];
        this.end = coordinates[1];

        this.grad = this.gradient(this.start[0], this.start[1], this.end[0], this.end[1]);
        this.off = this.offset(this.grad, this.start[0], this.start[1]);
        this.angle = angleCalk(this.start[0], this.start[1], this.end[0], this.end[1], false);

    }


    //math functions
    gradient(x1, y1, x2, y2){
        const numer = y2-y1;
        const denom = x2-x1;
        const outp = numer/denom;
        return outp;
    }

    offset(gradient, X, Y){
        return -1 * ((gradient * X) - Y);
    }

    angleCalc(startX, startY, endX, endY, rads){
        let opp = endY - startY;
        let adj = startX-endX;
        let tanoutp = opp/adj;
        if(rads){
            return Math.atan(tanoutp);
        }else{
            return this.radsToDegrees(Math.atan(tanoutp));
        }
    
    } 
}