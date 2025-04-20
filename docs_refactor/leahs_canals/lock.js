class lock extends canal {
    constructor(length, oClock, width, player, fillTime, openTime){
        super(length, oClock, width, player);
        this.fillTime = fillTime;
        this.openTime = openTime;
        this.checkTimes();

        this.cycle = this.fillTime + this.fillTime + this.openTime + this.openTime;
        this.startFull = this.openTime + this.fillTime;
        this.endFull = this.openTime + this.fillTime + this.openTime;
        this.status = null;
        this.illegal = null;

        //set after connections as part of the createSprites function
        this.foreDoors;
        this.aftDoors;

        // depth bar
        this.depthBar = new DepthBar(true);
    }

    checkTimes(){
        if(this.fillTime === null || this.openTime === null){
            throw new Error("Remember a lock takes two extra arguments, fillTime and openTime; please set these");
        }
    }

    createSprites(){
        this.canalSetup();
        this.lockSetup();
    }

    createDoors(){
        this.foreDoors = new doors(this, this.prev, this.inLink);
        this.aftDoors = new doors(this, this.next, this.inLink);

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
        // Depth bar position
        let depthBarX = Math.abs(this.redStart[0] - this.width);  
        let depthBarY = Math.abs(this.redStart[1] - (this.length/2));
        // Update depth bar based on percent depth
        let depth = this.getPercentDepth();
        this.depthBar.draw(depth, depthBarX, depthBarY);

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

    lockSetup(){
        this.createDoors()
    }

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

    // Returns the % depth of the lock currently
    getPercentDepth(){
        let mod = (frameCount/60) % this.cycle;
        if(mod < this.openTime){
            return 0;
        }else if(mod >= this.openTime && mod < this.startFull){
            return ((mod-this.openTime)/this.fillTime)*100;
        }else if(mod >= this.startFull && mod < this.endFull){
            return 100;
        }else if(mod >= this.endFull){
            return 100 - (((mod-this.endFull)/this.fillTime)*100);
        }else{
            throw new Error("Lock status error, message Leah about it")
        }
    }



}