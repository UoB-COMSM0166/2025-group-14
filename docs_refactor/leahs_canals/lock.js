class lock extends canal {
    constructor(length, oClock, width, player, fillTime, openTime){
        super(length, oClock, width, player);
        this.fillTime = fillTime;
        this.openTime = openTime;

        this.cycle = this.fillTime + this.fillTime + this.openTime + this.openTime;
        this.startFull = this.openTime + this.fillTime;
        this.endFull = this.openTime + this.fillTime + this.openTime;
        this.status = null;
        this.illegal = null;

        //set after connections as part of the createSprites function
        this.foreDoors;
        this.aftDoors;


        /*this.foreHalf = null;
        this.aftHalf = null;
        this.foreDoors = null;
        this.aftDoors = null;

        this.absForeGreen = null;
        this.absForeMag = null;
        this.absAftGreen = null;
        this.absAftMag = null;

        this.foreDoorsOpen = false;
        this.aftDoorsOpen = false;*/
    }



    createSprites(){
        this.createRedBank();
        this.createBlackBank();
        this.createDoors();
    }

    createDoors(){
        /*this.foreDoors = this.doorSprite(this.redStart, this.blackStart, this.prev);
        this.aftDoors = this.doorSprite(this.redEnd, this.blackEnd, this.next);*/
        this.foreDoors = new doors(this, this.prev);
        this.aftDoors = new doors(this, this.next);

        let sprites = []
        for(const sprite of this.foreDoors.getSprites()){
            sprites.push(sprite)
        }
        for(const sprite of this.aftDoors.getSprites()){
            sprites.push(sprite)
        }
        for(const sprite of sprites){
            this.bankSprites.push(sprite);
            this.allSprites.push(sprite);
        }
    }

    /*doorSprite(start, end, connection){
        const halfway = halfwayPoint(start, end);
        //comment out for now to not cause start screen bug (big circles that don't clear)
        //let circle = new Sprite(halfway[0], halfway[1], 30)

        let door1 = this.createBank(start, halfway);
        let door2 = this.createBank(end, halfway);
        door1.colour = "magenta";
        door2.colour = "green";
        door1.rotationSpeed = 30;

        return [door1, door2];
    }*/

    animate(){
        this.canalAnimate();
        this.lockAnimate();
    }

    lockAnimate(){
        //this.openDoors(this.aftDoors, this.next);
        this.status = this.getFullStatus();
        text(this.status, this.redStart[0] + 20, this.redStart[1] + 20);
        let illegal = this.illegal;
        switch(this.status){
            case("empty"):
                if(illegal != "empty"){
                    this.foreDoors.open();
                    this.illegal = "empty"
                }
                break;
            case("filling"):
                if(illegal != "filling"){
                    this.foreDoors.close();
                    this.illegal = "filling"
                }
                break;
            case("full"):
                if(illegal != "full"){
                    this.aftDoors.open();
                    this.illegal = "full"
                }
                break;
            case("emptying"):
                if(illegal != "emptying"){
                    this.aftDoors.close();
                    this.illegal = "emptying"
                }
                break;
        }
    }

    /*openDoors(gate, connection){
        // remember when comparing it to "next"
        //the absolute angle is reversed
        let targ = connection.getOClockInDegrees();

        if(gate[1].rotation < targ){
            gate[1].rotation = (frameCount) % 360;
        }
    }*/

    getFullStatus(){
        let mod = (frameCount/60) % this.cycle;
        if(mod < this.openTime){
            return "empty";
        }else if(mod >= this.openTime && mod < this.startFull){
            return "filling";
        }else if(mod >= this.startFull && mod < this.endFull){
            return "full";
        }else if(mod >= this.endFull){
            return "emptying";
        }else{
            throw new Error("Lock status error, message Leah about it")
        }
    }



}