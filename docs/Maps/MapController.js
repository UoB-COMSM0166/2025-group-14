//You can now edit info screen text on InfoTextController

class MapController {   

    static getMap(mapNumber, player) {
        switch(mapNumber) {
            case 0:
                return MapController.getMap0(player);
            case 1:
                return MapController.getMap1(player);
            case 2:
                return MapController.getMap2(player);
            case 3:
                return MapController.getMap3(player);
            case 4:
                return MapController.getMap4(player);
            case 5:
                return MapController.getMap5(player);
            default:
                throw new Error("Invalid map number: " + mapNumber);
        }
    }

    // initialises a player sprite at desired location
    static getPlayer(mapNumber) {
        switch(mapNumber) {
            case 0:
                return new Sprite(100, 70, 35, 25);
            case 1:
                return new Sprite(1500, -100, 35, 25);
            case 2:
                return new Sprite(265, -328, 35, 25);
            case 3:
                return new Sprite(186, 52, 35, 25);
            case 4:
                return new Sprite(225, 407, 35, 25);//originally 225 407; 3122 3070 for surveying the current end
            case 5:
                return new Sprite(122, 45, 25, 15);
            default:
                throw new Error("Invalid map number: " + mapNumber);
        }
    }

    // initialises a pursuer sprite at desired location
    static getPursuer(mapNumber) {
        switch(mapNumber) {
            case 0:
                return new Sprite(100, 70, 25, 15);
            case 1:
                return new Sprite(20, 0, 25, 15);
            case 2:
                return new Sprite(-442, -327, 25, 15);
            case 3:
                return new Sprite(37, 39, 25, 15);
            case 4:
                return new Sprite(5, 82, 25, 15);
            case 5:
                return new Sprite(30, 45, 25, 15);
            default:
                throw new Error("Invalid map number: " + mapNumber);
        }
    }

    static getMap0(player) {
        let c1 = new Canal(1000, 3, 150, player); //TODO update this with new canal structure
        let c2 = new Canal(500, 2, 150, player);
        let c3 = new Canal(1000, 3, 150, player);
        let c4 = new Canal(500, 2.5, 150, player);
        let c5 = new Canal(500, 3.5, 150, player);
        let c6 = new Lock(500, 2, 150, player, 5, 3);
        let c7 = new Canal(500, 12.5, 150, player);
        let c8 = new Canal(500, 11, 150, player, true, true);

        let network = new CanalNetwork(0, 0, [c1, c2, c3, c4 , c5, c6, c7, c8], []); 
        return new CanalMap(player, true, [network]); 
    }
    
