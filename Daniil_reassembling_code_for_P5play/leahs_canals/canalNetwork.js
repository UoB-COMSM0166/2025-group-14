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

        this.coords = null;
        this.setCoordinates();

        this.connectCanals();
        this.createSprites();
    }

    setCoordinates(){
        this.coords = [[this.x, this.y]];
        let prev;
        for(let i = 0; i < this.course.length; i++){
            prev = this.coords[i];
            this.coords.push(this.findNextCoords(prev, this.course[i]));
        }

    }

    findNextCoords(coordinates, canal){;
        let x = coordinates[0];
        let y = coordinates[1];
        x += canal.getChanges()[0];
        y += canal.getChanges()[1];
        return [x, y];
    }

    connectCanals(){
        const l = this.course.length;
        let current;
        let prev;
        let next;
        for(let i = 0; i < l; i++){
            current = this.course[i];
            current.positionBanks(this.coords[i], this.coords[i + 1]);

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


    createSprites(){
        const l = this.course.length;
        let current;
        for(let i = 0; i < l; i++){
            current = this.course[i];
            current.visualize();
        }
    }

    animate(){
        const l = this.course.length;
        let current;
        for(let i = 0; i < l; i++){
            current = this.course[i];
            current.animate();
        }
    }

}