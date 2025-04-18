class lock extends canal {
    constructor(length, oClock, width, fillTime, holdTime){
        super(length, oClock, width);
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

    removeSprites() { //Daniil: this function deletes the sprites during the restart of the game
        this.blackBank.remove();
        this.redBank.remove();
        this.foreDoors[0].remove();
        this.foreDoors[1].remove();
        this.aftDoors[0].remove();
        this.aftDoors[1].remove();
    }

    doorSprite(start, end, connection){
        const halfway = this.halfwayPoint(start, end);

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
        // console.log(gate[1].rotation + "/" + targ);

        if(gate[1].rotation < targ){
            gate[1].rotation = (frameCount) % 360;
        }
    }


}