/**
 *
 * App
 *
 * This component is the skeleton around the actual page
 */

import React from 'react';
import Simulation from 'HPO/containers/simulation';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';

import {NEAT, CNE} from 'HPO/constants/algorithms';

const WIDTH = 900;
const HEIGHT = 500;

class App extends React.Component {

    constructor(props) {

        super(props);

        // This is the global variable where sample results will be stored
        window['results'] = {generations: {}};

        this.state = {
            active: true,
            generation: null,
            averageScore: null,
            fittestScore: null,
            maxGenerations: 100,
            dataStr: null,
            fileName: null,
            value: Cookies.get('algorithm') === NEAT ? NEAT : CNE
        };

        // Set the algorithm to whatever was last used
        Cookies.set('algorithm', this.state.value);

    }

    handleClick = () => {

        const currentState = this.state.active;

        this.setState({
            active: !currentState
        });
    };

    algorithmChange = (event) => {

        this.setState({value: event.target.value});

        // Set the cookie and reload, the constructor handles the setting on load
        Cookies.remove('algorithm');
        Cookies.set('algorithm', event.target.value);
        location.reload();
    };

    save = () => {

        const results = window['results'];

        if (results) {

            const jsonString = encodeURIComponent(JSON.stringify(results));

            const dataStr = `data:text/json;charset=utf-8,${jsonString}`;

            this.setState({
                dataStr: dataStr,
                fileName: "results.json"
            });

        } else {

            throw new Error(`Result object is ${typeof results}`)

        }

    };


    update = (e) => {

        const keys = e.detail;

        Object.keys(keys).forEach((key) => {

            const val = keys[key];

            this.setState({
                [key]: val
            });

            if (key !== 'generation') {
                window['results']['generations'][keys.generation][key] = val;
            }

        });


    };

    componentDidMount = () => {
        window.addEventListener("generationUpdate", this.update);
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Simulation active={this.state.active}
                                    width={WIDTH}
                                    height={HEIGHT}
                                    algorithm={this.state.value}
                                    maxGenerations={this.state.maxGenerations}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4>Generation: {this.state.generation}</h4>
                        <h4>Average Score: {this.state.averageScore}</h4>
                        <h4>Best Score: {this.state.fittestScore}</h4>
                        <hr/>
                    </Col>
                    <Col>
                        <select onChange={this.algorithmChange}
                                value={this.state.value}
                                className={'form-control'}>
                            <option value={NEAT}>NEAT with EA</option>
                            <option value={CNE}>NEAT with Random Search</option>
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button className={'w-100 mb-3'}
                                onClick={this.handleClick}
                                variant={"primary"}
                                title={'Pause the simulation'}>
                            {this.state.active ? 'Pause' : 'Resume'}
                        </Button>

                        <a className={'btn btn-success d-block'}
                           style={{'cursor': 'pointer'}}
                           title={'Save Results as a JSON file'}
                           onClick={this.save}
                           href={this.state.dataStr}
                           download={this.state.fileName}>
                            Save as JSON
                        </a>
                    </Col>
                </Row>

            </Container>
        );
    }

}

App.defaultProps = {};

App.propTypes = {};

export default App;