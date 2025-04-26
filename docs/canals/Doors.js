class doors{
    constructor(lock, canal, speed = 1.5, startPos, aft = false){
        this.aft = aft;

        this.lock = lock;
        this.canal = canal;
        this.redSect = linearIntersect(lock.getGradient(), lock.getOffset("red"), canal.getGradient(), canal.getOffset("red"));
        //this.blackSect = linearIntersect(lock.getGradient(), lock.getOffset("black"), canal.getGradient(), canal.getOffset("black"));
        this.blackSect = [this.redSect[0] + lock.getWidthChanges()[0], this.redSect[1] + lock.getWidthChanges()[1]];
        this.midway = halfwayPoint(this.redSect, this.blackSect);
        this.setSects();
        this.startPos = startPos
        this.speed = speed;


        this.playerPass = -1;
        this.awaiting = true;

    


        // maintains state: open, closing, closed, opening
        this.state = "closed";
        this.timer = 0;

        this.sprites = [];

        this.redDoor = this.blackDoor = null;
        this.redAngle = this.blackAngle = 0;


        //red equals left, black equals right

        this.doorThick = 8
        this.OFFSET = 10;
 
       
        // offset from canal edge
        this.baseRot   = this.lock.getAngle(degrees)
        this.openRed   = this.baseRot - (90 - this.OFFSET);
        this.openBlack   = this.baseRot + 270 - this.OFFSET;
        this.closedRed = this.baseRot;
        this.closedBlack = this.baseRot + 180 //((this.baseRot + 180) % 360);
        //this.openRed = this.lock.getAngle(true);
        //this.closedBlack = 185
    
        let rotRad = angleCalc(this.redSect[0], this.redSect[1], this.blackSect[0], this.blackSect[1], true, true, true);
        const ux = Math.cos(rotRad);
        const uy = Math.sin(rotRad);
        this.anchorRed = [ this.midway[0] - ux * this.lock.getWidth(false) * 0.5, this.midway[1] - uy * this.lock.getWidth(false) * 0.5 ];
        this.anchorBlack = [ this.midway[0] + ux * this.lock.getWidth(false) * 0.5, this.midway[1] + uy * this.lock.getWidth(false) * 0.5 ];

    
  
        // this.doorLength = Math.hypot(this.anchorBlack[0] - this.anchorRed[0], this.anchorBlack[1] - this.anchorRed[1]) * 0.5;
        this.doorLength = getHypotenuse(this.redSect, this.midway)




        this.createSprites()


    }

    //functions to complete

    createSprites(){
        //this.redDoor = this.makeDoor(this.redSect, "red");
       // this.blackDoor = this.makeDoor(this.blackSect, "black");

        // left side

        if(this.startPos === "open"){
            this.redAngle = this.openRed;
            this.blackAngle = this.openBlack;
        }else{
            this.redAngle = this.closedRed;
            this.blackAngle = this.closedBlack; 
        }

        /*this.sensor = new Sprite(this.midway[0], this.midway[1], this.doorLength * 2, this.doorThick);
        this.sensor.rotation = this.closedRed;
        this.sensor.collider = "static";
        this.sensor.colour = 'seagreen';
        this.sprites.push(this.sensor)*/

        this.redDoor  = new Sprite(this.anchorRed[0], this.anchorRed[1], this.doorLength, this.doorThick);
        this.redDoor.rotation = this.redAngle;
        this.redDoor.collider = "static";
        this.redDoor.color    = "blue";
        this.sprites.push(this.redDoor);
    
        this.blackDoor  = new Sprite(this.anchorBlack[0], this.anchorBlack[1], (this.doorLength), this.doorThick);
         this.blackDoor.rotation = this.normDeg(this.blackAngle);
        this.blackDoor.collider = "static";
        this.blackDoor.color    = "green";
        this.sprites.push(this.blackDoor);

        this.doorAnimate();
    }

    doorAnimate() {
        this.redDoor.rotation  = this.normDeg(this.redAngle);
        this.blackDoor.rotation = this.normDeg(this.blackAngle);
        const hl = this.doorLength * 0.5;
        this.redDoor.x  = this.redSect[0] + hl * Math.cos(degreesToRadians(this.redAngle));
        this.redDoor.y  = this.redSect[1] + hl * Math.sin(degreesToRadians(this.redAngle));
        this.blackDoor.x = this.blackSect[0] + hl * Math.cos(degreesToRadians(this.blackAngle));
        this.blackDoor.y = this.blackSect[1] + hl * Math.sin(degreesToRadians(this.blackAngle));
    }

    getAnchor(bank){
        switch(bank){
            case "red":
                return this.anchorRed;
            case "black":
                return this.anchorBlack;
            default:
                throw new Error("improper use of lock doors getAnchor function");
        }
    }

    getClosedRed(){
        return this.closedRed;
    }

    getDoorLength(){
        return this.doorLength;
    }

    getDoorThick(){ return this.doorThick }

    getMidway(){return this.midway}

    getPlayerPass(){
        if(this.playerPass < 0){
            return false;
        }else{
            return true;
        }
    }

    getSensor(){return this.sensor}

    doorState() {
        if (this.state === "opening") {
            this.redAngle  = Math.max(this.openRed, this.redAngle - this.speed);
            this.blackAngle = Math.min(this.openBlack, this.blackAngle + this.speed);
            if (this.redAngle === this.openRed&& this.blackAngle === this.openBlack) {
                this.state = "open"; 
                this.timer = 0;
          }
        } else if (this.state === "closing") {
          this.redAngle  = Math.min(this.closedRed, this.redAngle + this.speed);
          this.blackAngle = Math.max(this.closedBlack, this.blackAngle - this.speed);
          if (this.redAngle === this.closedRed&& this.blackAngle === this.closedBlack) {
            this.state = "closed"; 
            this.timer = 0;
          }
        }
      }

    getSprites(){return this.sprites}

    normDeg(d){ return ((d % 360) + 360) % 360; }

    open(){
        /*this.timer++
        if (this.state === "closed" /*&& this.timer >= this.closedFrames*//*) {/*
            /*this.state = "opening"; 
            this.timer = 0;
        }
        this.doorState();*/
        this.redAngle  = Math.max(this.openRed, this.redAngle - this.speed);
        this.blackAngle = Math.min(this.openBlack, this.blackAngle + this.speed);
        this.doorAnimate();
  

    }

    close(){
        /*this.timer++
        if (this.state === "open" && this.timer >= this.openFrames) {
            this.state = "closing"; 
            this.timer = 0;
        }*/

        this.redAngle  = Math.min(this.closedRed, this.redAngle + this.speed);
        this.blackAngle = Math.max(this.closedBlack, this.blackAngle - this.speed);

        //this.doorState();
        this.doorAnimate();  

    }

    makeDoor(start, colour){
        let outp = new Sprite([start, this.midway]);
        outp.collider = "static";
        outp.colour = colour;
        this.sprites.push(outp);
        return outp;
    }

    segmentPosition(x, canal, bank, pos){
        let width = canal.width;
        let grad = canal.getGradient();
        let off = canal.getOffset(bank);
        let coord = canal.getCoord(bank.concat(pos));
        let second = x + this.linkWidth;
        if(canal.getDirection()[0] === "left"){
            x *= -1;
            second *= -1;
        }

        let xOne = x + coord[0];
        let yOne = (xOne * grad) + off;
        return [xOne, yOne];

    }

    setSects(){
        let rc = halfwayPoint(this.lock.getCoord("redStart"), this.lock.getCoord("redEnd"));
        let dist = this.lock.getWidth()
        let angle = this.lock.getAngle(false);
        let xChange = Math.sin(angle) * dist;
        let yChange = -Math.cos(angle) * dist;

        
        if(this.aft === false){
            xChange *= -1;
            yChange *= -1;
        }

        let red = [rc[0] + xChange, rc[1] + yChange]
        let black = [red[0] + this.lock.getWidthChanges()[0], red[1] + this.lock.getWidthChanges()[1]]
        let mid = halfwayPoint(red, black)

        this.redSect = red;
        this.blackSect = black;
        this.midway = mid;
    }

    speedAsFrames(){return this.speed * 60}
}