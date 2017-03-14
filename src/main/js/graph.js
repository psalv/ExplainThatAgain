import React from 'react';
import { Bar } from 'react-chartjs'


let GraphUpdaterField = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            labels: [],
            data: [],
            success1 : "",
            success2 : "",
            slide : 0,
            lastETA: "",
            multiple: ""
        }
    },

    // TODO: add a method for finding the session ID.

    handleConfused(e) {
        // Prevents reinitialization
        e.preventDefault();
        fetch('http://localhost:8080/Graph/updateInstance?sessionID=1&slide=' + this.state.slide, {
            // fetch('api/updateInstance?sessionID=1&slide=' + this.state.slide, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res =>{
            if(res.ok){
                this.state.data[this.state.slide - 1] = this.state.data[this.state.slide - 1] + 1;

                if(this.state.lastETA == this.state.slide){
                    this.state.multiple = "You've already clicked that.";
                }
                else{
                    this.state.lastETA = this.state.slide;
                }

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
            // fetch('api/addInstance?sessionID=1&slide=' + ++this.state.slide, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res =>{
            if(res.ok){
                this.changeSlide();
                this.state.multiple = '';
                this.setState({success2: 'New slide instance created.'});
            }
            else{
                --this.state.slide;
                this.setState({success2: 'Trouble creating slide instance.'});
            }
        })
    },

    changeSlide(){
        this.state.labels.push('Slide #' + (this.state.slide).toString());
        this.state.data.push(0);
    },

    render () {
        let graphData = {
            labels: this.state.labels,
            datasets: [
                {
                    label: "Confusometer",
                    borderWidth: 1,
                    data: this.state.data
                }
            ]
        };
        return (
            <div>
                <div className="row contentContent">
                    <Bar className="theGraph" data={graphData} width="1000" height="600"/>
                </div>
                <div className="row contentControls">
                    <div className="row">
                        <div className="col-md-2">
                            <button onClick={this.handleConfused}>Explain that again</button>
                        </div>

                        <div className="col-md-2">
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
                        <div className="col-md-2">
                            {this.state.multiple}
                        </div>
                    </div>
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





