import Cookies from 'js-cookie';

let initNeat, startEvaluation, endEvaluation, iterations, HEIGHT, WIDTH, maxGenerations, active = null;
let startGen = 0;

export default function sketch(p) {

    let iteration = 0;

    /**
     * Core P5.js functions
     */
    p.setup = function () {

        window['p'] = p;

        p.createCanvas(WIDTH, HEIGHT);

        initNeat();

        startEvaluation();

        if (active) {

            p.loop();

        } else {

            p.noLoop();

        }

    };

    p.draw = function () {

        p.clear();
        p.squareGrid();

        if (startGen === 0) {
            startGen = performance.now();
        }
        
        if (active && window['generation'] <= maxGenerations) {

            if (iteration === iterations) {
                let finishGen = performance.now();
                let diff = finishGen - startGen;
                
                window['results'].generations[window['generation']].totalTimes.push(diff);
                startGen = 0;

                endEvaluation();
                iteration = 0;
            }

            window['players'].forEach((player) => {
                player.update();
                player.show();
            });

            window['walker'].update();
            window['walker'].show();

            iteration++;

        } else if (active && window['generation'] > maxGenerations) {

            p.textSize(44);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(255);
            p.text('Complete', WIDTH / 2, HEIGHT / 2);
            p.noLoop();

            let sampleCount = Cookies.get('sample') + 1;
            Cookies.set('sample', sampleCount);
            let event = new CustomEvent('saveJSON', {
                detail: {
                    reload: true
                }
            });
            window.dispatchEvent(event);

        } else {

            p.textSize(44);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(255);
            p.text('Paused', WIDTH / 2, HEIGHT / 2);
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {

        if (props.hasOwnProperty("status")) {

            active = props.status;
        }

        if (props.hasOwnProperty("initNeat")) {

            initNeat = props.initNeat;
        }

        if (props.hasOwnProperty("startEvaluation")) {

            startEvaluation = props.startEvaluation;
        }

        if (props.hasOwnProperty("endEvaluation")) {

            endEvaluation = props.endEvaluation;
        }

        if (props.hasOwnProperty("width")) {

            WIDTH = props.width;
        }

        if (props.hasOwnProperty("height")) {

            HEIGHT = props.height;
        }

        if (props.hasOwnProperty("iterations")) {

            iterations = props.iterations;
        }

        if (props.hasOwnProperty("width")) {

            WIDTH = props.width;
        }

        if (props.hasOwnProperty("height")) {

            HEIGHT = props.height;
        }

        if (props.hasOwnProperty("maxGenerations")) {

            maxGenerations = props.maxGenerations;
        }

    };

    //-----------------------------------------------------------

    /**
     * Draw a square grid with grey lines
     */
    p.squareGrid = function () {

        p.stroke(204, 204, 204, 160);
        p.strokeWeight(1);

        for (let x = 0; x <= WIDTH / 20; x++) {
            p.line(x * 20 + 20, 0, x * 20 + 20, HEIGHT);
        }

        for (let y = 0; y <= HEIGHT / 20; y++) {
            p.line(0, y * 20 + 20, WIDTH, y * 20 + 20);
        }

        p.fill(255, 255, 255, 100);
        p.rect(0, 0, WIDTH, HEIGHT);

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

}