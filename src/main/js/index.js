
import React from 'react';
import ReactDOM from 'react-dom';
import { GraphUpdater } from './graph';
import { CourseObject } from './course';
import { SessionObject } from './session';
import { AdminObject } from './admin';
import { MakeAlive } from './live';


function run() {
    // try {
    //     ReactDOM.render(<GraphUpdater/>, document.getElementById('graph'));
    // }
    // catch(err){
    //     console.log("no graph field")
    // }
    //
    // try {
    //     ReactDOM.render(<SessionObject/>, document.getElementById('sessionField'));
    // }
    // catch(err){
    //     console.log("no session field")
    // }
    //
    // try {
    //     ReactDOM.render(<CourseObject/>, document.getElementById('courseField'));
    // }
    // catch(err){
    //     console.log("no course field")
    // }
    //
    // try {
    //     ReactDOM.render(<AdminObject/>, document.getElementById('adminField'));
    // }
    // catch(err){
    //     console.log("no admin field")
    // }
    //
    // try {
    //     ReactDOM.render(<MakeAlive/>, document.getElementById('liveButton'));
    // }
    // catch(err){
    //     console.log("no live field")
    // }

    try{
        ReactDOM.render(<App />, document.getElementById('root'));
    }
    catch(err){
        console.log(err);
    }
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>

                <Route path='/' component={Home} />

                <Route path='*' component={NotFound} />

            </Router>
        )
    }
}


const Home = () => (
    <h1>Hello from Home!</h1>

);


const NotFound = () => (
    <h1>404.. Because this page doesn't exist and you should feel bad for trying. </h1>
);

