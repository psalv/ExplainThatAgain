import React from 'react';

let NewCourse = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            courseName: "",
            success: ""
        }
    },

    handleChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value });
    },

    handleAdd () {
        e.preventDefault();
        fetch('http://localhost:8080/User/addCourse?courseName=' + this.state.courseName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success2: 'New session created.'});
            }
            else{
                this.setState({success2: 'Trouble creating new session, check that the course exists and the session is unique.'});
            }
        });
    },

    // need some way to list all courses, and then some way to list all sessions

    render(){
        return(
            <div>

                <form onSubmit={this.handleAdd}>
                    <input type="text" placeholder="Course name" onChange={this.handleChange}/>
                    <input type="submit" value="Add a course" />
                </form>

                Add course: {this.state.courseName}
                <br/>
                Success: {this.state.success}

            </div>
        );
    }

});

export class CourseObject extends React.Component{
    render(){
        return(
            <div>
                <NewCourse/>
            </div>
        );
    }
}


