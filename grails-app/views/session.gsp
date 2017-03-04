<!DOCTYPE HTML>
<html>
<head>
    <script src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
    <script type="text/javascript">

        window.onload = function () {
            CanvasJS.addColorSet("1color",
                [//colorSet Array
                    "#3CB371"
                    //"#008080"
                ]);
            var dataPoints = [{y : 10}, {y : 13}, {y : 18}, {y : 20}, {y : 17}];
            var chart = new CanvasJS.Chart("chartContainer", {
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
            var yVal = 15; //updateCount = 0;
            var updateChart = function () {

                yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
                updateCount++;

                dataPoints.push({
                    y : yVal
                });
                chart.render();

            };
            //update every 1 seconds
            setInterval(function(){updateChart()}, 1000);
        }
    </script>
</head>
<body>
<div id="chartContainer" style="height: 300px; width: 100%;"></div>
</body>
</html>

