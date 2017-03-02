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
                let str = this.state.slide == 0 ? "Please wait for the presentation to begin." :  "Our server did not understand.";
                this.setState({success1: str});
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
            <div className="row">
                <div className="col-md-3">
                    <button defaultValue={this.state.update} onClick={this.handleConfused}>Explain that again</button>
                </div>

                <div className="col-md-3">
                    <button defaultValue={this.state.slide} onClick={this.handleSlide}>Next slide</button>
                </div>

                <div className="col-md-2">
                    Success confused: <br/>{this.state.success1}
                </div>

                <div className="col-md-2">
                    Success next slide: <br/>{this.state.success2}
                </div>

                <div className="col-md-2">
                    Current slide: <br/>{this.state.slide}
                </div>
            </div>

        );
    }
});

export class GraphUpdater extends React.Component{
    render(){
        return(
            <GraphUpdaterField/>
        );
    }
}
