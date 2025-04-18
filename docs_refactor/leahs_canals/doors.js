class doors{
    constructor(lock, canal){
        this.lock = lock;
        this.canal = canal;
        this.redSect = linearIntersect(lock.getGradient(), lock.getOffset("red"), canal.getGradient(), canal.getOffset("red"));
        this.blackSect = linearIntersect(lock.getGradient(), lock.getOffset("black"), canal.getGradient(), canal.getOffset("black"));
        this.midway = halfwayPoint(this.redSect, this.blackSect);

        this.sprites = [];
        this.redDoor = null;
        this.blackDoor = null;
        this.createSprites()
    }

    //functions to complete

    createSprites(){
        //TODO - create the sprites
        //when you create them, push them to this.sprites; otherwise they won't be removed
        //ideally (for canal-ishness) it should be two sprites, forming a pair of double doors
        //on either side of the canal
        this.redDoor = this.makeDoor(this.redSect, "red");
        this.blackDoor = this.makeDoor(this.blackSect, "black");
    }

    open(){
        //rotates the two door sprites outwards so they lie flush with the banks of the
        //canal attached to the lock
        this.redDoor.remove();
        this.blackDoor.remove();

    }

    close(){
        //opposite of the open function; closes the sprites so that they
        console.log("closing")
        this.createSprites();
        
    }

    makeDoor(start, colour){
        //this one is part made but feel free to add stuff
        //just keep in the line about pushing it to this.sprites; that's necessary to remove stuff
        //you might find it useful to set the "rotation speed" of outp;
        //that's a value sprites can have
        let outp = new Sprite([start, this.midway]);
        outp.collider = "static";
        outp.colour = colour;
        this.sprites.push(outp);
        return outp;
    }

    //completed functions
    getSprites(){return this.sprites}
}