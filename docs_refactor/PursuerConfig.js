class PursuerConfig {
    // Constructor takes a pursuer, player and speed as arguments
    constructor(pursuer, player, speed) {
        this.pursuer = pursuer;
        this.player = player;
        this.target = player;
        this.speed = speed; 
        this.lastSeenCoords = createVector(player.x, player.y);
        // This array stores a chain of "snapshots" of the last known player coordinates before the player moves out of sight
        this.lastSeenArray = [];
        this.debugMode = true;
    }

    // Updates the pursuer's target based on player position and line of sight
    update() {
        if (this.lineOfSight(this.pursuer, this.player)) {
            // When line of sight restored, clear the last seen array and set target to player
            this.lastSeenArray = [];
            this.target = this.player;
            this.lastSeenCoords = createVector(this.player.x, this.player.y);
        } else {
            if (this.lastSeenArray.length === 0) {
                this.setSnapShot();
            }
            this.setPathfinding(this.lastSeenArray[this.lastSeenArray.length - 1].position);
            this.target = this.lastSeenArray[0].position;
        }
        this.move();
        if (this.debugMode) {
            this.debug();
        }
    }

    // Moves the pursuer towards the target
    move() {
        // If the pursuer is within 60 pixels of the target, stop moving and set to "sleep" to stop weird jiggling
        if (this.arrived(this.pursuer, this.player, 60)) {
            this.pursuer.speed = 0;
            this.pursuer.sleeping = true;
            return;
        // If the pursuer has reached a target other than player remove it by shifting array down
        } else if (this.lastSeenArray[0]) {
            if (this.arrived(this.pursuer, this.lastSeenArray[0].position, 5)) {
                this.lastSeenArray.shift();
                return;
            }
        }
        this.pursuer.moveTowards(this.target);
        this.pursuer.speed = 3;
        this.pursuer.direction = this.pursuer.angleTo(this.target);
        this.pursuer.rotation = this.pursuer.direction;
    }

    // Determines if any object 'A' is within 'gap' pixels of object 'B'
    arrived(vectorA, vectorB, gap) {
        let distance = dist(vectorA.x, vectorA.y, vectorB.x, vectorB.y);
        return distance < gap;
    }

    // Uses a raycast to detect the first sprite in between two points
    // If the first sprite detected is the target, then the target is visible
    lineOfSight(fromPoint, toPoint) {
        let blockingSprite = world.rayCast(fromPoint, toPoint);
        return blockingSprite == toPoint;
    }

    // Sets the array of last seen coordinates
    setPathfinding(currentPoint) {
        if (this.lineOfSight(currentPoint, this.player)) {
            this.lastSeenCoords = createVector(this.player.x, this.player.y);
        } else {
            this.setSnapShot();
        } 
    }

    // Sets a new snapshot of the player's position and rotation at the last moment 
    // it can be seen by either the pursuer or the snapshot before this one
    setSnapShot() {
        const newPosition = this.lastSeenCoords.copy();
        const last = this.lastSeenArray[this.lastSeenArray.length - 1];
    
        // Only take a new snapshot if:
        // - This is the first snapshot
        // - Or player has moved far enough from the last snapshot (otherwise thousands of snapshots are created)
        if (!last || !this.arrived(newPosition, last.position, 5)) {
            let snapshot = {
                position: newPosition,
                rotation: this.player.rotation
            };
            this.lastSeenArray.push(snapshot);
        }
    }

    // Prints all snapshots in the lastSeenArray to screen
    debug() {
        for (let i = 1; i < this.lastSeenArray.length; i++) {
            let snapshot = this.lastSeenArray[i];
            push();  
            noStroke();
            fill(255, 0, 0, 100);
            rectMode(CENTER);
            translate(snapshot.position.x, snapshot.position.y);
            rotate(snapshot.rotation);
            rect(0, 0, 50, 25);
            pop();  
        }
        
        if (this.target != this.player) {
            let snapshot = this.lastSeenArray[0];
            push();  
            noStroke();
            fill(0, 255, 0, 100);
            rectMode(CENTER);
            translate(snapshot.position.x, snapshot.position.y);
            rotate(snapshot.rotation);
            rect(0, 0, 50, 25);
            pop(); 
        }

        if (this.target == this.player) {
            push();
            stroke(255, 0, 0);
            strokeWeight(2);
            line(this.player.x, this.player.y, this.pursuer.x, this.pursuer.y);
            pop();
        }
         
    }
}