import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "HPO/sketches/index";
import Player from "HPO/classes/player";
import PropTypes from "prop-types";
import Walker from "HPO/classes/walker";
import {CNE, NEAT} from "HPO/constants/algorithms";
//import "HPO/libs/neataptic_vanilla";
import "HPO/libs/neataptic_modified";
//import 'neataptic';

let Neat = window['neataptic'].Neat;
let Methods = window['neataptic'].methods;

class Simulation extends React.Component {

    constructor(props) {

        super(props);

        this.SCORE_RADIUS = 100;
        this.PLAYER_AMOUNT = 100;
        this.ITERATIONS = 250;
        this.MUTATION_RATE = 0.3;
        this.ELITISM = 10;

        this.state = {
            stateSketch: sketch,
        };

    }

    initNeat = () => {

        window['walker'] = new Walker(this.props.width / 2, this.props.height / 2, this.props.width, this.props.height);
        window['players'] = [];
        window['generation'] = 0;

        window['neat'] = new Neat(
            6, // Input
            1, // Output
            null, // Fitness
            { // Options
                popsize: this.PLAYER_AMOUNT,
                mutationRate: this.MUTATION_RATE,
                elitism: this.ELITISM,
                selection: Methods.selection.POWER,
                mutation: [
                    Methods.mutation.ADD_NODE,
                    Methods.mutation.SUB_NODE,
                    Methods.mutation.ADD_CONN,
                    Methods.mutation.SUB_CONN,
                    Methods.mutation.MOD_WEIGHT,
                    Methods.mutation.MOD_BIAS,
                    Methods.mutation.MOD_ACTIVATION,
                    Methods.mutation.ADD_SELF_CONN,
                    Methods.mutation.SUB_SELF_CONN,
                    Methods.mutation.ADD_GATE,
                    Methods.mutation.SUB_GATE,
                    Methods.mutation.ADD_BACK_CONN,
                    Methods.mutation.SUB_BACK_CONN,
                ]
            }
        );

        for (let i = 0; i <= this.props.maxGenerations; i++) {
            window['results'].generations[i] = {
                mutationTimes: [],
                crossoverTimes: []
            };
        }

    };

    startEvaluation = () => {

        window['players'] = [];

        window['highestScore'] = 0;

        for (let genome in window['neat'].population) {
            genome = window['neat'].population[genome];
            let newPlayer = new Player(genome, this.props.width / 2, this.props.height / 2, this.props.width, this.props.height);
            window['players'].push(newPlayer);
        }

        window['walker'].reset();
    };

    endEvaluation = () => {

        let event = new CustomEvent('generationUpdate', {
            detail: {
                generation: window['neat'].generation,
                averageScore: Math.round(window['neat'].getAverage()),
                fittestScore: Math.round(window['neat'].getFittest().score),
                unfittestScore: Math.round(Math.min.apply(null, window['neat'].population.map(x => x.score))),
                allScores: window['neat'].population.map((x => x.score))
            }
        });

        // Networks shouldn't get too big
        for (let genome in window['neat'].population) {
            genome = window['neat'].population[genome];
            genome.score -= genome.nodes.length * this.SCORE_RADIUS / 10;
        }

        // Sort the population by score
        window['neat'].sort();

        // Initialise new population
        let newPopulation = [];

        /**
         * ELITISM
         */
        for (let i = 0; i < window['neat'].elitism; i++) {
            newPopulation.push(window['neat'].population[i]);
        }

        /**
         * SELECTION (?) && CROSSOVER
         */
        for (let i = 0; i < window['neat'].popsize - window['neat'].elitism; i++) {
            newPopulation.push(window['neat'].getOffspring());
        }

        /*
         * Hyper-parameter optimisation
         */
        /**for (let i = 0; i < window['neat'].popsize; i++) {

            let agent = window['neat'].population[i];



            // only optimising topology
            let newAgent = agent.optimiseAF({
                x: this.props.width / 2,
                y: this.props.height / 2,
                w: this.props.width,
                h: this.props.height
            }, Player, Walker);

            // only optimising activation functions
            // const newAFAgent = newAgent.optimiseAF({
            //     x: this.props.width / 2,
            //     y: this.props.height / 2,
            //     w: this.props.width,
            //     h: this.props.height
            // }, Player, Walker);

            if (newAgent !== null || typeof newAgent !== 'undefined') {
                newPopulation.push(newAgent);
            }

        }*/

        // Replace the old population with the new population
        window['neat'].population = newPopulation;

        /**
         * MUTATION
         */
        window['neat'].mutate();
        window['neat'].generation++;
        window['generation']++;

        window.dispatchEvent(event);
        this.startEvaluation();
    };


    render() {
        return (
            <React.Fragment>
                <P5Wrapper sketch={this.state.stateSketch}
                           status={this.props.active}
                           initNeat={this.initNeat}
                           startEvaluation={this.startEvaluation}
                           endEvaluation={this.endEvaluation.bind(this)}
                           width={this.props.width}
                           height={this.props.height}
                           iterations={this.ITERATIONS}
                           maxGenerations={this.props.maxGenerations}
                />
            </React.Fragment>
        );
    }

}

Simulation.defaultProps = {
    active: true,
    width: 900,
    height: 500,
    algorithm: NEAT,
    maxGenerations: 100
};

Simulation.propTypes = {
    active: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    algorithm: PropTypes.string,
    maxGenerations: PropTypes.number
};

export default Simulation;