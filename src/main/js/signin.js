import React from 'react';
import UserForm from './user-form';
import 'whatwg-fetch';
import {withRouter, Link, browserHistory} from 'react-router';
import auth from './auth';
import FacebookLogin from 'react-facebook-login';

const checkStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        var error = new Error(response.status == 401 ? "Invalid username and/or password" : response.statusText);
        error.response = response;
        throw error;
    }
};

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            error: ''
        };
        this.signIn = this.signIn.bind(this);
        this.handleFacebook = this.handleFacebook.bind(this);
    }

    signIn(e) {
        e.preventDefault();
        
        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form.data())
        })
        .then(checkStatus)
        .then(this.success.bind(this))
        .catch(this.fail.bind(this))
    }

    handleFacebook(e) {
        let body = "{username=" + e.email + ", password=" + e.accessToken + "}"

        fetch("/api/facebookSignin", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })

        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(checkStatus)
        .then(this.success.bind(this))
        .catch(this.fail.bind(this))
    }

    success(authObject) {
        console.log("Signed in", authObject);
        auth.signIn(authObject);
        browserHistory.push("/")
    }

    fail(res) {
        console.log("Failed to sign in", res);
        this.setState({error: res.message});
    }

    render () {
        let Error = () => <p className="alert alert-danger">{this.state.error} </p>;
        return (
            <div className="col-sm-4 col-sm-offset-4">
                { this.state.error ? <Error/> : null }
                <UserForm submitLabel="Sign in" onSubmit={this.signIn} ref={ (ref) => this.form = ref }/>
                <FacebookLogin appId="231018617305901" autoLoad={false} fields="name,email" callback={this.handleFacebook} />
                <Link to="/signup">Sign up</Link>
            </div>
        )
    }

}

export default withRouter(SignIn);
