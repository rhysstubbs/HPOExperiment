/**
 *
 * App
 *
 * This component is the skeleton around the actual page
 */

import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import sketch from 'HPO/sketches/index';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>

                <P5Wrapper sketch={sketch}/>

            </React.Fragment>
        );
    }

}

App.defaultProps = {};

App.propTypes = {};

export default App;