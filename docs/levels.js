class canalBuilder {
    constructor(length) {
        // this.end = innerWidth - 1;
    }

    circLevel() {
        let canals = []
        canals.push(new canal(canalWidth, "Starter", 200, 300, 400, 450));
        canals.push(new canal(canalWidth, "Steep", 250, 350, 330, 600));
        canals.push(new canal(canalWidth, "ThirdElement", 200, 500, 550, 620));
        canals.push(new canal(canalWidth, "Uphill", 550, 400, 600, 100, 5, 3));
        canals.push(new canal(canalWidth, "Crossbar", 600, 150, 100, 150));
        canals.push(new canal(canalWidth, "victory", 100, 150, 200, 300));
        canals[0].setConnections(canals[5], canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[0]);
        return canals;
    }

    level1() {
        let canals = []
        let x = 0
        let y = innerHeight / 2
        let third = innerWidth / 3

        canals.push(new canal(canalWidth, "0", x, y, x+third, y));
        canals.push(new canal(canalWidth, "1", x+third, y, x+(2*third), y+50));
        canals.push(new canal(canalWidth, "2", x+(2*third), y+50, innerWidth - 1, y));

        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], null);

        return canals;
    }

    level2() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let third = innerWidth / 3;

        canals.push(new canal(canalWidth, "4", x, y, x+third, y));
        canals.push(new canal(canalWidth, "5", x+third, y, x+(2*third), y-50));
        canals.push(new canal(canalWidth, "6", x+(2*third), y-50, innerWidth, y));

        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], null);


        return canals;
    }

//     flatLevel(length) {
//         for (let i = 0; i < length; i++) {
//             this.canals.push(new canal(canalWidth, i.toString(), this.xStartPos, this.yStartPos, this.xEndPos, this.yEndPos))
//             this.xStartPos = this.xEndPos
//             this.yStartPos = this.yEndPos
//             this.xEndPos += this.windowScale
//             if (i % 2 == 0) {
//                 this.yEndPos += 50
//             }
//             else {
//                 this.yEndPos -= 50
//             }
//             if (i == length - 2) {
//                 this.xEndPos -= 1
//             }
//         }
//         return 

//     }
}

// TODO change this abomination
// TODO keep leahs test map as an option
class LevelController {
    constructor() {
        this.level = 0;
        this.canals = [];
        this.builder = new canalBuilder();
        this.levelMethods = [
            this.levelOne.bind(this),
            this.levelTwo.bind(this),
        ]

    }

    levelOne() {
        this.canals[0] = this.builder.level1();
        return this.canals[0][0];
    }

    levelTwo() {
        // this.level = 1
        this.canals[1] = this.builder.level2();
        return this.canals[1][0];
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

    circularLevel() {
        // this.canals.push(new canal(canalWidth, "Starter", 200, 300, 400, 450));
        // this.canals.push(new canal(canalWidth, "Steep", 250, 350, 330, 600));
        // this.canals.push(new canal(canalWidth, "ThirdElement", 200, 500, 550, 620));
        // this.canals.push(new canal(canalWidth, "Uphill", 550, 400, 600, 100, 5, 3));
        // this.canals.push(new canal(canalWidth, "Crossbar", 600, 150, 100, 150));
        // this.canals.push(new canal(canalWidth, "victory", 100, 150, 200, 300));
        // this.canals[0].setConnections(this.canals[5], this.canals[1]);
        // this.canals[1].setConnections(this.canals[0], this.canals[2]);
        // this.canals[2].setConnections(this.canals[1], this.canals[3]);
        // this.canals[3].setConnections(this.canals[2], this.canals[4]);
        // this.canals[4].setConnections(this.canals[3], this.canals[5]);
        // this.canals[5].setConnections(this.canals[4], this.canals[0]);
        // return this.canals[5];
        this.canals[0] = this.builder.circLevel();
        return this.canals[0];
    }

    nextLevel() {
        this.level += 1;
        this.levelMethods[this.level]();
    }

    show(endOfLevel) {
        textSize(100);

        text("LEVEL " + (this.level + 1), windowWidth/2-100, 100);

        for (let segment of this.canals[this.level]) {
            segment.visualize();
        }
        if (endOfLevel) {
            this.nextLevel();
            // this.levelTwo();
            // this.level += 1;
        }

        // this.canals[0].visualize();
        // this.canals[1].visualize();
        // this.canals[2].visualize();
        // this.canals[3].visualize();
        // this.canals[4].visualize();
        // this.canals[5].visualize();


        // this.canals[0].segments[0].visualize()
        // this.canals[0].segments[1].visualize()
        // this.canals[0].segments[2].visualize()

        // if (endOfLevel) {
        //     this.levelTwo()
        //     this.level += 1
        //     text("LEVEL 2", windowWidth/2-100, 200)
        // }
    }

}