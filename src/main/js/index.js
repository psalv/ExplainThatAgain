
import React from 'react';
import ReactDOM from 'react-dom';
import { GraphUpdater } from './graph';
import { GraphE } from './graph';


/*
 Example of how to render element to the DOM.
 The StatusSearch object is being created in a separate js file
 */

ReactDOM.render(
    <GraphUpdater/>, document.getElementById('graph'));
 

ReactDOM.render(
    <GraphE/>, document.getElementById('graphLocation')
);

