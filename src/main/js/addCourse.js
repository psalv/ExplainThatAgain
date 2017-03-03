import React from 'react';
import 'whatwg-fetch';
import {withRouter} from 'react-router';
import ReactDOM from 'react-dom';

const checkStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

class AddCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            error: ''
        };
        this.addCourse = this.addCourse.bind(this);
    }

    addCourse(e) {
        e.preventDefault();
        let form = this.form.data();
        console.log("Adding...", form);

        let body = "Name for course=" + form.username

        fetch("/api/admin/createClass", {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: body
        })
            .then(checkStatus)
            .then(this.success.bind(this))
            .catch(this.readError.bind(this))
            .then(this.fail.bind(this))
    }

    success(user) {
        console.log("Added course", user);
        this.props.router.replace("/");
    }

    readError(error) {
        console.log("Failed to add course", error);
        return error.response.json();
    }

    fail(error) {
        if(error) this.setState({error: error.error});
    }

    render () {
        let Error = () => <p className="alert alert-danger">{this.state.error}</p>;
        return (

            <div className="col-sm-4 col-sm-offset-4">
                { this.state.error ? <Error/> : null }
                <UserForm submitLabel="Add Course" onSubmit={this.addCourse} ref={ (ref) => this.form = ref }/>
            </div>
        )
    }

}

export default withRouter(AddCourse);