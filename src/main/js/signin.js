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
        this.handleForm = this.handleForm.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleFacebook = this.handleFacebook.bind(this);
    }

    handleFacebook(e) {
        console.log(e)
        this.state.name = e.email
        this.state.password = e.userID

        fetch("/api/facebookSignin", {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "username=" + this.state.name + "&password=" + this.state.password
        }).then(this.signIn.bind(this))
    }

    handleForm(e) {
        e.preventDefault();
        this.state.name = this.form.data().username;
        this.state.password = this.form.data().password;
        this.signIn();
    }

    signIn() {
        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.name,
                password: this.state.password,
            })
        })
        .then(checkStatus)
        .then(this.success.bind(this))
        .catch(this.fail.bind(this))
    }

    success(authObject) {
        console.log("Signed in", authObject);
        auth.signIn(authObject);
        browserHistory.push("/home/")
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
                <UserForm submitLabel="Sign in" onSubmit={this.handleForm} ref={ (ref) => this.form = ref }/>
                <FacebookLogin appId="231018617305901" autoLoad={false} fields="name,email" callback={this.handleFacebook} reAuthenticate={true} />
                <Link to="/signup">Sign up</Link>
            </div>
        )
    }

}

export default withRouter(SignIn);
