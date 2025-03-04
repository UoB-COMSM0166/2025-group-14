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
        canals.push(new canal(this.canalWidth, "5", x+third, y, x+(2*third), y-100));
        canals.push(new canal(this.canalWidth, "6", x+(2*third), y-100, innerWidth - 1, y));

        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], null);


        return canals;
    }

    level3() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let num = innerWidth / 6;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "7", x, y, x+num, y));
        canals.push(new canal(this.canalWidth, "8", x+num, y, x+(2*num), y-25));
        canals.push(new canal(this.canalWidth, "9", x+(2*num), y-25, x+(3*num), y-50));
        canals.push(new canal(this.canalWidth, "10", x+(3*num), y-50, x+(4*num), y));
        canals.push(new canal(this.canalWidth, "11", x+(4*num), y, x+(5*num), y+50));
        canals.push(new canal(this.canalWidth, "12", x+(5*num), y+50, end, y+75));

        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], null);


        return canals;
    }

    level4() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let step = innerWidth / 7;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "10", x, y, x + step, y - 50));
        canals.push(new canal(this.canalWidth, "11", x + step, y - 50, x + (2 * step), y - 100));
        canals.push(new canal(this.canalWidth, "12", x + (2 * step), y - 100, x + (3 * step), y - 50));
        canals.push(new canal(this.canalWidth, "13", x + (3 * step), y - 50, x + (4 * step), y));
        canals.push(new canal(this.canalWidth, "14", x + (4 * step), y, x + (5 * step), y + 50));
        canals.push(new canal(this.canalWidth, "15", x + (5 * step), y + 50, x + (6 * step), y + 100));
        canals.push(new canal(this.canalWidth, "16", x + (6 * step), y + 100, end, y));

        // Manually set connections
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[6]);
        canals[6].setConnections(canals[5], null);

        return canals;
    }

    level5() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let step = innerWidth / 9;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "14", x, y, x + step, y - 50));
        canals.push(new canal(this.canalWidth, "15", x + step, y - 50, x + (2 * step), y - 80));
        canals.push(new canal(this.canalWidth, "16", x + (2 * step), y - 80, x + (3 * step), y - 40));
        canals.push(new canal(this.canalWidth, "17", x + (3 * step), y - 40, x + (4 * step), y));
        canals.push(new canal(this.canalWidth, "18", x + (4 * step), y, x + (5 * step), y + 40));
        canals.push(new canal(this.canalWidth, "19", x + (5 * step), y + 40, x + (6 * step), y + 100));
        canals.push(new canal(this.canalWidth, "20", x + (6 * step), y + 100, x + (7 * step), y + 60));
        canals.push(new canal(this.canalWidth, "21", x + (7 * step), y + 60, end, y + 20));

        // Manually set connections
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[6]);
        canals[6].setConnections(canals[5], canals[7]);
        canals[7].setConnections(canals[6], null);

        return canals;
    }

    level6() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let step = innerWidth / 10;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "22", x, y, x + step, y - 30));
        canals.push(new canal(this.canalWidth, "23", x + step, y - 30, x + (2 * step), y - 60));
        canals.push(new canal(this.canalWidth, "24", x + (2 * step), y - 60, x + (3 * step), y - 30));
        canals.push(new canal(this.canalWidth, "25", x + (3 * step), y - 30, x + (4 * step), y));
        canals.push(new canal(this.canalWidth, "26", x + (4 * step), y, x + (5 * step), y + 40));
        canals.push(new canal(this.canalWidth, "27", x + (5 * step), y + 40, x + (6 * step), y + 100));
        canals.push(new canal(this.canalWidth, "28", x + (6 * step), y + 100, x + (7 * step), y + 70));
        canals.push(new canal(this.canalWidth, "29", x + (7 * step), y + 70, x + (8 * step), y + 30));
        canals.push(new canal(this.canalWidth, "30", x + (8 * step), y + 30, end, y));

        // Manually set connections
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[6]);
        canals[6].setConnections(canals[5], canals[7]);
        canals[7].setConnections(canals[6], canals[8]);
        canals[8].setConnections(canals[7], null);

        return canals;
    }

    level7() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let step = innerWidth / 11;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "31", x, y, x + step, y - 50));
        canals.push(new canal(this.canalWidth, "32", x + step, y - 50, x + (2 * step), y - 100));
        canals.push(new canal(this.canalWidth, "33", x + (2 * step), y - 100, x + (3 * step), y - 50));
        canals.push(new canal(this.canalWidth, "34", x + (3 * step), y - 50, x + (4 * step), y));
        canals.push(new canal(this.canalWidth, "35", x + (4 * step), y, x + (5 * step), y + 50));
        canals.push(new canal(this.canalWidth, "36", x + (5 * step), y + 50, x + (6 * step), y + 120));
        canals.push(new canal(this.canalWidth, "37", x + (6 * step), y + 120, x + (7 * step), y + 70));
        canals.push(new canal(this.canalWidth, "38", x + (7 * step), y + 70, x + (8 * step), y + 30));
        canals.push(new canal(this.canalWidth, "39", x + (8 * step), y + 30, x + (9 * step), y + 60));
        canals.push(new canal(this.canalWidth, "40", x + (9 * step), y + 60, end, y + 30));

        // Manually set connections
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[6]);
        canals[6].setConnections(canals[5], canals[7]);
        canals[7].setConnections(canals[6], canals[8]);
        canals[8].setConnections(canals[7], canals[9]);
        canals[9].setConnections(canals[8], null);

        return canals;
    }

    level8() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let step = innerWidth / 12;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "41", x, y, x + step, y - 30));
        canals.push(new canal(this.canalWidth, "42", x + step, y - 30, x + (2 * step), y - 80));
        canals.push(new canal(this.canalWidth, "43", x + (2 * step), y - 80, x + (3 * step), y - 120));
        canals.push(new canal(this.canalWidth, "44", x + (3 * step), y - 120, x + (4 * step), y - 80));
        canals.push(new canal(this.canalWidth, "45", x + (4 * step), y - 80, x + (5 * step), y - 30));
        canals.push(new canal(this.canalWidth, "46", x + (5 * step), y - 30, x + (6 * step), y + 20));
        canals.push(new canal(this.canalWidth, "47", x + (6 * step), y + 20, x + (7 * step), y + 70));
        canals.push(new canal(this.canalWidth, "48", x + (7 * step), y + 70, x + (8 * step), y + 120));
        canals.push(new canal(this.canalWidth, "49", x + (8 * step), y + 120, x + (9 * step), y + 80));
        canals.push(new canal(this.canalWidth, "50", x + (9 * step), y + 80, x + (10 * step), y + 40));
        canals.push(new canal(this.canalWidth, "51", x + (10 * step), y + 40, end, y));

        // Manually set connections
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[6]);
        canals[6].setConnections(canals[5], canals[7]);
        canals[7].setConnections(canals[6], canals[8]);
        canals[8].setConnections(canals[7], canals[9]);
        canals[9].setConnections(canals[8], canals[10]);
        canals[10].setConnections(canals[9], null);

        return canals;
    }

    level9() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let step = innerWidth / 13;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "52", x, y, x + step, y - 60));
        canals.push(new canal(this.canalWidth, "53", x + step, y - 60, x + (2 * step), y - 120));
        canals.push(new canal(this.canalWidth, "54", x + (2 * step), y - 120, x + (3 * step), y - 80));
        canals.push(new canal(this.canalWidth, "55", x + (3 * step), y - 80, x + (4 * step), y - 20));
        canals.push(new canal(this.canalWidth, "56", x + (4 * step), y - 20, x + (5 * step), y + 40));
        canals.push(new canal(this.canalWidth, "57", x + (5 * step), y + 40, x + (6 * step), y + 100));
        canals.push(new canal(this.canalWidth, "58", x + (6 * step), y + 100, x + (7 * step), y + 60));
        canals.push(new canal(this.canalWidth, "59", x + (7 * step), y + 60, x + (8 * step), y + 20));
        canals.push(new canal(this.canalWidth, "60", x + (8 * step), y + 20, x + (9 * step), y + 40));
        canals.push(new canal(this.canalWidth, "61", x + (9 * step), y + 40, x + (10 * step), y + 80));
        canals.push(new canal(this.canalWidth, "62", x + (10 * step), y + 80, x + (11 * step), y + 120));
        canals.push(new canal(this.canalWidth, "63", x + (11 * step), y + 120, end, y + 80));

        // Manually set connections
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[6]);
        canals[6].setConnections(canals[5], canals[7]);
        canals[7].setConnections(canals[6], canals[8]);
        canals[8].setConnections(canals[7], canals[9]);
        canals[9].setConnections(canals[8], canals[10]);
        canals[10].setConnections(canals[9], canals[11]);
        canals[11].setConnections(canals[10], null);

        return canals;
    }

    level10() {
        let canals = [];
        let x = 0;
        let y = innerHeight / 2;
        let step = innerWidth / 15;
        let end = windowWidth - 1;

        canals.push(new canal(this.canalWidth, "64", x, y, x + step, y - 50));
        canals.push(new canal(this.canalWidth, "65", x + step, y - 50, x + (2 * step), y - 100));
        canals.push(new canal(this.canalWidth, "66", x + (2 * step), y - 100, x + (3 * step), y - 150));
        canals.push(new canal(this.canalWidth, "67", x + (3 * step), y - 150, x + (4 * step), y - 100));
        canals.push(new canal(this.canalWidth, "68", x + (4 * step), y - 100, x + (5 * step), y - 50));
        canals.push(new canal(this.canalWidth, "69", x + (5 * step), y - 50, x + (6 * step), y));
        canals.push(new canal(this.canalWidth, "70", x + (6 * step), y, x + (7 * step), y + 50));
        canals.push(new canal(this.canalWidth, "71", x + (7 * step), y + 50, x + (8 * step), y + 100));
        canals.push(new canal(this.canalWidth, "72", x + (8 * step), y + 100, x + (9 * step), y + 50));
        canals.push(new canal(this.canalWidth, "73", x + (9 * step), y + 50, x + (10 * step), y));
        canals.push(new canal(this.canalWidth, "74", x + (10 * step), y, x + (11 * step), y - 50));
        canals.push(new canal(this.canalWidth, "75", x + (11 * step), y - 50, x + (12 * step), y - 80));
        canals.push(new canal(this.canalWidth, "76", x + (12 * step), y - 80, x + (13 * step), y - 40));
        canals.push(new canal(this.canalWidth, "77", x + (13 * step), y - 40, end, y));

        // Manually set connections
        canals[0].setConnections(null, canals[1]);
        canals[1].setConnections(canals[0], canals[2]);
        canals[2].setConnections(canals[1], canals[3]);
        canals[3].setConnections(canals[2], canals[4]);
        canals[4].setConnections(canals[3], canals[5]);
        canals[5].setConnections(canals[4], canals[6]);
        canals[6].setConnections(canals[5], canals[7]);
        canals[7].setConnections(canals[6], canals[8]);
        canals[8].setConnections(canals[7], canals[9]);
        canals[9].setConnections(canals[8], canals[10]);
        canals[10].setConnections(canals[9], canals[11]);
        canals[11].setConnections(canals[10], canals[12]);
        canals[12].setConnections(canals[11], canals[13]);
        canals[13].setConnections(canals[12], null);

        return canals;
    }
    flatLevel(length) {
        let canals = [];
        let lastCanalIdx = length - 1;
        let windowScale = windowWidth / length;
        let xStartPos = 0;
        let yStartPos = innerHeight / 2;
        let xEndPos = xStartPos + windowScale;
        let yEndPos = yStartPos;

        for (let i = 0; i < length; i++) {
            // avoids strange behavior if canal exceeds screen width
            if (i == lastCanalIdx) {
                xEndPos -= 1;
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
        this.setConnectionsFlatLevel(canals, length, lastCanalIdx);
        return canals;
    }

    setConnectionsFlatLevel(canals, length, lastCanalIdx) {
        let prev, next;
        for (let i = 0; i < length; i++) {
            // set last or first element correctly
            if (i == 0) {
                prev = null;
                next = canals[i + 1];
            }
            else if (i == lastCanalIdx) {
                prev = canals[i - 1];
                next = null;
            }
            else {
                prev = canals[i - 1];
                next = canals[i + 1];
            }
            canals[i].setConnections(prev, next);
        }
    }
}

class LevelController {
    constructor() {
        this.level = 0;
        this.canals = [10];
        this.builder = new canalBuilder();
        this.levelMethods = [
            this.levelOne.bind(this),
            this.levelTwo.bind(this),
            this.levelThree.bind(this),
            this.levelFour.bind(this),
            this.levelFive.bind(this),
            this.levelSix.bind(this),
            this.levelSeven.bind(this),
            this.levelEight.bind(this),
            this.levelNine.bind(this),
            this.levelTen.bind(this),
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

    levelThree() {
        this.canals[2] = this.builder.level3();
        return this.canals[2][0];
    }

    levelFour() {
        this.canals[3] = this.builder.level4();
        return this.canals[3][0];
    }

    levelFive() {
        this.canals[4] = this.builder.level5();
        return this.canals[4][0];
    }

    levelSix() {
        this.canals[5] = this.builder.level6();
        return this.canals[5][0];
    }

    levelSeven() {
        this.canals[6] = this.builder.level7();
        return this.canals[6][0];
    }

    levelEight() {
        this.canals[7] = this.builder.level8();
        return this.canals[7][0];
    }

    levelNine() {
        this.canals[8] = this.builder.level9();
        return this.canals[8][0];
    }

    levelTen() {
        this.canals[9] = this.builder.level10();
        return this.canals[9][0];
    }

    generatedLevel() {
        let num = randomInt(3, 10);
        this.canals[this.level] = this.builder.flatLevel(num);
        return this.canals[this.level][0];
    }

    circularLevel() {
        this.canals[0] = this.builder.circLevel();
        return this.canals[0][0];
    }

    getCurrentLevel() {
        return this.canals[this.level][0];
    }

    // returns first canal of new level
    nextLevel() {
        this.level += 1;
        // this.generatedLevel();
        this.levelMethods[this.level]();
        return this.canals[this.level][0];
    }

    show() {
        textSize(100);
        text("LEVEL " + (this.level + 1), windowWidth/2-100, 100);

        // if (endOfLevel) {
        //     this.nextLevel();
        // }
        for (let segment of this.canals[this.level]) {
            segment.visualize();
        }
    }
}

// maximum is exclusive
function randomInt(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
  }
