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

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            active: true,
            generation: null,
            averageScore: null,
            fittestScore: null
        };
    }

    handleClick = () => {

        const currentState = this.state.active;

        this.setState({
            active: !currentState
        });
    };

    update = (e) => {

        const keys = e.detail;

        Object.keys(keys).forEach((key) => {

            const val = keys[key];

            this.setState({
                [key]: val
            })
        });

    };

    componentDidMount = () => {
        window.addEventListener("generationUpdate", this.update);
    };

    render() {
        return (
            <div>

                <Container>
                    <Row>
                        <Col>
                            <Simulation active={this.state.active}
                                        width={900}
                                        height={500}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h4>Generation: {this.state.generation}</h4>
                            <h4>Average Score: {this.state.averageScore}</h4>
                            <h4>Best Score: {this.state.fittestScore}</h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button
                                onClick={this.handleClick}
                                variant="primary">
                                {this.state.active ? 'Pause' : 'Resume'}
                            </Button>
                        </Col>
                    </Row>

                </Container>

            </div>
        );
    }

}

App.defaultProps = {};

App.propTypes = {};

export default App;