export default function sketch(p) {

    let players = [];
    window['walker'] = new Walker();
    let iteration = 0;
    let highestScore = 0;

    /**
     * Core P5.js functions
     */

    p.setup = function () {

        window['p'] = p;

        p.createCanvas(900, 550);

        initNeat();

        if (!USE_TRAINED_POP) {

            for (let i = 0; i < 1; i++) {
                neat.mutate();
            }

        }

        startEvaluation();
    };

    p.draw = function () {

        p.clear();
        p.squareGrid();

        if (iteration === ITERATIONS) {
            endEvaluation();
            iteration = 0;
        }

        window.players.forEach((player) => {
            player.update();
            player.show();
        });

        window['walker'].update();
        window['walker'].show();

        iteration++;
    };

    //-----------------------------------------------------------

    /**
     * Draw a square grid with grey lines
     */
    p.squareGrid = function () {

        p.stroke(204, 204, 204, 160);
        p.strokeWeight(1);
        p.fill(255);

        for (let x = 0; x <= WIDTH / 20; x++) {
            p.line(x * 20, 0, x * 20, HEIGHT);
        }

        for (let y = 0; y <= HEIGHT / 20; y++) {
            p.line(0, y * 20, WIDTH, y * 20);
        }

        p.noStroke();
    };

    /**
     * Calculate distance between two points
     */
    p.distance = function (x1, y1, x2, y2) {

        let dx = x1 - x2;
        let dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    };

    /**
     * Get a relative color between red and green
     */
    p.activationColor = function (value, max) {

        let power = 1 - Math.min(value / max, 1);
        let color = [255, 255, 0];

        if (power < 0.5) {
            color[0] = 2 * power * 255;
        } else {
            color[1] = (1.0 - 2 * (power - 0.5)) * 255;
        }

        return color;
    };

    /**
     * Get the angle from one point to another
     */
    p.angleToPoint = function (x1, y1, x2, y2) {

        const d = this.distance(x1, y1, x2, y2);

        let dx = (x2 - x1) / d;
        let dy = (y2 - y1) / d;

        let a = Math.acos(dx);
        a = dy < 0 ? 2 * Math.PI - a : a;

        return a;
    };

    /**
     * Set the walker to a new location
     */
    p.mouseClicked = function () {

        if (p.mouseX >= 0 && p.mouseX <= WIDTH && p.mouseY >= 0 && p.mouseY <= HEIGHT) {
            window['walker'].x = p.mouseX;
            window['walker'].y = p.mouseY;
        }
    };

}