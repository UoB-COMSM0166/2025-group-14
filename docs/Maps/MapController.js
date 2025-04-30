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
                return new Sprite(100, 100, 35, 25);
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
                return new Sprite(40, 100, 25, 15);
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
        let c1 = new canal(1000, 3, 150, player); //TODO update this with new canal structure
        let c2 = new canal(500, 2, 150, player);
        let c3 = new canal(1000, 3, 150, player);
        let c4 = new canal(500, 2.5, 150, player);
        let c5 = new canal(500, 3.5, 150, player);
        let c6 = new lock(500, 2, 150, player, 5, 3);
        let c7 = new canal(500, 12.5, 150, player);
        let c8 = new canal(500, 11, 150, player, true, true);

        let network = new CanalNetwork(0, 0, [c1, c2, c3, c4 , c5, c6, c7, c8], []); 
        return new CanalMap(player, true, [network]); 
    }
    
    static getMap1(player) {
        let c1 = new canal(300, 2, 150, player); //right, up
        let c2 = new canal(770, 4.5, 150, player); //right, down
        let c3 = new lock(470, 7, 130, player, 5, 3); //left, down (lock, 5, 3)
        let c4 = new canal(600, 10, 220, player); //left up
        let c5 = new canal(400, 9, 60, player); 

        let c6 = new canal(600, 4, 60, player); //originally 600, 4
        let c7 = new canal(500, 5, 60, player); //originally 500, 5

        let c8 = new canal(600, 4, 60, player); //originally 600, 4
        let c9 = new canal(500, 3, 60, player); //originally 500, 3
        let c10 = new canal(300, 5, 80, player);
        let c11 = new canal(800, 7, 80, player);

        let n1 = new CanalNetwork(50, -350, [c1, c2, c3, c4 , c5], [[c4, c6], [c2, c8]]); 

        //leah adding a new network to check multinetwork capability

        let n2 = new CanalNetwork(-500, 250, [c6, c7], []) //originally -500, 250
        let n3 = new CanalNetwork(700, -400, [c8, c9, c10, c11], [])

        return new CanalMap(player, true, [n1, n2, n3]); 
       
    }

    static getMap2(player) {
        let c1 = new canal(1000, 3, 200, player); 
        let c2 = new canal(300, 7, 200, player);
        let c3 = new canal(500, 4, 200, player);
        let c4 = new canal(400, 2, 200, player);
        let c5 = new canal(400, 11, 200, player);
        let c6 = new canal(1200, 3, 150, player);
        let c7 = new canal(700, 7, 150, player);
        let c8 = new canal(500, 3, 150, player);
        let c9 = new canal(700, 7, 150, player);
        let c10 = new canal(500, 10, 150, player);
        let c11 = new canal(600, 7, 150, player);
        let c12 = new canal(600, 9, 150, player, true, true); // means garbage = true and last canal segemnt = true

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
        let inc = 0.1


        let intro = new canal(200, 3, stdwidth, player);
        let firstGates = new canal(200, 4, stdwidth, player);
        let after = new canal(200, 7, stdwidth, player);

        let inLoop = [];
        for (let i = 1; i < 12; i++){
            inLoop.push(new canal(200, i, stdwidth, player));
        }

        let outLoop = [];
        for (let i = 2; i <= 9; i++){
            outLoop.push(new canal(400, i, stdwidth, player));
        }
        
        let tangent = new canal(100, 9, stdwidth, player);

        //o

        let threshold = new CanalNetwork(0, 0, [intro, firstGates, after], [[after, inLoop[0]]], false);
        let loop = new CanalNetwork(300, 300, [inLoop], [[inLoop[1], outLoop[0], c, o, 2],
            [inLoop[2], outLoop[1], c, o, 10],
            [inLoop[3], outLoop[2], c, o, 4],
            [inLoop[4], outLoop[3], c, o, 12],
            [inLoop[5], outLoop[4], c, o, 6],
            [inLoop[6], outLoop[5], c, o, 14],
            [inLoop[7], outLoop[6], c, o, 8],
            [inLoop[8], outLoop[7], c, o, 16],
            ], true);

        

        /*The route then spirals up into the inner loop of a maze. There are three ways out, and some will get you
        to the finish line a lot quicker than others. */
        let mazeIn = []
        let start = 10;
        let mazeInLen = 500
        let add = [0, 0, 0, 0, 0, 100, 50, 100, 150, 50, 50, 217]
        for (let i = 0; i < 12; i++){
                mazeIn.push(new canal(mazeInLen + add[i], ((start + i) % 12), stdwidth, player));
            
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
            topMidArc.push(new canal(mazeMidLen, ((topStart - i) % 12), stdwidth, player));
            rightMidArc.push(new canal(mazeMidLen + rightAdd[i], ((rightStart - i) % 12), stdwidth, player));
            lowMidArc.push(new canal(mazeMidLen + lowAdd[i], ((lowStart + i) % 12), stdwidth, player));
        }

        let lowTangent = new canal(mazeMidLen + 100, 12, stdwidth, player);

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
            outerRing.push(new canal(outLength + add[i], ((start - i) % 12), stdwidth, player));
        }

        let finishLine = new canal(300, 8, stdwidth, player, true, true)

        let ring = new CanalNetwork(-1375, -228, [outerRing, finishLine], [[outerRing[2], lowMidArc[3], 4, 3]]);



        //-1571, 223

        return new CanalMap(player, true, [threshold, loop, arc, midLayerOne, midLayerTwo, midLayerThree, ring]);
    }

    static getMap4(player){
        let stdlen = 300
        let stdwidth = 100;
        
        //creating the end first - this is a linear map so it's playable at any state of completion
        let finishLine = new canal(300, 9, stdwidth, player, true, true)

        /*This opens with a test of reflexes and boat control - get around that sharp angle
        into the lock pronto, or face a very short game!*/       

        let start = new canal(stdlen * 2, 5, stdwidth, player);
        let jumpScare = new lock(stdlen, 2, stdwidth, player, 3, 2)
        let phew = new canal(stdlen, 1, stdwidth, player);

        /*...you made it! And you've now got a lead on the pursuer, which is good, cause the canal's
        getting narrow and twisty. repair often and go slowly and carefully*/

        let harshwidth = stdwidth * 0.8
        let narrowing = new canal(stdlen, 3, harshwidth, player);
        let firstCurves = [];
        for (let i = 0; i < 3; i++){
            let curve = [];
            curve.push(new canal(stdlen, 5, harshwidth, player));
            curve.push(new canal(harshwidth, 3, harshwidth, player));
            curve.push(new canal(stdlen, 1, harshwidth, player));
            curve.push(new canal(harshwidth + 30, 3, harshwidth, player));
            firstCurves.push(curve);
        }
        //and a lock to give you a chance to regain that distance
        let equalizer = new lock(stdlen, 2, stdwidth, player, 3, 2)
        let phewToo = new canal(900, 3, stdwidth, player);

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
            curve.push(new canal(corkScrewLength, 5, generous, player));
            curve.push(new canal(corkScrewLength, 4, generous, player));
            curve.push(new canal(corkScrewLength, 5, generous, player));
            curve.push(new canal(corkScrewLength, 6, generous, player));

            curve.push(new canal(corkScrewLength, 7, generous, player));
            curve.push(new canal(corkScrewLength, 8, generous, player));
            curve.push(new canal(corkScrewLength, 7, generous, player));
            curve.push(new canal(corkScrewLength, 6, generous, player));

            holdover = generous;            
            generous *= 0.75;
            theCorkScrew.push(curve);
        }

        for(let i = 7; i <= 12; i++){
            theCorkScrew.push(new canal(corkScrewLength, i, holdover, player));
        }

        /*
        Finishing there for now as there's been some talk of overhauling the control system
        and I want to see what that looks like before coming up with another way to test it.
        */

        let stairlen = 500;
        let stairwidth = 150;

        let connector = new canal(500, 9, stdwidth, player);
        let placeholder1 = new canal(stairlen, 12, stairwidth, player, 0.8, 1)

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
        let c1 = new canal(200, 3, 100, player); 
        let c2 = new canal(300, 5, 100, player);
        let c3 = new canal(400, 8, 100, player);
        let c4 = new canal(500, 10, 100, player);
        let c5 = new canal(600, 1, 100, player);
        let c6 = new canal(400, 3, 100, player);
        let c6pt5 = new canal(300, 4, 100, player);
        let c7 = new canal(700, 6, 100, player);
        let c8 = new canal(600, 8, 100, player);
        let c9 = new canal(800, 10, 100, player);
        let c10 = new lock(300, 11, 100, player, 5, 3);
        let c11 = new canal(900, 1, 100, player);
        let c12 = new canal(1000, 3, 100, player);
        let c13 = new lock(300, 4, 100, player, 5, 3);
        let c14 = new canal(500, 6, 100, player);
        let c15 = new canal(100, 7, 100, player, true, true);

        //let c15 = new canal(300, 7, 100, player);
        //let c16 = new canal(200, 3, 100, player);
        //let c17 = new canal(200, 12, 100, player);
        //let c18 = new canal(200, 10, 100, player);
       
        let mainNetwork = new CanalNetwork(0, 0, [c1, c2, c3, c4, c5, c6, c6pt5, c7, c8, c9, c10, c11, c12, c13, c14, c15], []);
        return new CanalMap(player, true, [mainNetwork]);
    }
}