    static getMap1(player) {
        // Map creation variables. Values for straight segments
        let stdWidth = 100;
        let stdLength = 300;
        let midPoint = 3;
        // Values for snaking segments
        let gradient = 0.1;
        let sineLength = 15;
        let trough = 4;
        let peak = 2;

        // Map segments.
        // Network one. Initial stretch of map. pursuer is placed far behind the player to begin with, out of sight.
        let seg1 = new Canal(stdLength+1800, 2.8, stdWidth, player);
        let lockSeg1 = new Lock(100, 2.8, stdWidth, player, 2, 4);
        let seg2 = new Canal(100, 2.9, stdWidth, player, false);

        // Looping section that serves as an entry point to the forks
        // Peak and trough change the contour of the snaking segments
        let sineChain1 = this.getSineChain(midPoint, gradient, trough, peak, sineLength, stdWidth, player);
        peak -= 1;
        trough += 1;
        let sineChain2 = this.getSineChain(midPoint, gradient, trough, peak, sineLength, stdWidth, player);

        let seg3 = new Canal(stdLength, 2.5, stdWidth, player);
        let seg4 = new Canal(stdLength/2, 2, stdWidth, player);
        // lock between two forks
        let lockSeg2 = new Lock(stdLength/4, 2, stdWidth, player, 2, 4);
        let seg5 = new Canal(stdLength/2, 2, stdWidth, player);
        let seg6 = new Canal(stdLength, 2.5, stdWidth, player);
        // Curving section approaching the loop in top right
        peak += 1;
        trough -= 1;
        let sineChain3 = this.getSineChain(midPoint, gradient, trough, peak+1, sineLength-10, stdWidth, player);
        let sineChain4 = this.getSineChain(midPoint, gradient, trough, peak, sineLength, stdWidth, player);
        let curveChain1 = [];
        for (let i = 3; i < 5; i+=0.2) {;
            curveChain1.push(new Canal(50, i, stdWidth, player, false));
        }
        let seg7 = new Canal(stdLength+100, 4, stdWidth, player);

        // Network two
        let seg8 = new Canal(stdLength-100, 4, stdWidth, player);
        let seg9 = new Canal(stdLength-100, 4, stdWidth, player);
        let lockSeg3 = new Lock(stdLength-100, 3.5, stdWidth, player, 3, 3);
        let seg10 = new Canal(stdLength, 3.5, stdWidth, player);
        // 'snaking' section followed by a connection back to network three
        let sineChain5 = this.getSineChain(midPoint, gradient, trough, peak, sineLength-5, stdWidth, player);
        let sineChain6 = this.getSineChain(midPoint, gradient, trough+2, peak, sineLength-5, stdWidth, player);
        let seg11 = new Canal(stdLength, 3.5, stdWidth, player);

        // Network three
        let seg12 = new Canal(stdLength+200, 3.5, stdWidth, player);
        let sineChain7 = this.getSineChain(midPoint, gradient, trough, peak, sineLength, stdWidth, player);
        let lockSeg4 = new Lock(stdLength, 3.4, stdWidth, player, 2, 3);
        let seg13 = new Canal(stdLength+300, 3.5, stdWidth, player);
        let lockSeg5 = new Lock(stdLength, 3.4, stdWidth, player, 1, 3);
        // Long snaking section leading to the end of the map
        let sineChain8 = this.getSineChain(midPoint, gradient, trough, peak, sineLength-5, stdWidth, player);
        let sineChain9 = this.getSineChain(midPoint, gradient, trough, peak, sineLength-5, stdWidth, player);
        peak -= 1;
        trough += 1;
        let sineChain10 = this.getSineChain(midPoint, gradient, trough, peak, sineLength-5, stdWidth, player);
        peak -= 1;
        trough += 1;
        let sineChain11 = this.getSineChain(midPoint, gradient, trough, peak, sineLength-5, stdWidth, player);
        // curve;
        let curveChain2 = [];
        for (let i = 3; i < 6; i+=0.2) {
            curveChain2.push(new Canal(50, i, stdWidth, player, false));
        }
        // Final lock obstacle course to finish. Locks increase in speed and difficulty
        let seg14 = new Canal(stdLength, 6.3, stdWidth, player);
        let lockSeg6 = new Lock(stdLength, 6.3, stdWidth, player, 2, 3);
        let seg15 = new Canal(stdLength, 6.3, stdWidth, player);
        let lockSeg7 = new Lock(stdLength, 6.5, stdWidth, player, 1, 1.5);
        let seg16 = new Canal(stdLength, 6.5, stdWidth, player);
        let lockSeg8 = new Lock(stdLength, 6.2, stdWidth, player, 1, 1);
        let seg17 = new Canal(stdLength, 6.2, stdWidth, player);
        let seg18 = new Canal(stdLength, 6, stdWidth, player);
        // finish line
        let seg19 = new Canal(stdLength, 6, stdWidth, player, true, true);

        // Dead end loop
        let seg23 = new Canal(stdLength+100, 4, stdWidth, player);
        let curveChainTwo = [];
        for (let i = 6; i > 0; i-=0.5) {
            curveChainTwo.push(new Canal(100, i-2%12, stdWidth, player, false));
        }
        let lockSeg9 = new Lock(stdLength+200, 10, stdWidth, player, 3, 5);
        let curveChainThree = [];
        for (let i = 9; i > 5; i-=0.5) {
            curveChainThree.push(new Canal(110, i%12, stdWidth, player, false));
        }

        // Canal networks
        let networkOne = new CanalNetwork(
            0, 0, [seg1, lockSeg1, seg2, sineChain1, sineChain2, seg3, seg4, lockSeg2, seg5, seg6, sineChain3, sineChain4, curveChain1, seg7],
            [[seg3, seg8], [seg6, seg12], [seg7, seg23]]);
        let networkTwo = new CanalNetwork(3900, 250, [seg8, seg9, lockSeg3, seg10, sineChain5, sineChain6, seg11], [[seg11, seg13]]);
        let networkThree = new CanalNetwork(
            4500, 0, [seg12, sineChain7, lockSeg4, seg13, lockSeg5, sineChain8, sineChain9, sineChain10, sineChain11, curveChain2, seg14, lockSeg6,
                      seg15, lockSeg7, seg16, lockSeg8, seg17, seg18, seg19], []);
        let deadEndLoop = new CanalNetwork(6000, -650, [seg23, curveChainTwo, lockSeg9, curveChainThree], [], true);

        // Networks collected together and returned to caller
        return new CanalMap(player, false, [networkOne, networkTwo, networkThree, deadEndLoop]);
    }

