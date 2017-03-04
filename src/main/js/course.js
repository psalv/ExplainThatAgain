import React from 'react';

let NewCourse = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            courseName: "",
            success1: "",
            success2: ""
        }
    },

    handleChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ courseName : e.target.value });
    },

    handleAdd (e) {
        e.preventDefault();
        fetch('http://localhost:8080/User/addCourse?user=test&courseName=' + this.state.courseName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success1: 'New course created.'});
            }
            else{
                this.setState({success1: 'Trouble creating new course, check that the course does not already exist.'});
            }
        })
    },
    
    handleDelete (e) {
        e.preventDefault();
        fetch('http://localhost:8080/User/deleteCourse?user=test&courseName=' + this.state.courseName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success2: 'Course deleted.'});
            }
            else{
                this.setState({success2: 'Trouble deleting new course, check that the course exists.'});
            }
        })
    },


    render(){
        return(
            <div>

                <form onSubmit={this.handleAdd}>
                    <input type="text" placeholder="Course name" onChange={this.handleChange}/>
                    <input type="submit" value="Add a course" />
                </form>
                <form onSubmit={this.handleDelete}>
                    <input type="submit" value="Delete a course" />
                </form>

                Add course: {this.state.courseName}
                <br/>
                Create success: {this.state.success1}
                <br/>
                Delete success: {this.state.success2}

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


