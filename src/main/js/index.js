
import React from 'react';
import ReactDOM from 'react-dom';
import { GraphUpdater } from './graph';
import { CourseObject } from './course';
import { SessionObject } from './session';
import { AdminObject } from './admin';


function run() {
    try {
        ReactDOM.render(<GraphUpdater/>, document.getElementById('graph'));
    }
    catch(err){
        console.log("no graph field")
    }
    
    try {
        ReactDOM.render(<SessionObject/>, document.getElementById('sessionField'));
    }
    catch(err){
        console.log("no session field")
    }

    try {
        ReactDOM.render(<CourseObject/>, document.getElementById('courseField'));
    }
    catch(err){
        console.log("no course field")
    }

    try {
        ReactDOM.render(<AdminObject/>, document.getElementById('adminField'));
    }
    catch(err){
        console.log("no admin field")
    }
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}