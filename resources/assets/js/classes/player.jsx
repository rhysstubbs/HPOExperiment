class Player {

    constructor(genome, x, y, w, h) {

        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.r = 6;
        this.WIDTH = w;
        this.HEIGHT = h;
        this.MAX_SPEED = 5;
        this.SCORE_RADIUS = 100;
        this.brain = genome;
        this.brain.score = 0;
    }

    update() {

        let input = this.detect();
        let output = this.brain.activate(input);

        let moveangle = output[0] * 2 * window['p'].PI;

        // Calculate next position
        this.ax = Math.cos(moveangle);
        this.ay = Math.sin(moveangle);
        this.vx += this.ax;
        this.vy += this.ay;

        // Limit speeds to maximum speed
        this.vx = this.vx > this.MAX_SPEED ? this.MAX_SPEED : this.vx < -this.MAX_SPEED ? -this.MAX_SPEED : this.vx;
        this.vy = this.vy > this.MAX_SPEED ? this.MAX_SPEED : this.vy < -this.MAX_SPEED ? -this.MAX_SPEED : this.vy;

        this.x += this.vx;
        this.y += this.vy;

        // Limit position to width and height
        this.x = this.x >= this.WIDTH ? this.WIDTH : this.x <= 0 ? 0 : this.x;
        this.y = this.y >= this.HEIGHT ? this.HEIGHT : this.y <= 0 ? 0 : this.y;

        if (this.x === 0 || this.x === this.WIDTH) {
            this.vx = -this.vx;
        }

        if (this.y === 0 || this.y === this.HEIGHT) {
            this.vy = -this.vy;
        }

        this.score();
    }

    /**
     * Calculate fitness of this players genome
     */
    score() {

        const dist = window['p'].distance(this.x, this.y, window['walker'].x, window['walker'].y);

        if (!isNaN(dist) && dist < this.SCORE_RADIUS) {
            this.brain.score += this.SCORE_RADIUS - dist;
        }

        // Replace highest score to visualise
        window.highestScore = this.brain.score > window.highestScore ? this.brain.score : window.highestScore;
    }

    /**
     * Display the player on the field, parts borrowed from the CodingTrain
     */
    show() {

        // Draw a triangle rotated in the direction of velocity
        const angle = window['p'].angleToPoint(this.x, this.y, this.x + this.vx, this.y + this.vy) + window['p'].HALF_PI;
        const color = window['p'].activationColor(this.brain.score, window.highestScore);

        window['p'].push();
        window['p'].translate(this.x, this.y);
        window['p'].rotate(angle);

        window['p'].fill(color);
        window['p'].beginShape();
        window['p'].vertex(0, -this.r * 2);
        window['p'].vertex(-this.r, this.r * 2);
        window['p'].vertex(this.r, this.r * 2);
        window['p'].endShape(window['p'].CLOSE);

        window['p'].pop();
    }

    /**
     * Detect and normalize inputs
     */
    detect() {

        let dist = Math.sqrt(this.x, this.y, window['walker'].x, window['walker'].y) / Math.sqrt(this.WIDTH ** 2 + this.HEIGHT ** 2);
        let targetAngle = window['p'].angleToPoint(this.x, this.y, window['walker'].x, window['walker'].y) / window['p'].TWO_PI;

        let vx = (this.vx + this.MAX_SPEED) / this.MAX_SPEED;
        let vy = (this.vy + this.MAX_SPEED) / this.MAX_SPEED;

        let tvx = (window['walker'].vx + this.MAX_SPEED) / this.MAX_SPEED;
        let tvy = (window['walker'].vy + this.MAX_SPEED) / this.MAX_SPEED;

        // NaN checking
        targetAngle = isNaN(targetAngle) ? 0 : targetAngle;
        dist = isNaN(dist) ? 0 : dist;

        return [vx, vy, tvx, tvy, targetAngle, dist];
    }

}

export default Player;