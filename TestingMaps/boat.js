class boat{
    constructor(speed, startX, startY, width, height, farCorner){
        //relevant metrics to boat motion
        this.speed = speed;
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;

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


        //stuff that makes sure the boat interacts with the canal okay
        this.farCorner = farCorner;
        this.canal = null;
        this.redBank = null;
        this.blackBank = null;
        this.afterThreshold = null;
        this.beforeThreshold = null;


    }

    setCanal(canal){
        this.canal = canal;
        this.redBank = canal.redBank;
        this.blackBank = canal.blackBank;
        if(canal.afterThreshold != null){
            this.afterThreshold = canal.afterThreshold;
        }
        if(canal.beforeThreshold != null){
            this.beforeThreshold = canal.beforeThreshold;
        }
    }

    //puts the boat on the canvas; this is where motion stuff all goes
    visualize(){
        //sets limits based on the locations of the edges of the canal object where the boat is
        let setting = this.canal;
        let redYLimit = limitY(this.x, this.redBank.gradient, this.redBank.offset);//upperlimit
        let redXLimit = limitX(this.y, this.redBank.gradient, this.redBank.offset);
        let blackYLimit = limitY(this.x, this.blackBank.gradient, this.blackBank.offset);//lowerlimit
        let blackXLimit = limitX(this.y, this.blackBank.gradient, this.blackBank.offset);



        let s = this.speed;
        if(keyIsPressed){
      
            if(key === 'w' && this.y > redYLimit){
                this.chngDirShape();
                this.y -= s;
           
            }
            if(key === 's' && this.y < blackYLimit){
                this.chngDirShape();
                this.y += s;
            
            }
            if(key === 'd' && this.x < redXLimit){
                this.chngDirShape();
                this.x += s;
        
            }
            if(key === 'a' && this.x > blackXLimit){
                this.chngDirShape();
                this.x -= s;
   
            }
        }

        fill(0);
        ellipse(this.x, this.y, this.width, this.height);



        //tests if the boat has moved to another canal segment, and shifts it there if so
        this.borderTest(setting);


    }

    borderTest(setting){
        let afterBorderHor = this.farCorner;
        let afterBorderVer = this.farCorner;
        let beforeBorderHor = 0;
        let beforeBorderVer = 0;

        if(setting.after != null){
       
            afterBorderHor = limitX(this.y, this.afterThreshold.gradient, this.afterThreshold.offset);
            afterBorderVer = limitY(this.x, this.afterThreshold.gradient, this.afterThreshold.offset);

        }
        if(setting.before != null){

            beforeBorderHor = limitX(this.y, this.beforeThreshold.gradient, this.beforeThreshold.offset);
            beforeBorderVer = limitY(this.x, this.beforeThreshold.gradient, this.beforeThreshold.offset);
        }

        if(this.y > afterBorderVer && this.x > afterBorderHor){
            let pasturesNew = this.canal.after;
            this.setCanal(pasturesNew);
            console.log("switched to canal with name " + this.canal.name);//testprint 

        }

        
        if(this.y < beforeBorderVer && this.x < beforeBorderHor){
            let pasturesNew = this.canal.before;
            this.setCanal(pasturesNew);
            console.log("switched to canal with name " + this.canal.name);//testprint
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



