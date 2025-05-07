//To add text just replace each line with what you like. Leave blank lines as lineX = "";
//Try not to go over the max line length of the default text as lines might overlap on smaller displays otherwise

class InfoTextController{
    static getInfoText(mapId) {
        switch (mapId) {
            case 0:
                return this.getInfoTextDefault(); 
            case 1:
                return this.getInfoText1(); 
            case 2:
                return this.getInfoText2(); 
            case 3:
                return this.getInfoText3(); 
            case 4:
                return this.getInfoText4(); 
            case 5:
                return this.getInfoText5(); 
            case 6:
                return this.getInfoText6(); 
            default:
                return this.getInfoTextDefault(); 
        }
    }

    static getInfoTextDefault(){
        let line1 = "OH NO! One moment you were enjoying the peaceful idyll of life on the canal - just you, your narrowboat, and the occasional duck - and the next, you are being chased by [....]!";
        let line2 = "You must reach [...] without being caught! Use the arrow keys to navigate your boat along the canal.";
        let line3 ="But be careful: banging into the canal walls with cause your boat to take damage. Your boat may also take some damage over time.";
        let line4 ="You can choose to stop and make repairs at any time by pressing the 'r' key...but watch out for the pursuer on your tail!";
        let line5 ="Be warned: if your health reaches zero, you will be forced to stop until the repairs are complete. More substantial damage means a longer wait for repairs!";
        let line6 ="One last thing: you can press [Esc] key at any time to go back to the Start Menu.";

        return {
            1: line1,
            2: line2,
            3: line3,
            4: line4,
            5: line5,
            6: line6
        }
    }

    static getInfoText1(){
        let line1 = "A long and winding canal with a couple 'forks' ahead.";
        let line2 = "Choose your path wisely, as you are being pursued from afar, slowly but surely.";
        let line3 = "All is not as serene as it may at first appear.";
        let line4 ="";
        let line5 ="";
        let line6 ="";

        return {
            1: line1,
            2: line2,
            3: line3,
            4: line4,
            5: line5,
            6: line6
        }
    }

    static getInfoText2(){
        let line1 = "This is line 1!";
        let line2 = "This is line 2!";
        let line3 ="This is line 3!";
        let line4 ="This is line 4!";
        let line5 ="This is line 5!";
        let line6 ="Wooo line 6! How about you fill me in using the InfoTextController class in maps :)";

        return {
            1: line1,
            2: line2,
            3: line3,
            4: line4,
            5: line5,
            6: line6
        }
    }

    static getInfoText3(){
        let line1 = "A hedge maze over water! Somewhere north of you is the finish line - but where?";
        let line2 = "Make your way to the edge of these rings, and be careful of the dead ends";
        let line3 = "Locks in the hedge maze open briefly and fill slowly, so don't commit until you see those doors move!";
        let line4 = "";
        let line5 = "";
        let line6 = "";

        return {
            1: line1,
            2: line2,
            3: line3,
            4: line4,
            5: line5,
            6: line6
        }
    }

    static getInfoText4(){
        let line1 = "Quick! Dodge into that lock as soon as you see it!";
        let line2 = "In HairpinHampton, the pursuer isn't your biggest threat - the banks are."
        let line3 = "Be prepared for tight turns and narrow channels";
        let line4 = "Do you repair often and risk the pursuer catching you?";
        let line5 = "Or save it for the next lock wait and risk catching the next corner and sinking?";
        let line6 = "";

        return {
            1: line1,
            2: line2,
            3: line3,
            4: line4,
            5: line5,
            6: line6
        }
    }

    static getInfoText5(){
        let line1 = "Around and around you go...";
        let line2 = "Can you escape the Snailshell Spiral...before the pursuer catches up?";
        let line3 ="Watch out for the locks...and keep an eye on their depth!";
        let line4 ="Remember: timing is everything...";
        let line5 ="";
        let line6 ="";

        return {
            1: line1,
            2: line2,
            3: line3,
            4: line4,
            5: line5,
            6: line6
        }
    }

    static getInfoText6(){
        let line1 = "This is line 1!";
        let line2 = "This is line 2!";
        let line3 ="This is line 3!";
        let line4 ="This is line 4!";
        let line5 ="This is line 5!";
        let line6 ="Wooo line 6! How about you fill me in using the InfoTextController class in maps :)";

        return {
            1: line1,
            2: line2,
            3: line3,
            4: line4,
            5: line5,
            6: line6
        }
    }
}
