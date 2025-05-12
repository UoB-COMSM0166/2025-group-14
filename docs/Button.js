// IMPORTANT: If using this button class you must first create the button and then include a repeating call (like 
// in a display/draw function) to setPosition() with the same x, y coords. 
// This is so the button is resized with the canvas correctly. Otherwise the button may become off-center when 
// the canvas gets resized (this gives it dynamic resizing).

// Look at startScreen for how a function for button clicks can be passed in as a parameter (callback).
class Button {
    constructor(label, x, y, colour, fontSize, callback, hasImage=false, imagePath) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.colour = colour || 'blue';
        this.fontSize = fontSize || 16; 
        this.hoverColour = this.dim(colour, -30);
        this.clickColour = this.dim(colour, -50);
        this.callback = callback;

        // create a button element
        this.button = createButton(this.label);
        this.setPosition(x, y);
        this.button.style('background-color', this.colour);
        this.button.style('font-size', this.fontSize + 'px');
        this.button.style('color', 'white');
        this.button.style('border-radius', '8px');
        this.button.style('padding', '10px 20px');

        if(hasImage) {
            this.button.style('background-image', 'url(' + imagePath + ')');
            this.button.style('background-size', 'cover');
            this.button.style('background-position', 'center center');
            this.button.style('background-repeat', 'no-repeat');
            this.button.style('opacity', '0.8'); 
            this.button.style('width', '300px'); 
            this.button.style('height', '300px'); 
            this.button.style('font-weight', 'bold');
            this.button.style('border', 'black solid 2px');
             
        }

        // need the below so that the button is actually centered on the x and y coordinates
        let buttonWidth = this.button.elt.offsetWidth;
        let buttonHeight = this.button.elt.offsetHeight;
        this.button.position(this.x - buttonWidth / 2, this.y - buttonHeight / 2);

        // event handling
        this.button.mousePressed(() => this.click(callback)); //callback when button is clicked
        this.button.mouseOver(() => this.hoverOver());     
        this.button.mouseOut(() => this.hoverOff());     
    }

    hideButton() {
        this.button.hide();
    }

    showButton() {
        this.button.show();
    }

    // sets (and resets) the position of the button
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.button.position(this.x, this.y);

        let buttonWidth = this.button.elt.offsetWidth;
        let buttonHeight = this.button.elt.offsetHeight;
        this.button.position(this.x - buttonWidth / 2, this.y - buttonHeight / 2);
    }

    // Sets the label of the button to a different value (e.g. from pause to play and back)
    setLabel(newLabel) {
        this.button.html(newLabel);
    }

    // Sets colour of button to a new colour
    setColour(newColour) {
        this.button.style('background-color', newColour);
    }

    // changes color when mouse is clicking button
    // also calls the callback function if one is provided
    click() {
        this.button.style('background-color', this.clickColour);
        if (soundOn) {
            clickSound.play();
        }
        if (this.callback) {
            this.callback(); 
        }
    }

    // changes color when mouse is over the button
    hoverOver() {
        this.button.style('background-color', this.hoverColour);
        this.button.style('opacity', '1.0');
        this.button.style('cursor', 'pointer');
    }

    // resets color when mouse leaves
    hoverOff() {
        this.button.style('background-color', this.colour);
        this.button.style('opacity', '0.8');
        this.button.style('cursor', 'default');
    }

    // adjusts the brightness of the color when hovering/clicking
    dim(colour, dimFactor) {
        return color(red(colour) + dimFactor, green(colour) + dimFactor, blue(colour) + dimFactor);
    }

    // removes the button from the screen
    remove() {
        this.button.remove();
    }

    hide() {
        this.button.hide();
    }
    
    show() {
        this.button.show();
    }
}
