let canvas;
let player;
let powerEmojis = [];
let score = 0;
let startTime;
let gameSpeed = 1;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    player = new Player();
    startTime = millis();
    for (let i = 0; i < 10; i++) {
        powerEmojis.push(new PowerEmoji());
    }
    textAlign(CENTER, CENTER);
    textSize(28);
}

function draw() {
    drawStarfield();
    player.display();
    player.move();

    for (let emoji of powerEmojis) {
        emoji.display();
        emoji.move();
        if (player.collects(emoji)) {
            score++;
            gameSpeed += 0.1;
            powerEmojis.splice(powerEmojis.indexOf(emoji), 1);
            powerEmojis.push(new PowerEmoji());
        }
    }

    updateScoreAndTimer();
    checkGameOver();
}

function updateScoreAndTimer() {
    document.getElementById('score').innerText = `Score: ${score}`;
    let elapsedTime = int((millis() - startTime) / 1000);
    document.getElementById('timer').innerText = `Time: ${nf(elapsedTime, 2, 0)}`;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Player {
    constructor() {
        this.size = 30;
        this.x = width / 2;
        this.y = height / 2;
    }

    display() {
        fill(255);
        text('🚀', this.x, this.y);
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5 * gameSpeed;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5 * gameSpeed;
        if (keyIsDown(UP_ARROW)) this.y -= 5 * gameSpeed;
        if (keyIsDown(DOWN_ARROW)) this.y += 5 * gameSpeed;

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
        text('⚡', this.x, this.y);
    }

    move() {
        // Power Emojis are stationary for now
    }
}

function drawStarfield() {
    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        stroke(255);
        point(x, y);
    }
}

function checkGameOver() {
    if (score >= 10) {
        resetGame();
    }
}

function resetGame() {
    score = 0;
    gameSpeed = 1;
    powerEmojis = [];
    for (let i = 0; i < 10; i++) {
        powerEmojis.push(new PowerEmoji());
    }
    startTime = millis();
}

// Add event listener for touch controls
const hammer = new Hammer(canvas.elt);
hammer.on('pan', function(event) {
    player.x = event.center.x;
    player.y = event.center.y;
});

function touchMoved() {
    player.x = touchX;
    player.y = touchY;
    return false;
}
