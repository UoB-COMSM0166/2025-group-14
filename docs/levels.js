// generates the canal arrays and sets connections
class canalBuilder {
    constructor(length) {
        this.canalWidth = 80;
        this.canalNum = 0;
    }

    circLevel() {
        let canals = []
        canals.push(new canal(this.canalWidth, "Starter", 200, 300, 400, 450));
        canals.push(new canal(this.canalWidth, "Steep", 250, 350, 330, 600));
        canals.push(new canal(this.canalWidth, "ThirdElement", 200, 500, 550, 620));
        canals.push(new canal(this.canalWidth, "Uphill", 550, 400, 600, 100, 5, 3));
        canals.push(new canal(this.canalWidth, "Crossbar", 600, 150, 100, 150));
        canals.push(new canal(this.canalWidth, "victory", 100, 150, 200, 300));
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

        canals.push(new canal(this.canalWidth, "0", x, y, x+third, y));
        canals.push(new canal(this.canalWidth, "1", x+third, y, x+(2*third), y+50));
        canals.push(new canal(this.canalWidth, "2", x+(2*third), y+50, innerWidth - 1, y));

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

        canals.push(new canal(this.canalWidth, "4", x, y, x+third, y));
        canals.push(new canal(this.canalWidth, "5", x+third, y, x+(2*third), y-50));
        canals.push(new canal(this.canalWidth, "6", x+(2*third), y-50, innerWidth, y));

        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], null);


        return canals;
    }

    flatLevel(length) {
        let canals = [];
        let windowScale = windowWidth / length;
        let xStartPos = 0;
        let yStartPos = innerHeight / 2;
        let xEndPos = xStartPos + windowScale;
        let yEndPos = yStartPos;
        for (let i = 0; i < length; i++) {
            // avoids strange behavior if canal exceeds screen width
            if (i == length - 1) {
                xEndPos--;
            }
            canals.push(new canal(this.canalWidth, this.canalNum++, xStartPos, yStartPos, xEndPos, yEndPos));
            xStartPos = xEndPos;
            yStartPos = yEndPos;
            xEndPos += windowScale;
            // randomising element
            if (i % 2 == 0) {
                yEndPos += 50;
            }
            else {
                yEndPos -= 50;
            }
        }
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], null);
        return canals;
    }
}

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
        this.canals[1] = this.builder.level2();
        return this.canals[1][0];
    }

    generatedLevel() {
        let num = 5;
        this.canals[0] = this.builder.flatLevel(num);
        return this.canals[0][0];
    }

    circularLevel() {
        this.canals[0] = this.builder.circLevel();
        return this.canals[0];
    }

    nextLevel() {
        this.levelMethods[++this.level]();
    }

    show(endOfLevel) {
        textSize(100);
        text("LEVEL " + (this.level + 1), windowWidth/2-100, 100);

        for (let segment of this.canals[this.level]) {
            segment.visualize();
        }
        if (endOfLevel) {
            this.nextLevel();
        }
    }
}