/*NOTE for Leon/Daniil:
At the bottom of this are two methods, "canalVisualize" and "canalAnimate". Both are empty in the canal superclass.
any aesthetic stuff you add to canalVisualize will happen once during the setup function.
Anything you add to canalAnimation will happen repeatedly as part of the draw function.

the attributes redStart, blackStart, redEnd and blackEnd are each 2-number arrays holding coordinate pairs for the 
four corners of each segment, so you can use them to decorate and add sprites to the inside of the canals. 

(Leon - I think last time I gave you a Quad_Strip shape with four vertices? that old code is still in docs if
you want to adapt it for here)

UPDATE!! - if you add any sprites, please add a line to push them to this.allSprites, as that's necessary
to removing sprites cleanly when done.

*/

let garbagePieceCnt = 0;
// let playerInFinalSegment = false;
let finishLineCrossed = false;

class canal{

    //construction functions
    constructor(length, oClock, width, player, garbageOn = true, finish = false){
        //basic attributes
        this.length = length;
        this.angle = clockToAngle(oClock);
        this.oClock = oClock;//remove if this works
        this.width = width;


        //trigonometric attributes used by the network
        this.xChange = null;
        this.yChange = null;
        this.xWidth = null;
        this.yWidth = null;
        this.setDirectionalAttributes();

        //placement and relational attributes set by the network
        this.prev = null;
        this.next = null;
        this.exit = [];
        this.link = null;

        //DEVELOPER ATTRIBUTES
        //redStart, redEnd, blackStart and blackEnd are initialized by the network and are the four corners
        //of the canal. 

        //redBank and blackBank are both sprite objects

        //this.bankSprites contains all sprites, there should be a similar one for garbage if you want to make one
        //Daniil; can you also push all your garbage to this.allSprites?
        //this.allSprites shold contain all sprites including garbage (and potentially player? not sure)

        this.redStart = null;
        this.redEnd = null;
        this.blackStart = null;
        this.blackEnd = null;

        //gradient and offsets are useful for working out line intersections
        this.gradient = null;
        this.redOff = null;
        this.blackOff = null;
        
        this.redBank;
        this.blackBank;

        this.allSprites = [];
        this.bankSprites = [];

        this.player = player;

        this.garbageOn = garbageOn;
        this.garbage;
        // this.garbagePiece;
        this.finish = finish; 
    }

    getDirection(){
        let a = this.getAngle(true)
        let outp = [];
        if (a <= 180){
            outp.push("right");
        }else{
            outp.push("left");
        }
        if (a <= 90 || a > 270){
            outp.push("up");
        }else{
            outp.push("down");
        }

        return outp;

    }

    //getters

    getAngle(degrees){
        if(degrees){
            return radsToDegrees(this.angle);
        }else{
            return this.angle;
        }
    }

    getPlayer(){return this.player}

    getWidth(){return this.width}

    setDirectionalAttributes(){
        let angle = this.getAngle();
        this.xChange = Math.sin(angle) * this.length;
        this.yChange = -Math.cos(angle) * this.length;

        const perp = angle + Math.PI / 2;

        this.xWidth = Math.sin(perp) * this.width;
        this.yWidth = -Math.cos(perp) * this.width;
    }

    setLink(link){
        this.link = link;
    }

    getLink(link){
        return this.link;
    }

    connect(prev, next){
        this.prev = prev;
        this.next = next;
        //this.setExits();
    }

    getLength(){return this.length;}

    getConnections(type){
        switch(type){
            case "prev":
                return this.prev;
            case "next":
                return this.next;
            case "link":
                return this.link;
        }    
    }

    getCoord(selection){
        switch(selection){
            case "redStart":
                return this.redStart;
            case "redEnd":
                return this.redEnd;
            case "blackStart":
                return this.blackStart;
            case "blackEnd":
                return this.blackEnd;
        }    

    }

    getDirection(){
        let a = this.getAngle(true)
        let outp = [];
        if (a <= 180){
            outp.push("right");
        }else{
            outp.push("left");
        }
        if (a <= 90 || a > 270){
            outp.push("up");
        }else{
            outp.push("down");
        }

        return outp;

    }


    getExits(){
        //will also look different for forks
        //AN (leah): this may be buggy if used irresponsibly. Probably wouldn't work if you have a network
        //which is just a single canal, or if you have a fork with both of its ends unconnected. so
        //don't do that
        if(this.prev === null){
            return [this.redStart, this.blackStart];
        }else if(this.next === null){
            return [this.redEnd, this.blackEnd];
        }else{
            return false;
        }
    }

    createRedBank(){
        this.redBank = this.createBank(this.redStart, this.redEnd, "red")

    }

    createBlackBank(){
        this.blackBank = this.createBank(this.blackStart, this.blackEnd, "black")


    }

    //getter functions
    getChanges(){
        return [this.xChange, this.yChange];
    }


    getWidthChanges(){
        return [this.xWidth, this.yWidth];
    }

    getOClockInDegrees(){
        let rads = clockToAngle(this.oClock);
        return rads *= (180/Math.PI);

    }

    animate(){
        //structured this way to allow subclasses to call their own animation methods on top 
        //of a standard canal one.
        this.canalAnimate();
    }

    createSprites(){
        this.createRedBank();
        this.createBlackBank();
        if(this.garbageOn){
            this.createGarbage();
        }
        if(this.finish) {
            this.closeMapEnd();
        }
    }

