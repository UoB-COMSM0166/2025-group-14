// const X_MIDDLE = innerHeight / 2
// const Y_MIDDLE = innerWidth / 2
const windowThird = innerWidth / 3
let c1, c2, c3, c4, c5, c6;  

class canalBuilder {
    constructor(length) {
        this.canalWidth = 120
        this.xStartPos = 0
        this.yStartPos = innerHeight / 2
        this.yEndPos = innerHeight / 2
        this.windowScale = innerWidth / length
        this.xEndPos = this.xStartPos + this.windowScale
        this.segments = []

        for (let i = 0; i < length; i++) {
            this.segments.push(new segment(this.canalWidth, i.toString(), this.xStartPos, this.yStartPos, this.xEndPos, this.yEndPos))
            this.xStartPos = this.xEndPos
            this.yStartPos = this.yEndPos
            this.xEndPos += this.windowScale
            if (i % 2 == 0) {
                this.yEndPos += 50
            }
            else {
                this.yEndPos -= 50
            }
        }
    }
}

// TODO change this abomination
// TODO keep leahs test map as an option
class LevelController {
    constructor() {
        this.level = 0
        this.canals = []
    }

    levelOne() {
        this.canals.push(new canal(3))

        // let prev, cur, next
        // for (let i = 0; i < this.canals[0].segments.length; i++) {
        //     prev = this.canals[0].segments[i - 1]
        //     cur = this.canals[0].segments[i]
        //     next = this.canals[0].segments[i + 1]
        //     if (i == 0) {
        //         prev = null
        //     }
        //     if (i == 2) {
        //         next = null
        //     }
        //     cur.setConnections(prev, next)
        // }

        this.canals[0].segments[0].setConnections(null, this.canals[0].segments[1]);
        this.canals[0].segments[1].setConnections(this.canals[0].segments[0], this.canals[0].segments[2]);
        this.canals[0].segments[2].setConnections(this.canals[0].segments[1], null);
        return this.canals[0].segments[0]
    }

    

    // levelTwo() {
    //     let xpos = windowWidth/3;
    //     let ypos = windowHeight/2;
    //     this.c1 = new canal(canalWidth, "first", 0, ypos, xpos, ypos);
    //     this.c2 = new canal(canalWidth, "second", xpos, ypos, xpos*2, ypos-50);
    //     this.c3 = new canal(canalWidth, "third", xpos*2, ypos-50, windowWidth, ypos);
    //     this.c1.setConnections(null, this.c2);
    //     this.c2.setConnections(this.c1, this.c3);
    //     this.c3.setConnections(this.c2, null);
    // }

    testingLevel() {
        c1 = new canal(canalWidth, "Starter", 200, 300, 400, 450);
        c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600);
        c3 = new canal(canalWidth, "ThirdElement", 200, 500, 550, 620);
        c4 = new canal(canalWidth, "Uphill", 550, 400, 600, 100, 5, 3);
        c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150);
        c6 = new canal(canalWidth, "victory", 100, 150, 200, 300);
        c1.setConnections(c6, c2);
        c2.setConnections(c1, c3);
        c3.setConnections(c2, c4);
        c4.setConnections(c3, c5);
        c5.setConnections(c4, c6);
        c6.setConnections(c5, c1);
        return c6;
    }

    show(endOfLevel) {
        textSize(100);
        if (this.level == 0) {
            text("LEVEL 1", windowWidth/2-100, 100);
        }

        // for (const part of this.canals[this.level].segments) {
        //     part.visualize()
        // }

        c1.visualize();
        c2.visualize();
        c3.visualize();
        c4.visualize();
        c5.visualize();
        c6.visualize();


        // this.canals[0].segments[0].visualize()
        // this.canals[0].segments[1].visualize()
        // this.canals[0].segments[2].visualize()

        // if (endOfLevel) {
        //     this.levelTwo()
        //     this.level = 2
        //     text("LEVEL 2", windowWidth/2-100, 200)
        // }
    }

}