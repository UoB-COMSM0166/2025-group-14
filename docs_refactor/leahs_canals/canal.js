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



class canal{

    //construction functions
    constructor(length, oClock, width, player){
        //basic attributes
        this.length = length;
        this.oClock = oClock;
        this.width = width;

        //trigonometric attributes used by the network
        this.horizontal = null;
        this.vertical = null;
        this.xChange = null;
        this.yChange = null;
        this.setDirectionalAttributes();

        //placement and relational attributes set by the network
        //note that prev and next have to be set before black can be determined
        this.redStart = null;
        this.redEnd = null;
        this.prev = null;
        this.next = null;
        this.blackGrad = null;
        this.blackOff= null;
        this.blackCoords = null;
        this.blackStart = null;
        this.blackEnd = null;

        this.absoluteAngle = null;
        
        this.redBank;
        this.blackBank;

        this.allSprites = [];

        this.player = player;
        this.garbage;
        // this.garbagePiece;
    }


    setDirectionalAttributes(){

        //note that at the moment this uses a decimal clock face
        //ie, "3.3" is "3 and a third", not "3 and a half";

        const half = Math.PI;
        const quart = Math.PI/2;
        let angle;
        let opp;
        let adj

        const fullAngle = this.clockToAngle(this.oClock);

        if(this.oClock <= 3){
            angle = quart - fullAngle;
            adj = Math.cos(angle) * this.length;
            opp = Math.sin(angle) * this.length;

            this.horizontal = "right";
            this.vertical = "up";
            this.xChange = adj;
            this.yChange = opp * -1
        }else if(this.oClock <= 6){
            angle = half - fullAngle;
            adj = Math.cos(angle) * this.length;
            opp = Math.sin(angle) * this.length;

            this.horizontal = "right";
            this.vertical = "down";
            this.xChange = opp;
            this.yChange = adj;
        }else if(this.oClock <= 9){
            
            angle = half + quart - fullAngle;
            adj = Math.cos(angle) * this.length;
            opp = Math.sin(angle) * this.length;

            this.horizontal = "left";
            this.vertical = "down";
            this.xChange = adj * -1;
            this.yChange = opp;
        }else if(this.oClock <= 12){
            
            angle = half + half - fullAngle;
            adj = Math.cos(angle) * this.length;
            opp = Math.sin(angle) * this.length;

            this.horizontal = "left";
            this.vertical = "up";
            this.xChange = opp * -1;
            this.yChange = adj * -1
        }else{
            throw new Error("Angles must be less than or equal to twelve");
        }
    }

    //setter functions
    positionBanks(start, end){
        this.redStart = start;
        this.redEnd = end;
        this.absoluteAngle = this.angleCalc(start[0], start[1], end[0], end[1], false, true);
        this.positionBlackBank();
    }


    positionBlackBank(){
        let a = this.angleCalc(this.redStart[0], this.redStart[1], this.redEnd[0], this.redEnd[1], true, false)
        let opp = Math.sin(a) * this.width;
        let adj = Math.cos(a) * this.width;

        //maths here is bodged to make use of some of my former functions, will simplify

        let startX, startY, endX, endY;

        if(this.horizontal === "right"){
            startX = this.redStart[0] + opp;
            endX = this.redEnd[0] + opp
            startY = this.redStart[1] + adj;
            endY = this.redEnd[1] + adj;
        }else{
            startX = this.redStart[0] - opp;
            endX = this.redEnd[0] - opp;
            startY = this.redStart[1] - adj;
            endY = this.redEnd[1] - adj
        }

        this.blackCoords = [startX, startY, endX, endY];

        //below is useful in debugging

        /*let greenBank = new Sprite([[startX, startY], [endX, endY]]);
        greenBank.colour = "green";*/

        this.blackGrad = this.gradient(startX, startY, endX, endY);
        this.blackOff = this.offset(this.blackGrad, startX, startY);

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
        const ours = [this.blackGrad, this.blackOff];

        let nextSect, prevSect, nexts, prevs;
        if(this.next != null){
            nexts = this.next.getBlackDetails();
            nextSect = this.linearIntersect(ours[0], ours[1], nexts[0], nexts[1]);
        }else{
            nextSect = [this.blackCoords[2], this.blackCoords[3]];
        }

        if(this.prev != null){
            prevs = this.prev.getBlackDetails();
            prevSect = this.linearIntersect(ours[0], ours[1], prevs[0], prevs[1])
        }else{
            prevSect = [this.blackCoords[0], this.blackCoords[1]];
        }

        this.blackStart = prevSect;
        this.blackEnd = nextSect;

        this.blackBank = this.createBank(prevSect, nextSect);
        this.blackBank.colour = "black";

    }

    //getter functions
    getChanges(){
        return [this.xChange, this.yChange];
    }

    getOClockInDegrees(){
        let rads = this.clockToAngle(this.oClock);
        return rads *= (180/Math.PI);

    }


    getBlackDetails(){return [this.blackGrad, this.blackOff];}

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
        this.createGarbage();
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
        return outp;
    }

    //other useful functions (called internally)
    gradient(x1, y1, x2, y2){
        const numer = y2-y1;
        const denom = x2-x1;
        const outp = numer/denom;
        return outp;
    }

    offset(gradient, X, Y){
        return -1 * ((gradient * X) - Y);
    }

    angleCalc(startX, startY, endX, endY, rads, atan2){
        let opp = endY - startY;
        let adj = startX - endX
        let tanoutp = opp/adj;
        let outp;
        if(atan2){
            outp = Math.atan2(tanoutp);
        }else{
            outp = Math.atan(tanoutp);
        }
        if(rads){
            return outp;
        }else{
            return this.radsToDegrees(outp);
        }
    } 
    

    linearIntersect(a1, c1, a2, c2){
        let x = ((-1*c2) + c1)/((-1*a1) + a2);
        let y = ((c1*a2) - (c2*a1))/((-1*a1)+a2);
        return [x, y];
    }

    halfwayPoint(start, end){
        let xStart = start[0];
        let yStart = start[1];

        let xChange = end[0] - start[0];
        let yChange = end[1] - start[1];

        xChange /= 2;
        yChange /= 2;

        xStart += xChange;
        yStart += yChange;

        return [xStart, yStart];

    }

    clockToAngle(oClock){
        return oClock * Math.PI / 6;
    }

    radsToDegrees(rads){
        return rads *= (180/Math.PI);
    }

    //aesthetic functions

    canalVisualize(){

    }

    canalVisualizeWithAllCoordinates() {

    }

    canalAnimate(){
        //TO ADD: moving water textures, potentially trash
        let position = this.halfwayPoint(this.redStart, this.blackStart);

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
    console.log("collected a piece of garbage");
}