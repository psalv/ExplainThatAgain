import React from 'react';

let NewSession = React.createClass({

    getInitialState () {
        return {
            sessionName: "",
            courseName: "",
            success: ""
        }
    },

    handleAdd (e) {
        e.preventDefault();
        fetch('http://localhost:8080/User/addSession?user=test&courseName=' + this.state.courseName + '&sessionName=' + this.state.sessionName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'New session created.'});
            }
            else{
                this.setState({success: 'Trouble creating new session, check that the course exists and the session is unique.'});
            }
        })
    },

    handleDelete (e) {
        e.preventDefault();
        fetch('http://localhost:8080/User/deleteSession?user=test&courseName=' + this.state.courseName + '&sessionName=' + this.state.sessionName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'Session deleted.'});
            }
            else{
                this.setState({success: 'Trouble deleting session, check that the course exists and the session is unique.'});
            }
        })
    },


    handleChangeSession (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ sessionName : e.target.value });
    },

    handleChangeCourse (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ courseName : e.target.value });
    },

    render(){
        return(
            <div>

                <form onSubmit={this.handleAdd}>
                    <input type="text" placeholder="Course name" onChange={this.handleChangeCourse}/>
                    <input type="text" placeholder="New session name" onChange={this.handleChangeSession}/>
                    <input type="submit" value="Add a session" />
                </form>
                <form onSubmit={this.handleDelete}>
                    <input type="submit" value="Delete a course" />
                </form>

                Add session: {this.state.sessionName} 
                <br/>
                Success: {this.state.success}
                
            </div>
        );
    }

});


export class SessionObject extends React.Component{
    render(){
        return(
            <div>
                <NewSession/>
            </div>
        );
    }
}






