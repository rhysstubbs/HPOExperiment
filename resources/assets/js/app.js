/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';

// Import root app container
import App from 'HPO/containers/App';

const WRAPPER = 'app';

// Render application
document.addEventListener("DOMContentLoaded", () => {

    const MOUNT_NODE = document.getElementById(WRAPPER);

    if (MOUNT_NODE !== null) {

        ReactDOM.render(
            <React.Fragment>
                <App/>
            </React.Fragment>,
            MOUNT_NODE,
        );

    }

});