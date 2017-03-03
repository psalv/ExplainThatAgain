
import React from 'react';
import ReactDOM from 'react-dom';
import { GraphUpdater } from './graph';


/*
 Example of how to render element to the DOM.
 The StatusSearch object is being created in a separate js file
 */

ReactDOM.render(
    <GraphUpdater/>, document.getElementById('graph'));


ReactDOM.render(
    <Router history={browserHistory}>

        <IndexRoute component={Greet}/>
        <Route path={Paths.ADDADMIN}/>
        <Route path={Paths.DELETEADMIN}/>
        <Route path={Paths.ADDCLASS}/>
        <Route path={Paths.DELETECLASS}/>
        <Route path={Paths.ADDCOURSE}/>
        <Route path={Paths.DELETECOURSE}/>
        <Route path="*" component={NotFound} />

    </Router>
, document.getElementById(''));