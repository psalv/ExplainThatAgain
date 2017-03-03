import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import App from './app';
import SignIn from './signin';
import SignUp from './signup';
import Logout from './logout';
import auth from './auth';

const Paths = {
    SIGNIN: "signin",
    LOGOUT: "logout",
    SIGNUP: "signup",
};

const NotFound = () =>
    <div className="row">
        <div className="col-lg-12">
            <h1>404. It's 362 more than 42 :(</h1>
        </div>
    </div>;

function checkAuth(next, replace) {
    let nextPath = next.location.pathname;
    if (auth.loggedIn()) {
        console.log("Logged in redirect");
        browserHistory.push("/home/")
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={SignIn} onEnter={checkAuth} />
            <Route path={Paths.LOGOUT} component={Logout}/>
            <Route path={Paths.SIGNUP} component={SignUp} onEnter={checkAuth}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
, document.getElementById('app'));