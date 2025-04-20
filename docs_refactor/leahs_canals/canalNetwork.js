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

class canalNetwork extends linearConnect{
    constructor(x, y, course, links, loop = false){
        super()
        this.x = x;
        this.y = y;
        this.course = this.extractCourse(course);

        this.setRedCoords();      
        this.setBlackCoords();

        this.connectCanals();

        this.bestowCoords();
        this.createSprites();
        this.createEndSprites()
        
        this.setBankSprites();

        this.links = this.setLinks(links);

    }

    extractCourse(course){
        let output = []
        for(let c of course){
            if(c instanceof canal){
                output.push(c)
            }else{
                let extracted = this.extractCourse(c);
                for(let e of extracted){
                    output.push(e);
                }
            }
        }
        return output;
    }

    createEndSprites(){
        this.course[0].createEnd("Start");
        this.course[this.course.length - 1].createEnd("End");
    }

    
    getStartCoords(){return [this.x, this.y]}

    setLinks(input){
        if(input === null || input.length < 1){
            return [];
        }
        for(const link of input){
            let origin = link[0];
            if(!this.course.includes(origin)){
                throw new Error("Attempting to link via a canal outside this network");
            }
            if(link.length != 2){
                throw new Error("Links must specify exactly two canals");
            }
            if((!link[0] instanceof canal) || (!link[1] instanceof canal)){
                throw new Error("Links must be between canal objects")
            }
        }
        return input;
    }

    getLinks(){return this.links;}

    getBankSprites(){ return this.bankSprites};

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

    setRedCoords(){
        this.redCoords = [[this.x, this.y]];
        let prev;
        for(let i = 0; i < this.course.length; i++){
            prev = this.redCoords[i];
            this.redCoords.push(this.findNextCoords(prev, this.course[i]));
        }
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


    checkForCanal(canal){
        if(this.course.includes(canal)){
            return true;
        }
        return false;        
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

    remove(){
        this.forAllCanals(canal => canal.remove());
    }
}