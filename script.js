class Player {
    constructor() {
        this.size = 30;
        this.x = width / 2;
        this.y = height / 2;
    }

    display() {
        fill(255);
        text('🚀', this.x, this.y); // Displaying rocket emoji as player
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5 * gameSpeed;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5 * gameSpeed;
        if (keyIsDown(UP_ARROW)) this.y -= 5 * gameSpeed;
        if (keyIsDown(DOWN_ARROW)) this.y += 5 * gameSpeed;

        // Keep the player within the canvas boundaries
        this.x = constrain(this.x, 0, width - this.size);
        this.y = constrain(this.y, 0, height - this.size);
    }

    collects(emoji) {
        let d = dist(this.x, this.y, emoji.x, emoji.y);
        return d < this.size;
    }
}

class PowerEmoji {
    constructor() {
        this.size = 20;
        this.x = random(this.size, width - this.size);
        this.y = random(this.size, height - this.size);
    }

    display() {
        fill(255);
        text('⚡', this.x, this.y); // Displaying power emoji
    }

    move() {
        // Logic for moving the power emoji goes here
        // For now, they will be stationary
    }
}

function touchMoved() {
    // Mobile touch controls
    player.x = touchX;
    player.y = touchY;
    return false;
}

// Add event listener for touch controls
const hammer = new Hammer(canvas.elt);
hammer.on('pan', function(event) {
    player.x = event.center.x;
    player.y = event.center.y;
});

function resetGame() {
    score = 0;
    gameSpeed = 1;
    powerEmojis = [];
    for (let i = 0; i < 10; i++) {
        powerEmojis.push(new PowerEmoji());
    }
    startTime = millis();
}

function checkGameOver() {
    if (score >= 10) {
        resetGame();
    }
}

function drawStarfield() {
    // Starfield background logic goes here
    // Placeholder: fill the background with white dots
    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        stroke(255);
        point(x, y);
    }
}

function setup() {
    // ... existing setup code ...
    textAlign(CENTER, CENTER);
    textSize(28);
}

function draw() {
    drawStarfield();
    // ... existing draw code ...
    checkGameOver();
}