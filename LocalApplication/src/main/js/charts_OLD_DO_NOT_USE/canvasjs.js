import React from 'react';

function createNewChart (dataPoints) {
    CanvasJS.addColorSet("1color", ["#3CB371"]);

    // let chart = new CanvasJS.Chart($("#graphLocation"), {
    let chart = new CanvasJS.Chart('#chartContainer', {
        colorSet: "1color",
        title: {
            text: "Explain That Again"
        },
        axisX: {
            title: "Lecture Slide"
        },
        axisY: {
            title: "Number of Confused Students",
            interlacedColor: "#F0F8FF"
        },
        axisX2: {
            title: "Confusion Chart"
        },
        data: [
            {
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints: dataPoints
            }
        ]
    });

    chart.render();
    return chart;
}

let GraphEl = React.createClass({

    getInitialState () {
        return {
            dataPoints : [],
            chart : createNewChart([{y : 10}, {y : 13}, {y : 18}, {y : 20}, {y : 17}])
        }
    },

    render () {
        return (
            <div>
                test
                {/*<div id="chartContainer" style="height: 300px; width: 100%;">this is the graph container</div>*/}
            </div>

        );
    }

});

export class GraphE extends React.Component{
    render(){
        return(
            <GraphEl/>
        );
    }
}
