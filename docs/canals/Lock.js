class lock extends canal {
    constructor(length, oClock, width, player, fillTime, openTime, waitTime = 0){
        super(length, oClock, width, player);
        this.fillTime = fillTime;
        this.openTime = openTime;
        this.checkTimes();

        this.cycle = this.fillTime + this.fillTime + this.openTime + this.openTime;
        this.startFull = this.openTime + this.fillTime;
        this.endFull = this.openTime + this.fillTime + this.openTime;
        this.status = null;
        this.relativeFrames = 0;
        this.waitFrames = waitTime * 60
        
        //set after connections as part of the createSprites function
        this.foreDoors;
        this.aftDoors;


        //checks if the lock contains the player
        this.foreSensor;
        this.aftSensor;
        this.containsBoat = -1
        this.foreWaiting = true;
        this.aftWaiting = true;

        // depth bar
        this.depthBar = new DepthBar(true);

        /*if(prev != null){
            this.prev = prev;
            this.next = next;
        }*/

        this.foreLockSoundPlaying = false;
        let foreLockSoundTimer;
        this.aftLockSoundPlaying = false;
        let aftLockSoundTimer;
    }

    checkForPlayer(){
        //note that this is currently powerless in a situation where the boat touches a sensor but does not cross it
        //still testing


        if(this.foreAwaiting && this.checkSensor(this.foreSensor)){
            this.containsBoat *= -1;
        }
        if(this.aftAwaiting && this.checkSensor(this.aftSensor)){
            this.containsBoat *= -1;
        }

        if(!this.checkSensor(this.foreSensor)){
            this.foreAwaiting = true;
        }else{
            this.foreAwaiting = false;
        }
        if(!this.checkSensor(this.aftSensor)){
            this.aftAwaiting = true;
        }else{
            this.aftAwaiting = false;
        }
    }

    checkSensor(sensor){
        return this.player.overlaps(sensor);
    }

    checkTimes(){
        if(this.fillTime === null || this.openTime === null){
            throw new Error("Remember a lock takes two extra arguments, fillTime and openTime; please set these");
        }
    }

    createSensor(doors){
        let mid = doors.getMidway();
        let len = doors.getDoorLength() * 2; 
        let angle = doors.getClosedRed();
        let thick = doors.getDoorThick();
        let output = new Sprite(mid[0], mid[1], len, thick);
        output.rotation = angle;
        output.visible = false;
        output.collider = 'none';
        output.layer = -1;
        this.allSprites.push(output);
        return output;
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
            //console.log("play lock sound fore");
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
            //console.log("play lock sound aft");
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
        this.foreDoors = new doors(this, this.prev, this.inLink, "open", false);
        this.aftDoors = new doors(this, this.next, this.inLink, "closed", true);

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
        if(frameCount > this.waitFrames){
            this.relativeFrames++;
        }
        this.canalAnimate();
        this.lockAnimate();
        this.playLockSound();
    }

    lockAnimate(){
        //this.openDoors(this.aftDoors, this.next);
        this.status = this.getFullStatus();
        this.checkForPlayer();
        //text(this.getContainsBoat(), this.redStart[0], this.redStart[1])
        // Depth bar position
        let depthBarX = Math.abs(this.redStart[0] - this.width);  
        let depthBarY = Math.abs(this.redStart[1] - (this.length/2));
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
        this.foreSensor = this.createSensor(this.foreDoors);
        this.aftSensor = this.createSensor(this.aftDoors);
    }
    
    getContainsBoat(){
        if(this.containsBoat < 0){
            return false;
        }else{
            return true;
        }
    }

    getFullStatus(){
        let mod = (this.relativeFrames/60) % this.cycle;
        if(frameCount < this.waitTime){
            return "emptying";
        }
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



}