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

    // Event handler for button clicked / enter typed
    handleClick(e) {
        // Prevents reinitialization
        e.preventDefault();
        // let slide = this.state.slide;
        // fetch('http://localhost:8080/Graph/updateInstance?slide=' + slide, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then(res =>{
        //     if(res.ok){
        //         this.setState({success1: 'You did not understand.'});
        //     }
        //     else{
        //         this.setState({success1: 'Our server did not understand.'});
        //     }
        // })
    },

    // Event handler for button clicked / enter typed
    handleSlide(e) {
        // Prevents reinitialization
        e.preventDefault();
        let slide = ++this.state.slide;
        fetch('http://localhost:8080/Graph/addInstance?sessionID=1&slide=' + slide, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.state.slide++;
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
                <button defaultValue={this.state.update} onClick={this.handleClick}>I don't understand</button>
                <button defaultValue={this.state.slide} onClick={this.handleSlide}>Next slide</button>
                <br/>
                Success confused: {this.state.success1}
                <br/>
                Success next slide: {this.state.success2}
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
