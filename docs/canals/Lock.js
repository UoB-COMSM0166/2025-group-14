class Lock extends Canal {
    constructor(length, oClock, width, player, fillTime, openTime, waitTime = 0){
        super(length, oClock, width, player);
        this.fillTime = fillTime;
        this.openTime = openTime;
        this.checkTimes();

        this.cycle = this.fillTime + this.fillTime + this.openTime + this.openTime;
        this.startFull = this.openTime + this.fillTime;
        this.endFull = this.openTime + this.fillTime + this.openTime;
        this.status = null;

        //determines the position that the lock is in in its cycle
        this.relativeFrames = null;
        this.waitFrames = waitTime * 60
        this.lockTimerReset();
        
        //set after connections as part of the createSprites function
        this.foreDoors;
        this.aftDoors;
        this.centre

        // depth bar
        this.depthBar = new DepthBar(true);

        this.foreLockSoundPlaying = false;
        let foreLockSoundTimer;
        this.aftLockSoundPlaying = false;
        let aftLockSoundTimer;
    }

    checkTimes(){
        if(this.fillTime === null || this.openTime === null){
            throw new Error("Remember a lock takes two extra arguments, fillTime and openTime; please set these");
        }
    }

    //plays a lock sound effect for each set of lock doors with volume adjusted for distance from player
    playLockSound() {
        //find distance from player to lock mid points
        let distFore = dist(this.player.x, this.player.y, this.foreDoors.midway[0], this.foreDoors.midway[1]);
        let distAft = dist(this.player.x, this.player.y, this.aftDoors.midway[0], this.aftDoors.midway[1]);

        //if distance to fore lock is below 200, the sound isnt already playing and the lock has hit empty status
        //then play the noise
        if (distFore < 200 && !this.foreLockSoundPlaying && this.status == "empty") {
            this.foreLockSoundPlaying = true;
            this.foreLockSoundTimer = millis();
            if (soundOn) {
                lockSoundFore.play();
            }

        }

        //if noise is playing and has played for roughly its opening time then stop playing the sound
        if (this.foreLockSoundPlaying && (millis() - this.foreLockSoundTimer) >= this.openTime * 900) {
            lockSoundFore.pause();
            this.foreLockSoundPlaying = false;
        }
        //repeat of above for aft
        if (distAft < 200 && !this.aftLockSoundPlaying && this.status == "full") {
            this.aftLockSoundPlaying = true;
            this.aftLockSoundTimer = millis();
            if (soundOn) {
                lockSoundAft.play();
            }
        }
        //ditto
        if (this.aftLockSoundPlaying && (millis() - this.aftLockSoundTimer) >= this.openTime * 900) {
            lockSoundAft.pause();
            this.aftLockSoundPlaying = false;
        }

        // handle change in volume
        let foreCloseness = lerp(1, 0, constrain(distFore/200, 0, 1));
        if(this.foreLockSoundPlaying) lockSoundFore.setVolume(foreCloseness);
        let aftCloseness = lerp(1, 0, constrain(distAft/200, 0, 1));
        if(this.aftLockSoundPlaying) lockSoundAft.setVolume(aftCloseness);
    }

    createSprites(){
        this.canalSetup();
        this.lockSetup();
    }

    createDoors(){
        this.foreDoors = new Doors(this, this.prev, this.inLink, "open", false);
        this.aftDoors = new Doors(this, this.next, this.inLink, "closed", true);

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

        this.centre = halfwayPoint(this.foreDoors.getMidway(), this.aftDoors.getMidway());

    }


    animate(){
        this.relativeFrames++;
        this.canalAnimate();
        this.lockAnimate();
        this.playLockSound();
    }

    lockAnimate(){
        this.status = this.getFullStatus();
        // Depth bar position
        let depthBarX = this.centre[0];
        let depthBarY = this.centre[1];
        // Update depth bar based on percent depth
        let depth = this.getPercentDepth();
        this.depthBar.draw(depth, depthBarX, depthBarY);
        switch(this.status){
            case("empty"):
                this.foreDoors.open();
                break;
            case("filling"):
                this.foreDoors.close();
                break;
            case("full"):
                this.aftDoors.open();
                break;
            case("emptying"):
                this.aftDoors.close();
                break;
        }
    }

    lockSetup(){
        this.createDoors()
    }

    getFullStatus(){
        let mod = (this.relativeFrames/60) % this.cycle;
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
        let mod = (this.relativeFrames/60) % this.cycle;
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

    lockTimerReset(){
        this.relativeFrames = this.waitFrames; 
    }

}