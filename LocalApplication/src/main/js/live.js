import React from 'react';

let Liven = React.createClass({

    getInitialState () {
        return {
            sessionName: "",
            courseName: "",
            success: ""
        }
    },

    handleLiven (e) {
        e.preventDefault();
        fetch('http://localhost:8080/Session/liven?user=test&courseName=' + this.state.courseName + '&sessionName=' + this.state.sessionName, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'Session is live. Session name: ' + this.state.sessionName});
            }
            else{
                this.setState({success: 'Trouble livening session, check that the session is unique and not already live.'});
            }
        })
    },

    
    handleChangeSession (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ sessionName : e.target.value, success : "..." });
    },

    handleChangeCourse (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ courseName : e.target.value, success : "..." });
    },
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleLiven}>
                    <input type="text" placeholder="Course name" onChange={this.handleChangeCourse}/>
                    <input type="text" placeholder="Session name" onChange={this.handleChangeSession}/>
                    <input type="submit" value="Make session go live." />
                </form>
                Success: {this.state.success}
            </div>
        );
    }

});


export class MakeAlive extends React.Component{
    render(){
        return(
            <div>
                <Liven/>
            </div>
        );
    }
}