    setCoords(redStart, blackStart, redEnd, blackEnd){
        this.redStart = redStart;
        this.redEnd = redEnd;
        this.blackStart = blackStart;
        this.blackEnd = blackEnd;
        this.gradient = gradient(redStart, redEnd);
        this.redOff = offset(this.gradient, redStart);
        this.blackOff = offset(this.gradient, blackStart);
    }

    createBank(start, end, colour = null;){
        let outp = new Sprite([start, end]);
        outp.collider = "static";
        if(colour != null){
            outp.color = colour;
        }
        this.allSprites.push(outp);
        this.bankSprites.push(outp);
        return outp;
    }

    getBanks(){return this.bankSprites}

    getGradient(){return this.gradient}

    getOffset(bank){
        if(bank === "red"){
            return this.redOff;
        }else if(bank === "black"){
            return this.blackOff
        }
        throw new Error("Incorrect use of canal.getOffset; has to be red or black. Message leah with any questions");
    }

    rebuildToExit(red, black){
        if(this.link === null){
            throw new Error("Improper use of rebuildToExit function");
        }
    }
    //aesthetic functions

    canalAnimate(){
        //TO ADD: moving water textures, potentially trash
        //text(radsToDegrees(this.angle), this.redStart[0] + 20, this.redStart[1] + 20)
        

        // for (let sprite of this.allSprites) {
        //     // if (this.player.collides(sprite)) console.log("COLLISION");
        //     // if (sprite.colliding(this.player)) console.log("COLLISION");
        //     // if (this.player.collided(sprite)) console.log("COLLISION");
        // }

    }

    closeMapEnd() {
        let endMapBank = new Sprite([this.redEnd, this.blackEnd]);
        let finishLine = new Sprite([this.redStart, this.blackStart]);
        // finishLine.overlaps(allSprites);
        this.player.overlaps(finishLine, finish);
        finishLine.visible = false;
        endMapBank.collider = STA;
        // finishLine.collider = "none";
        this.allSprites.push(endMapBank);
        this.allSprites.push(finishLine);
    }

    createGarbage() {

        this.garbage = new Group();
        this.garbage.amount = this.getRandomInt(1, 4);
        // console.log(this.garbage.amount);
        this.garbage.diameter = 10;
        // this.garbage.collider = NONE;

        for (let piece of this.garbage) {
            let offsetAlongCanal = this.getRandomFloat(0.1, 0.9);
            // console.log(offsetAlongCanal);
        
            let balckPosition = this.pointBetween(this.blackStart, this.blackEnd, offsetAlongCanal);
            let redPosition = this.pointBetween(this.redStart, this.redEnd, offsetAlongCanal);
    
            let offsetBetweenCanals = this.getRandomFloat(0.05, 0.95);;
    
            let garbageSpriteCoordinates = this.pointBetween(balckPosition, redPosition, offsetBetweenCanals);
    
            piece.x = garbageSpriteCoordinates[0];
            piece.y = garbageSpriteCoordinates[1];
            piece.collider = "none";
        }

        this.player.overlaps(this.garbage, collect);

        this.allSprites.push(this.garbage);
    }

    remove(){
        for(const sprite of this.allSprites){
            sprite.remove();
            garbagePieceCnt = 0;
        }
    }

    pointBetween(P1, P2, t) {
        return [
            (P1[0] + t * (P2[0] - P1[0])), 
            (P1[1] + t * (P2[1] - P1[1]))
        ];
    }

    getRandomFloat(min, max) {
        return (Math.random() * (max - min) + min);
    }

    getRandomInt(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }

    determineIntersects(canal){
        let grad = this.getGradient();
        let rOff = this.getOffset("red");
        let bOff = this.getOffset("black");

        let cGrad = canal.getGradient();
        let cROff = canal.getOffset("red");
        let cBOff = canal.getOffset("black");

        let rSect = linearIntersect(grad, rOff, cGrad, cROff);
        let bSect = linearIntersect(grad, bOff, cGrad, cBOff);
        return [rSect, bSect]
    }

    removeOneBank(target){
        if(target === "red"){
            this.redBank.remove();
        }else if(target === "black"){
            this.blackBank.remove();
        }else{
            throw new Error("Improper use of removeOneBank function.")
        }
    }

    rebuildBank(targetBank, c1, c2){
        let start = this.getCoord(targetBank.concat("Start"));
        let end = this.getCoord(targetBank.concat("End"));

        let c1FromStart = getHypotenuse(start, c1);
        let c2FromStart = getHypotenuse(start, c2);
        let closePoint = Math.min(c1FromStart, c2FromStart);
        let nearPoint, farPoint;
        if(closePoint === c1FromStart){
            nearPoint = c1;
            farPoint = c2;
        }else{
            nearPoint = c2;
            farPoint = c1;
        }

        let firstLinkPiece = this.createBank(start, nearPoint, targetBank);

        let secondLinkPiece = this.createBank(farPoint, end, targetBank);


        //remember to push the banks! 
    }

}
 
function collect(player, gem) {
	gem.remove();
    garbagePieceCnt++;
    pursuerMoveCooldown += 15;
}

function finish(player) {
    finishLineCrossed = true;
    // state = GameState.WIN;
    // console.log(finishLineCrossed);
}