    // This helper function provides a smooth 'sine wave' path array based on the parameters. Curves up, then down, then back to starting position
    // Peak is the top of the sine, trough is the bottom, mid is the midpoint. Gradient is the rate of change, and length the length of segments
    static getSineChain(mid, gradient, trough, peak, length, stdwidth, player) {
        let curve1 = []
        for (let i = mid; i > peak; i -= gradient) {
            curve1.push(new Canal(length, i, stdwidth, player, false));
        }
        let curve2 = []
        for (let i = peak; i < trough; i += gradient) {
            curve2.push(new Canal(length, i, stdwidth, player, false));
        }
        let curve3 = []
        for (let i = trough; i > mid; i -= gradient) {
            curve2.push(new Canal(length, i, stdwidth, player, false));
        }
        return [curve1, curve2, curve3]
    }



    static getMap2(player) {
        let c1 = new Canal(1000, 3, 200, player); 
        let c2 = new Canal(300, 7, 200, player);
        let c3 = new Canal(500, 4, 200, player);
        let c4 = new Canal(400, 2, 200, player);
        let c5 = new Canal(400, 11, 200, player);
        let c6 = new Lock(1200, 3, 150, player, 1, 1.5);
        let c7 = new Canal(700, 7, 150, player);
        let c8 = new Canal(500, 3, 150, player);
        let c9 = new Canal(700, 7, 150, player);
        let c10 = new Canal(500, 10, 150, player);
        let c11 = new Canal(600, 7, 150, player);
        let c12 = new Canal(600, 9, 150, player, true, true); // means garbage = true and last canal segemnt = true

        let network = new CanalNetwork(-500, -350, [c1, c2, c3, c4, c5, 
                                                        c6, c7, c8, c9, c10,
                                                        c11, c12], []);
        return new CanalMap(player, true, [network]);
    }

