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
    }



    createSprites(){
        this.createRedBank();
        this.createBlackBank();
        this.createDoors();
    }

    createDoors(){
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

    getFullStatus(){
        let mod = (frameCount/60) % this.cycle;
        if(mod < this.openTime){
            console.log("status: empty , mod: " + mod);
            return "empty";
        }else if(mod >= this.openTime && mod < this.startFull){
            console.log("status: filling , mod: " + mod + " , %: " + ((mod-this.openTime)/this.fillTime)*100);
            return "filling";
        }else if(mod >= this.startFull && mod < this.endFull){
            console.log("status: full , mod: " + mod);
            return "full";
        }else if(mod >= this.endFull){
            console.log("status: emptying , mod: " + mod + " , %: " + ((mod-this.endFull)/this.fillTime)*100);
            return "emptying";
        }else{
            throw new Error("Lock status error, message Leah about it")
        }
    }



}