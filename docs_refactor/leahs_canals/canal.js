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

class canal{

    //construction functions
    constructor(length, oClock, width, player, garbageOn = true){
        //basic attributes
        this.length = length;
        this.angle = clockToAngle(oClock);
        this.oClock = oClock;//remove if this works
        this.width = width;


        //trigonometric attributes used by the network
        this.horizontal = null;
        this.vertical = null;
        this.xChange = null;
        this.yChange = null;
        this.xWidth = null;
        this.yWidth = null;
        this.setDirectionalAttributes();

        /*this.horizontal = this.getDirection()[0];
        this.vertical = this.getDirection()[1];*/

        //placement and relational attributes set by the network
        this.prev = null;
        this.next = null;

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

        //this.absoluteAngle = null;
        
        this.redBank;
        this.blackBank;

        this.allSprites = [];
        this.bankSprites = [];

        this.player = player;

        this.garbageOn = garbageOn;
        this.garbage;
        // this.garbagePiece;
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

    setDirectionalAttributes(){
        let angle = this.getAngle();
        this.xChange = Math.sin(angle) * this.length;
        this.yChange = -Math.cos(angle) * this.length;

        const perp = angle + Math.PI / 2;

        this.xWidth = Math.sin(perp) * this.width;
        this.yWidth = -Math.cos(perp) * this.width;
    }

    connect(prev, next){
        this.prev = prev;
        this.next = next;
    }

    createRedBank(){
        this.redBank = this.createBank(this.redStart, this.redEnd)
        this.redBank.colour = "red";
    }

    createBlackBank(){
        this.blackBank = this.createBank(this.blackStart, this.blackEnd)
        this.blackBank.colour = "black";

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


    //other functions (called externally)
    visualize(){
        this.canalVisualize();    
        this.createSprites();
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
    }

    setCoords(redStart, blackStart, redEnd, blackEnd){
        this.redStart = redStart;
        this.redEnd = redEnd;
        this.blackStart = blackStart;
        this.blackEnd = blackEnd;
    }

    // // Daniil: I am not that familiar how inheritance works in JavaScript, but apparently
    // // if you have a method that appears both on parent and daughter class, and that method 
    // // is called on a daughter class object, both methods are executed. It's weird, but 
    // // it works: both the banks and gates disappear at restart.
    // removeSprites() { 
    //     this.blackBank.remove();
    //     this.redBank.remove();
    // }

    createBank(start, end){
        let outp = new Sprite([start, end]);
        outp.collider = "static";
        this.allSprites.push(outp);
        this.bankSprites.push(outp);
        return outp;
    }

    getBanks(){return this.bankSprites}
    //aesthetic functions

    canalVisualize(){

    }

    canalVisualizeWithAllCoordinates() {

    }

    canalAnimate(){
        //TO ADD: moving water textures, potentially trash
        text(radsToDegrees(this.angle), this.redStart[0] + 20, this.redStart[1] + 20)
        

        // this.player.overlaps(gems, collect);

        
    }

    createGarbage() {

        this.garbage = new Group();
        this.garbage.amount = 3;
        this.garbage.diameter = 10;

        for (let piece of this.garbage) {
            let offsetAlongCanal = Math.random();
            // console.log(offsetAlongCanal);
        
            let balckPosition = this.pointBetween(this.blackStart, this.blackEnd, offsetAlongCanal);
            let redPosition = this.pointBetween(this.redStart, this.redStart, offsetAlongCanal);
    
            let offsetBetweenCanals = Math.random();
    
            let garbageSpriteCoordinates = this.pointBetween(balckPosition, redPosition, offsetBetweenCanals);
    
            // this.garbagePiece = new Sprite(garbageSpriteCoordinates[0], garbageSpriteCoordinates[1], 10);
            // let garbagePiece = new this.garbage.Sprite();
            piece.x = garbageSpriteCoordinates[0];
            piece.y = garbageSpriteCoordinates[1];
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

}
 
function collect(player, gem) {
	gem.remove();
    garbagePieceCnt++;
    console.log("Pieces of garbage collected: " + garbagePieceCnt);
    
}