    static getMap3(player){
        let stdwidth = 100;

        /*Game starts off with a loop of locks, which are the connections between the canals in inLoop and outLoop.
        (o, c and inc are settings for the locks, see connections in network Loop). the locks are briefly open and
        closed for a while, so the player has to circle until they see an open one and get in there quickly, while
        avoiding the opponent*/

        
        let o = 1.5
        let c = 7
        let inc = 2
        let incA = 0;


        let intro = new Canal(200, 3, stdwidth, player);
        let firstGates = new Canal(200, 4, stdwidth, player);
        let after = new Canal(200, 7, stdwidth, player);

        let inLoop = [];
        for (let i = 1; i < 12; i++){
            inLoop.push(new Canal(200, i, stdwidth, player));
        }

        let outLoop = [];
        for (let i = 2; i <= 9; i++){
            outLoop.push(new Canal(400, i, stdwidth, player));
        }
        
        let tangent = new Canal(100, 9, stdwidth, player); 

        let threshold = new CanalNetwork(0, 0, [intro, firstGates, after], [[after, inLoop[0]]], false);
        let loop = new CanalNetwork(300, 300, [inLoop], [
            [inLoop[1], outLoop[0], c, o, inc++],
            [inLoop[2], outLoop[1], c, o, incA++],
            [inLoop[3], outLoop[2], c, o, inc++],
            [inLoop[4], outLoop[3], c, o, incA++],
            [inLoop[5], outLoop[4], c, o, inc++],
            [inLoop[6], outLoop[5], c, o, incA++],
            [inLoop[7], outLoop[6], c, o, inc++],
            [inLoop[8], outLoop[7], c, o, incA++],
            ], true);

        

        /*The route then spirals up into the inner loop of a maze. There are three ways out, and some will get you
        to the finish line a lot quicker than others. */
        let mazeIn = []
        let start = 10;
        let mazeInLen = 500
        let add = [0, 0, 0, 0, 0, 100, 50, 100, 150, 50, 50, 217]
        for (let i = 0; i < 12; i++){
                mazeIn.push(new Canal(mazeInLen + add[i], ((start + i) % 12), stdwidth, player));
            
        }

        /*topMidArc, rightmidArc and lowMidArc are the three routes out of the maze. lowMidArc gets you there fastest,
        but it's the last one, so a player might not head for there right away - especially as you CAN get out
        via the other ways if you wait for some very unforgiving locks!*/

        let topMidArc = []
        let rightMidArc = []
        let lowMidArc = []
        let mazeMidLen = 650
        let topStart = 10
        let rightStart = 12
        let lowStart = 7
        let rightAdd = [0, 450, 100, 250, 200]
        let lowAdd = [100, 0, 250, 300, 150]
        for (let i = 0; i < 5; i++){
            topMidArc.push(new Canal(mazeMidLen, ((topStart - i) % 12), stdwidth, player));
            rightMidArc.push(new Canal(mazeMidLen + rightAdd[i], ((rightStart - i) % 12), stdwidth, player));
            lowMidArc.push(new Canal(mazeMidLen + lowAdd[i], ((lowStart + i) % 12), stdwidth, player));
        }

        let lowTangent = new Canal(mazeMidLen + 100, 12, stdwidth, player);

        let arc = new CanalNetwork(200, -150, [outLoop, tangent, mazeIn], [[mazeIn[4], topMidArc[2]], [mazeIn[8], rightMidArc[0]]], false);
        let midLayerOne = new CanalNetwork(1627, -646, [topMidArc], [[topMidArc[0], rightMidArc[2], 10, 1], [topMidArc[4], lowTangent, 10, 1]])
        let midLayerTwo = new CanalNetwork(2395, 720, [rightMidArc]);
        let midLayerThree = new CanalNetwork(2100, 810, [lowMidArc, lowTangent], [[lowMidArc[2], mazeIn[11]]]);


        /*You end up in the outer ring, which circles the whole map in order to make it harder for players to calculate
        the right route to it. but from there, you can get to the finish line no problem. There's a lock that 
        you have to pass to get into the outer ring, but it's generous */

        let outerRing = []
        let outLength = 1000;
        start = 6;
        add = [0, 0, 300, 0, 0, 0, 0, 100, 0, 0]

        for (let i = 0; i < 10; i++){
            outerRing.push(new Canal(outLength + add[i], ((start - i) % 12), stdwidth, player));
        }

        let finishLine = new Canal(300, 8, stdwidth, player, true, true)

        let ring = new CanalNetwork(-1375, -228, [outerRing, finishLine], [[outerRing[2], lowMidArc[3], 4, 3]]);



        //-1571, 223

        return new CanalMap(player, true, [threshold, loop, arc, midLayerOne, midLayerTwo, midLayerThree, ring]);
    }

