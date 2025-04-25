class SpeechBubble{
    constructor(x, y, w, h, originX, originY, text){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.originX = originX;
      this.originY = originY;
      this.txt = text;
    }

    addText(txt){
      this.txt = txt;
    }

    show(){
      fill(255, 255, 255);
      stroke(0);
      strokeWeight(2);
      let r = min(this.w, this.h)/4;
      rect(this.x, this.y, this.w, this.h, r);
      stroke(255, 255, 255);
      let offset1 = this.w*0.65;
      let offset2 = this.w*0.85;
      triangle(this.originX, this.originY, this.x + offset1, this.y + this.h - 2, this.x + offset2, this.y + this.h - 2);
      stroke(0, 0, 0);
      line(this.originX, this.originY, this.x + offset1, this.y + this.h);
      line(this.originX, this.originY, this.x + offset2, this.y + this.h);
      textAlign(LEFT, CENTER);
      textSize(12);
      noStroke();
      fill(0, 0, 0);
      text(this.txt, this.x + this.w * 0.08, this.y + this.h*0.5, this.w*0.9);
    }

    //updates position of an existing textbox (useful for tutorial level)
    updatePosition(newX, newY, newOriginX, newOriginY){
      this.x = newX;
      this.y = newY;
      this.originX = newOriginX;
      this.originY = newOriginY;
    }
  }
  