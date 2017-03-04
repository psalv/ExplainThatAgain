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

                Add session: {this.state.sessionName} 
                <br/>
                Success: {this.state.success}
                
            </div>
        );
    }
    
    //
    //
    //
    // addCourse(e) {
    //     e.preventDefault();
    //     let form = this.form.data();
    //     console.log("Adding...", form);
    //
    //     let body = "Name for class=" + form.username
    //
    //     fetch("/api/admin/createSession", {
    //         method: 'POST',
    //         headers: {
    //             "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //         },
    //         body: body
    //     })
    //         .then(checkStatus)
    //         .then(this.success.bind(this))
    //         .catch(this.readError.bind(this))
    //         .then(this.fail.bind(this))
    // }
    //
    // success(user) {
    //     console.log("Added class", user);
    //     this.props.router.replace("/");
    // }
    //
    // readError(error) {
    //     console.log("Failed to add class", error);
    //     return error.response.json();
    // }
    //
    // fail(error) {
    //     if(error) this.setState({error: error.error});
    // },
    //
    // render () {
    //     let Error = () => <p className="alert alert-danger">{this.state.error}</p>;
    //     return (
    //
    //         <div className="col-sm-4 col-sm-offset-4">
    //             { this.state.error ? <Error/> : null }
    //             <UserForm submitLabel="Add Class" onSubmit={this.addClass} ref={ (ref) => this.form = ref }/>
    //         </div>
    //     )
    // }
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






