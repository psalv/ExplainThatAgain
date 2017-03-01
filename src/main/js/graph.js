import React from 'react';

var GraphUpdaterField = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            update : false,
            success1 : "",
            success2 : "",
            slide : 0
        }
    },

    // TODO: add a method for finding the session ID.

    handleConfused(e) {
        // Prevents reinitialization
        e.preventDefault();
        fetch('http://localhost:8080/Graph/updateInstance?sessionID=1&slide=' + this.state.slide, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success1: 'You did not understand.'});
            }
            else{
                this.setState({success1: 'Our server did not understand.'});
            }
        })
    },

    handleSlide(e) {
        // Prevents reinitialization
        e.preventDefault();
        fetch('http://localhost:8080/Graph/addInstance?sessionID=1&slide=' + ++this.state.slide, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success2: 'New slide instance created.'});
            }
            else{
                --this.state.slide;
                this.setState({success2: 'Trouble creating slide instance.'});
            }
        })
    },

    render () {
        return (
            <div>
                <button defaultValue={this.state.update} onClick={this.handleConfused}>I don't understand</button>
                <button defaultValue={this.state.slide} onClick={this.handleSlide}>Next slide</button>
                <br/>
                Success confused: {this.state.success1}
                <br/>
                Success next slide: {this.state.success2}
                <br/>
                Current slide: {this.state.slide}
            </div>

        );
    }
});

export class GraphUpdater extends React.Component{
    render(){
        return(
            <div>
                <GraphUpdaterField/>
            </div>
        );
    }
}
