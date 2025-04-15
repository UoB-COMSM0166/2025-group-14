/*HOW TO MAKE A MAP WITH A CANALNETWORK (in case you want to test things)
During setup, create some canal objects (or lock or fork objects but those are under construction).
Arguments for each canal go, in order:
    - length of the segment.
    - direction of the segment in oClock format (ie, 12 points directly upwards)
    - width of the segment
Once you have your canals, in setup, create a new canalNetwork with the following arguments:
    - starting X coordinate
    - starting Y coordinate
    - array of all canals the network will contain

It will start drawing the red back of the first canal at X,Y, and work everything else out from there.
if your map is impossible (ie, the widhts can't physically fit together) it might make the lines go screwy
just resize the components and it'll fix.

finally, add canalNetwork.animate(); to your draw function. 

/*things I can improve if this works as an engine:
- make it so that 3.30 is "3 and a half" not 3 and just under a third
- put something in to handle if we have a canal swallow another (currently this fucks the blackbanks)
*/

class canalNetwork{
    constructor(x, y, course){
        this.x = x;
        this.y = y;
        this.course = course;

        this.redCoords = null;
        this.setRedCoords();      
        this.blackCoords = null;
        this.setBlackCoords();

        this.bestowCoords();
        this.createSprites();

        this.connectCanals();
        
        this.bankSprites = null;
        this.setBankSprites();

        this.exits = [];
        this.setExits();
    }

    getBankSprites(){ return this.bankSprites};

    setBankSprites(){
        this.bankSprites = [];
        let tmp = []
        this.forAllCanals(canal => tmp.push(canal.getBanks()));
        for(const entry of tmp){
            for(const subentry of entry){
                this.bankSprites.push(subentry);
            }
        }

        console.log("Inner: " + this.bankSprites.length);
    }

    bestowCoords(){
        for(let i = 0; i < this.course.length; i++){
            let c = this.course[i];
            let red = this.redCoords[i];
            let black = this.blackCoords[i];
            let nextRed = this.redCoords[i + 1];
            let nextBlack = this.blackCoords[i + 1];
            c.setCoords(red, black, nextRed, nextBlack);
        }
    }
    
    setExits(){
        //this is for linking together networks
        this.forAllCanals(canal => 
            {for(const exit of canal.getExits()){
                console.log("Push to network " + exit);
                this.exits.push(exit)
            }
        }
        )

    }

    setRedCoords(){
        this.redCoords = [[this.x, this.y]];
        let prev;
        for(let i = 0; i < this.course.length; i++){
            prev = this.redCoords[i];
            this.redCoords.push(this.findNextCoords(prev, this.course[i]));
        }
    }
    
    setBlackCoords(){
        let blackChanges = []
        this.forAllCanals(canal =>
            blackChanges.push(canal.getWidthChanges())
        )

        let bc = [];
        let rc = this.redCoords;
        
        let first = rc[0];
        let firstBlack = blackChanges[0];
        bc.push([first[0] + firstBlack[0], first[1] + firstBlack[1]]);

        let i;
        for(i = 1; i < rc.length -1; i++){
            let red = rc[i];
            let prev = blackChanges[i - 1];
            let next = blackChanges[i];
            let prevEnd = [red[0] + prev[0], red[1] + prev[1]];
            let nextStart = [red[0] + next[0], red[1] + next[1]];
            let pRed = rc[i - 1];
            let nRed = rc[i + 1];
            let pGrad = gradient(pRed, red);
            let nGrad = gradient(red, nRed);
            let prevOff = offset(pGrad, prevEnd);
            let nextOff = offset(nGrad, nextStart);
            let int = linearIntersect(pGrad, prevOff, nGrad, nextOff);
            bc.push(int);
        }

        let last = rc[i];
        let lastChange = blackChanges[i - 1];
        bc.push([last[0] + lastChange[0], last[1] + lastChange[1]])

        

        this.blackCoords = bc;
    
    }

    findNextCoords(coordinates, canal){;
        let x = coordinates[0];
        let y = coordinates[1];
        x += canal.getChanges()[0];
        y += canal.getChanges()[1];
        return [x, y];
    }

    forAllCanals(callback){
        for(const canal of this.course){
            callback(canal);
        }
    }

    connectCanals(){
        const l = this.course.length;
        let current;
        let prev;
        let next;
        for(let i = 0; i < l; i++){
            current = this.course[i];
            if(i === 0){
                prev = null;
            }else{
                prev = this.course[i - 1];
            }

            if(i + 1 === l){
                next = null;
            }else{
                next = this.course[i + 1];
            }
            current.connect(prev, next);
        }
    }

    getExits(){
        return this.exits;
    }


    createSprites(){
        this.forAllCanals(canal => canal.visualize());
    }

    animate(){
        this.forAllCanals(canal => canal.animate());
        console.log("Exits at draw-time: " + this.getExits());
        for(const exit of this.getExits()){
            fill("green");
            circle(exit[0][0], exit[0][1], 20);
        }

        //throw Error("breakpoint lol");
    }

    remove(){
        this.forAllCanals(canal => canal.remove());
    }
}