import React from 'react';
import ReactDOM from 'react-dom';
import fusioncharts from 'fusioncharts';
// Load the charts module
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

// Pass fusioncharts as a dependency of charts
var x = 10;
FusionCharts.ready(function () {
    var myDataSource = {
        chart: {
            caption: "Explain That Again",
            subCaption: "Confusion graph",
            theme: "ocean"
        },
        data: [{
            label: "Confused Students",
            value: x
        }]
    };

    var revenueChartConfigs = {
        id: "revenue-chart",
        type: "column2d",
        width: "80%",
        height: 400,
        dataFormat: "json",
        dataSource: myDataSource
    };

    ReactDOM.render( < ReactFC {...revenueChartConfigs }/>,
        document.getElementById('chart-container')
    );
});