class lock extends canal {
    constructor(length, oClock, width, player, fillTime, holdTime){
        super(length, oClock, width, player);
        this.fillTime = fillTime;
        this.holdTime = holdTime;

        this.foreHalf = null;
        this.aftHalf = null;
        this.foreDoors = null;
        this.aftDoors = null;

        this.absForeGreen = null;
        this.absForeMag = null;
        this.absAftGreen = null;
        this.absAftMag = null;

        this.foreDoorsOpen = false;
        this.aftDoorsOpen = false;
    }

    createSprites(){
        this.createRedBank();
        this.createBlackBank();
        this.createDoors();
    }

    createDoors(){
        this.foreDoors = this.doorSprite(this.redStart, this.blackStart, this.prev);
        this.aftDoors = this.doorSprite(this.redEnd, this.blackEnd, this.next);
    }

    doorSprite(start, end, connection){
        const halfway = halfwayPoint(start, end);
        let circle = new Sprite(halfway[0], halfway[1], 30)

        let door1 = this.createBank(start, halfway);
        let door2 = this.createBank(end, halfway);
        door1.colour = "magenta";
        door2.colour = "green";
        door1.rotationSpeed = 90;

        return [door1, door2];
    }

    animate(){
        this.canalAnimate();
        this.lockAnimate();
    }

    lockAnimate(){
        this.openDoors(this.aftDoors, this.next);
    }

    openDoors(gate, connection){
        // remember when comparing it to "next"
        //the absolute angle is reversed
        let targ = connection.getOClockInDegrees();

        if(gate[1].rotation < targ){
            gate[1].rotation = (frameCount) % 360;
        }
    }


}