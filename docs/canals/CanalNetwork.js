class CanalNetwork extends linearConnect{
    constructor(x, y, course, links = [], loop = false){
        super()
        this.x = x;
        this.y = y;
        this.course = this.extractCourse(course); //recursive function allows nesting of canals in multidimensional arrays

        this.setRedCoords(loop);      
        this.setBlackCoords(loop);

        this.connectCanals(loop);

        this.bestowCoords();
        this.createSprites();
        if(!loop){
            this.createEndSprites();
        }
        
        this.setBankSprites();

        this.links = this.setLinks(links);

    }

    extractCourse(course){
        let output = []
        for(let c of course){
            if(c instanceof Canal){
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
        //validates a proposed linkage
        if(input === null || input.length < 1){
            return [];
        }
        for(const link of input){
            let origin = link[0];
            if(!this.course.includes(origin)){
                throw new Error("Attempting to link via a canal outside this network");
            }
            if(link.length != 2 && link.length != 5 && link.length != 4){
                throw new Error("Links must specify exactly two canals");
            }
            if((!link[0] instanceof Canal) || (!link[1] instanceof Canal)){
                throw new Error("Links must be between canal objects")
            }
        }
        return input;

    }

    getLinks(){return this.links;}

    getBankSprites(){ return this.bankSprites};

    bestowCoords(){
        //provides the red and black coordinates calculated for the network to the individual canal objects
        for(let i = 0; i < this.course.length; i++){
            let c = this.course[i];
            let red = this.redCoords[i];
            let black = this.blackCoords[i];
            let nextRed = this.redCoords[i + 1];
            let nextBlack = this.blackCoords[i + 1];
            c.setCoords(red, black, nextRed, nextBlack);
        }
    }

    setRedCoords(loop){
        /*defines an initial set of coordinates based on the angles and lengths of the provided canals; the equivalent
        setBlackCoords function is abstracted into the LinearConnect class*/
        this.redCoords = [[this.x, this.y]];
        let prev;
        for(let i = 0; i < this.course.length; i++){
            prev = this.redCoords[i];
            this.redCoords.push(this.findNextCoords(prev, this.course[i]));
        }
        if(loop){
            this.redCoords.push([this.x, this.y]);
            this.pushLoopCanal();
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

    connectCanals(loop){
        //tells canal objects which other canal objects come before and after them
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
        if(loop){
            let first = this.course[0];
            let last = this.course[this.course.length - 1];
            first.connect(last, first.getConnections("next"));
            last.connect(last.getConnections("prev"), first);
        }
    }

    pushLoopCanal(){
        //creates a new canal liking the start and end of the course
        let penultimate = this.redCoords[this.redCoords.length - 2];
        let penX = penultimate[0];
        let penY = penultimate[1];

        let length = getHypotenuse(penultimate, [this.x, this.y]);
        let oClock = angleToClock(angleCalc(penX, penY, this.x, this.y, true, true, true));
        let width = this.course[0].getWidth();
        let player = this.course[0].getPlayer();
        this.course.push(new Canal(length, oClock, width, player));

    }

    remove(){
        this.forAllCanals(canal => canal.remove());
    }
}