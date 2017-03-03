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
        // need to get the course name and pass it to the controller to add, state success
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


