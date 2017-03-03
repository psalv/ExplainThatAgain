import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import App from './app';
import SignIn from './signin';
import SignUp from './signup';
import Logout from './logout';
import auth from './auth';
import ConnectWithFacebook from './connect-with-facebook';

const Paths = {
    SIGNIN: "/signin",
    LOGOUT: "/logout",
    SIGNUP: "/signup",
    CONNECT: "/connect"
};

const Greet = () =>
    <div className="jumbotron">
        <h1>Explain That Again</h1>
        <p>Please Login below</p>
        <SignIn />
        <ConnectWithFacebook />
    </div>;

const NotFound = () =>
    <div className="row">
        <div className="col-lg-12">
            <h1>404. It's 362 more than 42 :(</h1>
        </div>
    </div>;

function checkAuth(next, replace) {

    let nextPath = next.location.pathname;
    if (auth.loggedIn()) {
        if(nextPath == Paths.SIGNIN || nextPath == Paths.SIGNUP) {
            replace({pathname: "/"});
        }
    } else {
        if(nextPath != Paths.SIGNIN && nextPath != Paths.SIGNUP) {
            replace({
                pathname: Paths.SIGNIN,
                state: {nextPath: nextPath}
            });
        }
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Greet}/>
            <Route path={Paths.SIGNIN} component={SignIn} onEnter={checkAuth} />
            <Route path={Paths.LOGOUT} component={Logout}/>
            <Route path={Paths.SIGNUP} component={SignUp} onEnter={checkAuth}/>
            <Route path={Paths.CONNECT} component={ConnectWithFacebook}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
, document.getElementById('app'));