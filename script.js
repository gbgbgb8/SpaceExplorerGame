let canvas;
let player;
let powerEmojis = [];
let stars = [];
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
    for (let i = 0; i < 200; i++) {
        stars.push(new Star());
    }
    textAlign(CENTER, CENTER);
    textSize(50);
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
        this.size = 60;
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
        return d < this.size / 2 + emoji.size / 2;
    }
}

class PowerEmoji {
    constructor() {
        this.size = 40;
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

class Star {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
    }

    update() {
        this.z -= 10;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    show() {
        fill(255);
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);

        let r = map(this.z, 0, width, 16, 0);
        ellipse(sx, sy, r, r);
    }
}

function drawStarfield() {
    background(0); // Set the background to black
    translate(width / 2, height / 2); // Move the origin to the center

    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
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
