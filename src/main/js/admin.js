/**
 * Created by jakeschindler
 */

import React from 'react';

let AdminOptions = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            adminName: "",
            success: ""
        }
    },

    handleChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ adminName : e.target.value, success : "..." });
    },

    handleAdd (e) {
        e.preventDefault();
        let adminName = this.state.adminName;
        fetch('http://localhost:8080/User/addAdmin?user=test&adminName=' + adminName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'New admin created.'});
            }
            else{
                this.setState({success: 'Trouble adding user to admin, check that the admin exists .'});
            }
        });
    },

    handleDelete (e) {
        e.preventDefault();
        fetch('http://localhost:8080/User/deleteAdmin?user=test&adminName=' + this.state.adminName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'Admin deleted.'});
            }
            else{
                this.setState({success: 'Trouble deleting admin, check that the user exists and is an admin.'});
            }
        });
    },

    render(){
        return(
            <div>
                <form onSubmit={this.handleAdd}>
                    <input type="text" placeholder="Admin name" onChange={this.handleChange}/>
                    <input type="submit" value="Add an admin" />
                </form>
                <form onSubmit={this.handleDelete}>
                    <input type="submit" value="Delete an admin" />
                </form>
                Admin: {this.state.adminName}
                <br/>
                Success: {this.state.success}
            </div>
        );
    }

});


export class AdminObject extends React.Component{
    render(){
        return(
            <div>
                <AdminOptions/>
            </div>
        );
    }
}