window.onload = function () {
    CanvasJS.addColorSet("1color",
        [//colorSet Array
            "#3CB371"
            //"#008080"
        ]);
    let dataPoints = [{y : 10}, {y : 13}, {y : 18}, {y : 20}, {y : 17}];
    let chart = new CanvasJS.Chart("chartContainer", {
        colorSet: "1color",
        title:{
            text: "Explain That Again"
        },
        axisX:{
            title : "Lecture Time"
        },
        axisY:{
            title : "Number of Confused Students",
            interlacedColor: "#F0F8FF"
        },
        axisX2:{
            title : "Confusion Chart"
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
    let yVal = 15, updateCount = 0;
    let updateChart = function () {

        yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
        updateCount++;

        dataPoints.push({
            y : yVal
        });
        chart.render();

    };
    //update every 1 seconds
    setInterval(function(){updateChart()}, 1000);
};