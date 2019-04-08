import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from 'HPO/sketches/index';
import 'neataptic';
import Player from 'HPO/classes/player';
import PropTypes from 'prop-types';
import Walker from 'HPO/classes/walker';

const Neat = window['neataptic'].Neat;
const Methods = window['neataptic'].methods;

class Simulation extends React.Component {

    constructor(props) {

        super(props);

        this.SCORE_RADIUS = 100;
        this.PLAYER_AMOUNT = Math.round(2.3e-4 * props.width * props.height);
        this.ITERATIONS = 250;
        this.MUTATION_RATE = 0.3;
        this.ELITISM = Math.round(0.1 * this.PLAYER_AMOUNT);

        this.state = {
            active: true,
            stateSketch: sketch,
        };

    }

    initNeat = () => {

        window['walker'] = new Walker(this.props.width / 2, this.props.height / 2, this.props.width, this.props.height);
        window['players'] = [];

        window['neat'] = new Neat(
            6, 1,
            null,
            {
                mutation: [
                    Methods.mutation.ADD_NODE,
                    Methods.mutation.SUB_NODE,
                    Methods.mutation.ADD_CONN,
                    Methods.mutation.SUB_CONN,
                    Methods.mutation.MOD_WEIGHT,
                    Methods.mutation.MOD_BIAS,
                    Methods.mutation.MOD_ACTIVATION,
                    Methods.mutation.ADD_GATE,
                    Methods.mutation.SUB_GATE,
                    Methods.mutation.ADD_SELF_CONN,
                    Methods.mutation.SUB_SELF_CONN,
                    Methods.mutation.ADD_BACK_CONN,
                    Methods.mutation.SUB_BACK_CONN
                ],
                popsize: this.PLAYER_AMOUNT,
                mutationRate: this.MUTATION_RATE,
                elitism: this.ELITISM
            }
        );

    };

    startEvaluation = () => {

        window['players'] = [];

        window['highestScore'] = 0;

        for (let genome in window['neat'].population) {
            genome = window['neat'].population[genome];
            const newPlayer = new Player(genome, this.props.width / 2, this.props.height / 2, this.props.width, this.props.height);
            window['players'].push(newPlayer);
        }

        window['walker'].reset();
    };

    endEvaluation = () => {

        let event = new CustomEvent('generationUpdate', {
            detail: {
                generation: window['neat'].generation,
                averageScore: Math.round(window['neat'].getAverage()),
                fittestScore: Math.round(window['neat'].getFittest().score)
            }
        });

        // Networks shouldn't get too big
        for (let genome in window['neat'].population) {
            genome = window['neat'].population[genome];
            genome.score -= genome.nodes.length * this.SCORE_RADIUS / 10;
        }

        // Sort the population by score
        window['neat'].sort();

        // Init new pop
        let newPopulation = [];

        // Elitism
        for (let i = 0; i < window['neat'].elitism; i++) {
            newPopulation.push(window['neat'].population[i]);
        }

        // Breed the next individuals
        for (let i = 0; i < window['neat'].popsize - window['neat'].elitism; i++) {
            newPopulation.push(window['neat'].getOffspring());
        }

        // Replace the old population with the new population
        window['neat'].population = newPopulation;
        window['neat'].mutate();

        window['neat'].generation++;

        // Dispatch the event.
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
                />
            </React.Fragment>
        );
    }

}

Simulation.defaultProps = {
    active: true,
    width: 900,
    height: 500
};

Simulation.propTypes = {
    active: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number
};

export default Simulation;