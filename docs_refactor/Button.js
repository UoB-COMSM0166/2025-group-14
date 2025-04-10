// IMPORTANT: If using this button class you must first create the button and then include a repeating call to 
// setPosition() with the same x, y coords. This is so the button is resized with the canvas correctly. Otherwise 
// the button may become off-center when the canvas gets resized (this gives it dynamic resizing).

class Button {
    constructor(label, x, y, colour, fontSize) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.colour = colour || 'blue';
        this.fontSize = fontSize || 16; 
        this.hoverColour = this.dim(colour, -30);
        this.clickColour = this.dim(colour, -50);

        // create a button element
        this.button = createButton(this.label);
        this.setPosition(x, y);
        this.button.style('background-color', this.colour);
        this.button.style('font-size', this.fontSize + 'px');
        this.button.style('color', 'white');
        this.button.style('border-radius', '8px');
        this.button.style('padding', '10px 20px');

        // need the below so that the button is actually centered on the x and y coordinates
        let buttonWidth = this.button.elt.offsetWidth;
        let buttonHeight = this.button.elt.offsetHeight;
        this.button.position(this.x - buttonWidth / 2, this.y - buttonHeight / 2);

        //setPosition(x, y);
        
        // event handling
        this.button.mousePressed(() => this.click());
        this.button.mouseOver(() => this.hoverOver());     
        this.button.mouseOut(() => this.hoverOff());        
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.button.position(this.x, this.y);

        let buttonWidth = this.button.elt.offsetWidth;
        let buttonHeight = this.button.elt.offsetHeight;
        this.button.position(this.x - buttonWidth / 2, this.y - buttonHeight / 2);
    }

    // changes color when mouse is clicking button
    click() {
        this.button.style('background-color', this.clickColour);
    }

    // changes color when mouse is over the button
    hoverOver() {
        this.button.style('background-color', this.hoverColour);
    }

    // resets color when mouse leaves
    hoverOff() {
        this.button.style('background-color', this.colour);
    }

    // adjusts the brightness of the color when hovering/clicking
    dim(colour, dimFactor) {
        return color(red(colour) + dimFactor, green(colour) + dimFactor, blue(colour) + dimFactor);
    }

    // removes the button from the screen
    remove() {
        this.button.remove();
    }
}