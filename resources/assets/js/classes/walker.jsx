class Walker {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;

        this.WIDTH = 900;
        this.HEIGHT = 500;

        this.MAX_SPEED = 5;
        this.SCORE_RADIUS = 100;
        this.r = 10;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {

        if (Math.random() > 0.5) {
            this.angle += Math.random() * 2 - 1;
        }

        // Calculate next position
        this.ax = Math.cos(this.angle);
        this.ay = Math.sin(this.angle);
        this.vx += this.ax;
        this.vy += this.ay;

        // Limit speeds to maximum speed
        this.vx = this.vx > this.MAX_SPEED / 2 ? this.MAX_SPEED / 2 : this.vx < -this.MAX_SPEED / 2 ? -this.MAX_SPEED / 2 : this.vx;
        this.vy = this.vy > this.MAX_SPEED / 2 ? this.MAX_SPEED / 2 : this.vy < -this.MAX_SPEED / 2 ? -this.MAX_SPEED / 2 : this.vy;

        this.x += this.vx;
        this.y += this.vy;

        // Limit position to width and height
        this.x = this.x >= this.WIDTH ? this.WIDTH : this.x <= 0 ? 0 : this.x;
        this.y = this.y >= this.HEIGHT ? this.HEIGHT : this.y <= 0 ? 0 : this.y;

        if (this.x === 0 || this.x === this.WIDTH) {
            this.vx = -this.vx;
            this.angle += Math.PI;
        }
        if (this.y === 0 || this.y === this.HEIGHT) {
            this.vy = -this.vy;
            this.angle += Math.PI;
        }
    }

    reset() {
        this.x = this.WIDTH / 2;
        this.y = this.HEIGHT / 2;
        this.vx = 0;
        this.vy = 0;

        this.angle = Math.random() * Math.PI * 2;
    }

    show() {
        window['p'].fill(0);
        window['p'].ellipse(this.x, this.y, this.r * 2);

        // Score radius
        window['p'].noFill();
        window['p'].stroke('lightgreen');
        window['p'].strokeWeight(2);
        window['p'].ellipse(this.x, this.y, this.SCORE_RADIUS * 2);
        window['p'].noStroke();
    }

}

export default Walker;