    static getMap4(player){
        let stdlen = 300
        let stdwidth = 100;
        
        //creating the end first - this is a linear map so it's playable at any state of completion
        let finishLine = new Canal(300, 9, stdwidth, player, true, true)

        /*This opens with a test of reflexes and boat control - get around that sharp angle
        into the lock pronto, or face a very short game!*/       

        let start = new Canal(stdlen * 2, 5, stdwidth, player);
        let jumpScare = new Lock(stdlen, 2, stdwidth, player, 3, 3)
        let phew = new Canal(stdlen, 1, stdwidth, player);

        /*...you made it! And you've now got a lead on the pursuer, which is good, cause the canal's
        getting narrow and twisty. repair often and go slowly and carefully*/

        let harshwidth = stdwidth * 0.8
        let narrowing = new Canal(stdlen, 3, harshwidth, player);
        let firstCurves = [];
        for (let i = 0; i < 3; i++){
            let curve = [];
            curve.push(new Canal(stdlen, 5, harshwidth, player));
            curve.push(new Canal(harshwidth, 3, harshwidth, player));
            curve.push(new Canal(stdlen, 1, harshwidth, player));
            curve.push(new Canal(harshwidth + 30, 3, harshwidth, player));
            firstCurves.push(curve);
        }
        //and a lock to give you a chance to regain that distance
        let equalizer = new Lock(stdlen, 2, stdwidth, player, 3, 2)
        let phewToo = new Canal(900, 3, stdwidth, player);

        /*
        under construction: this next bit has gentler curves, but it gets 
        narrower, so be sure not to fall into too much of a groove
        */

        let theCorkScrew = [];
        let generous = 180;
        let corkScrewLength = 100;
        let holdover;
        for(let i = 0; i < 5; i++){
            let curve = [];
            curve.push(new Canal(corkScrewLength, 5, generous, player));
            curve.push(new Canal(corkScrewLength, 4, generous, player));
            curve.push(new Canal(corkScrewLength, 5, generous, player));
            curve.push(new Canal(corkScrewLength, 6, generous, player));

            curve.push(new Canal(corkScrewLength, 7, generous, player));
            curve.push(new Canal(corkScrewLength, 8, generous, player));
            curve.push(new Canal(corkScrewLength, 7, generous, player));
            curve.push(new Canal(corkScrewLength, 6, generous, player));

            holdover = generous;            
            generous *= 0.75;
            theCorkScrew.push(curve);
        }

        for(let i = 7; i <= 12; i++){
            theCorkScrew.push(new Canal(corkScrewLength, i, holdover, player));
        }

        /*
        Finishing there for now as there's been some talk of overhauling the control system
        and I want to see what that looks like before coming up with another way to test it.
        */

        let stairlen = 500;
        let stairwidth = 150;

        let connector = new Canal(500, 9, stdwidth, player);
        let placeholder1 = new Canal(stairlen, 12, stairwidth, player, 0.8, 1)

        let network = new CanalNetwork(0, 0, [
            start, 
            jumpScare, 
            phew, 
            narrowing, 
            firstCurves,
            equalizer,
            phewToo,
            theCorkScrew,
            connector,
            placeholder1,
            finishLine
        ]);

        //240 50

        return new CanalMap(player, true, [network]);
    }

    static getMap5(player) {
        let c1 = new Canal(200, 3, 100, player); 
        let c2 = new Canal(300, 5, 100, player);
        let c3 = new Canal(400, 8, 100, player);
        let c4 = new Canal(500, 10, 100, player);
        let c5 = new Canal(600, 1, 100, player);
        let c6 = new Canal(400, 3, 100, player);
        let c6pt5 = new Canal(300, 4, 100, player);
        let c7 = new Canal(700, 6, 100, player);
        let c8 = new Canal(600, 8, 100, player);
        let c9 = new Canal(800, 10, 100, player);
        let c10 = new Lock(300, 11, 100, player, 5, 3);
        let c11 = new Canal(900, 1, 100, player);
        let c12 = new Canal(1000, 3, 100, player);
        let c13 = new Lock(300, 4, 100, player, 5, 3);
        let c14 = new Canal(500, 6, 100, player);
        let c15 = new Canal(100, 7, 100, player, true, true);

        //let c15 = new Canal(300, 7, 100, player);
        //let c16 = new Canal(200, 3, 100, player);
        //let c17 = new Canal(200, 12, 100, player);
        //let c18 = new Canal(200, 10, 100, player);
       
        let mainNetwork = new CanalNetwork(0, 0, [c1, c2, c3, c4, c5, c6, c6pt5, c7, c8, c9, c10, c11, c12, c13, c14, c15], []);
        return new CanalMap(player, true, [mainNetwork]);
    }
}
