class boat{
    constructor(speed, canal, startX, startY, width, height){
        //relevant metrics to boat motion
        this.speed = speed;
        this.canal = canal;
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;
     

        // TODO this needed?
        //stuff for Daniel's motion as outlined on skeleton file
        //NOTE: Unlike Daniel's boat, this one stops when its MIDDLE, not its FRONT, gets to the border
        //Didn't want to refactor that for this code because I imagine Daniel and Leon will be playing around with that stuff
        if(this.width >= this.height){

            this.prevKey = "horisontal";
            this.front = this.width;
        }else{
            this.prevKey = "vertical";
            this.front = this.height;
        }




    }


    //puts the boat on the canvas; this is where motion stuff all goes
    visualize(){
        //sets limits based on the locations of the edges of the canal object where the boat is
        let setting = this.canal;

        let s = this.speed;
        if(keyIsPressed){
            // up
            if(key === 'w' && this.y > this.canal.getUpperLimit(this.x)){
                this.chngDirShape();
                this.y -= s;
            // down
            }
            if(key === 's' && this.y < this.canal.getLowerLimit(this.x)){
                this.chngDirShape();
                this.y += s;
            // right
            }
            if(key === 'd' && this.x < this.canal.getRightLimit(this.y)){
                this.chngDirShape();
                this.x += s;
            // left
            }
            if(key === 'a' && this.x > this.canal.getLeftLimit(this.y)){
                this.chngDirShape();
                this.x -= s;
   
            }
        }

        fill(0);
        ellipse(this.x, this.y, this.width, this.height);



        //tests if the boat has moved to another canal segment, and shifts it there if so
        this.reachedTheNextOne(setting);


    }

    reachedTheNextOne(setting){
        let pasturesNew = setting.thresholdCheck(this.x, this.y);
        if(pasturesNew != null){
            this.canal = pasturesNew;
            console.log("switched to canal with name " + this.canal.name)
        }
    }


    chngDirShape() {
        if (this.prevKey === "horisontal" && (key === 'w' || key === 's')){
          this.chngShape()
          this.prevKey = "vertical";
        }
        else if (this.prevKey === "vertical" && (key === 'a' || key === 'd')){
          this.chngShape()
          this.prevKey = "horisontal";
        }
    }

    chngShape() {
        let temp = this.width;
        this.width = this.height;
        this.height = temp;
    }

 
      
      

}



