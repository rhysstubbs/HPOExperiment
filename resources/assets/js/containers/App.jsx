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
            unfittestScore: null,
            maxGenerations: 100,
            dataStr: null,
            fileName: null,
            sampleCountReached: false
        };

        let s = Cookies.get('sample');

        if (typeof s === 'undefined' || s === null) {

            Cookies.set('sample', 0);

        } else if (s === 29) {

            this.state.sampleCountReached = true;

        }
    }

    handleClick = () => {

        const currentState = this.state.active;

        this.setState({
            active: !currentState
        });

    };

    save = (e) => {

        const results = window['results'];

        if (results) {

            const jsonString = encodeURIComponent(JSON.stringify(results));

            const dataStr = `data:text/json;charset=utf-8,${jsonString}`;

            this.setState({
                dataStr: dataStr,
                fileName: "results.json"
            });

            // let a = document.createElement('a');
            // document.body.appendChild(a);
            // a.download = this.state.fileName;
            // a.href = this.state.dataStr;
            // a.click();
            //
            // if (e.detail.reload) {
            //     location.reload();
            // }

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
        window.addEventListener("saveJSON", this.save);
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        {!this.state.sampleCountReached ? <Simulation active={this.state.active}
                                    width={WIDTH}
                                    height={HEIGHT}
                                    algorithm={this.state.value}
                                    maxGenerations={this.state.maxGenerations}
                        /> : null}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4>Generation: {this.state.generation}</h4>
                        <h4>Average Score: {this.state.averageScore}</h4>
                        <h4>Best Score: {this.state.fittestScore}</h4>
                        <h4>Lowest Score: {this.state.unfittestScore}</h4>
                        <hr/>
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