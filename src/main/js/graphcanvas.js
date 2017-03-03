import React from 'react';
import { Bar } from 'react-chartjs'


let MyComponent = React.createClass({

    getInitialState () {
        return {
            labels: ['Slide #1', 'Slide #2'],
            data: [10, 20],
            slide : 0
        }
    },

    changeSlide(){
        this.state.labels.push('Slide #3');
        this.state.data.push(30);
    },

    render: function() {
        let graphData = {
            labels: this.state.labels,
            datasets: [
                {
                    label: "Confusometer",
                    borderWidth: 1,
                    data: this.state.data,
                }
            ]
        };
        return <Bar data={graphData} width="600" height="250"/>;
    }
});

export class GComp extends React.Component{
    render(){
        return(
            <MyComponent/>
        );
    }
}