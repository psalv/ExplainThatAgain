import React from 'react';
import 'whatwg-fetch';
import {withRouter} from 'react-router';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

const checkStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

function responseFacebook(e) {
    let body = "username=" + e.userID + "&email=" + e.email + "&password=" + e.accessToken
    console.log(body);

    fetch("/api/facebookSignin", {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: body
    })
}

class ConnectWithFacebook extends React.Component {
    constructor() {
        super();
        this.state = {
            error: ''
        };
    }

    success(user) {
        console.log("Logged in with Facebook", user);
        this.props.router.replace("/");
    }

    readError(error) {
        console.log("Failed to login with Facebook", error);
        return error.response.json();
    }

    fail(error) {
        if(error) this.setState({error: error.error});
    }

    render () {
        let Error = () => <p className="alert alert-danger">{this.state.error}</p>;
        return (
            <FacebookLogin
                appId="231018617305901"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />
        )
    }

}

export default withRouter(ConnectWithFacebook);