<!DOCTYPE html>
<html lang="en">

<head>

    <!--=========================================== WEBPAGE METADATA ====================================-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Explain that Again</title>

    <!-- Favicons
    ================================================== -->
    <link rel="shortcut icon" href="">
    <link rel="apple-touch-icon" sizes="57x57" href="../../assets/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="60x60" href="">
    <link rel="apple-touch-icon" sizes="72x72" href="">
    <link rel="apple-touch-icon" sizes="76x76" href="">
    <link rel="apple-touch-icon" sizes="114x114" href="../../assets/images/apple-touch-icon-retina.png">
    <link rel="apple-touch-icon" sizes="120x120" href="">
    <link rel="apple-touch-icon" sizes="144x144" href="">
    <link rel="apple-touch-icon" sizes="152x152" href="">
    <link rel="apple-touch-icon" sizes="180x180" href="">
    <link rel="icon" type="image/png" sizes="192x192" href="">
    <link rel="icon" type="image/png" sizes="32x32" href="">
    <link rel="icon" type="image/png" sizes="96x96" href="">
    <link rel="icon" type="image/png" sizes="16x16" href="">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="">
    <meta name="theme-color" content="#ffffff">

    <!--=========================================== CSS FILES ===========================================-->
    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="${resource(dir: 'stylesheets', file: 'bootstrap.css')}" type="text/css">

    <!-- Custom Fonts -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Raleway:300,400,700" rel="stylesheet">
    <asset:stylesheet src="bundle.css"/>

    <!-- Custom CSS -->
    %{--<link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css">--}%
    <link rel="stylesheet" type="text/css" href="../../assets/stylesheets/session.css">
    <link rel="stylesheet" href="${resource(dir: 'stylesheets', file: 'session.css')}" type="text/css">
</head>

<body>

    <div class="row">
        <div class="row fullsize">
            <div class="col-lg-9 text-center contentSession">
                <div class="row contentContent">
                    this will be where the graph/slides go


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
                            var yVal = 15, updateCount = 0;
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

                    <div id="chartContainer" style="height: 300px; width: 100%;"></div>


                </div>
                <div class="row contentControls">
                    <div id="graph"></div>
                </div>
            </div>

            <div class="col-lg-3 text-center chatSession">
                this section will represent the chat
            </div>
        </div>
    </div>
<div class="row text-center">
    <g:link controller="Session" action="returnTo">Back</g:link>
</div>


%{--Bundles all javascripts into a single file--}%
<asset:javascript src="bundle.js"/>

<link rel="stylesheet" href="${resource(dir: 'javascripts', file: 'jquery-2.2.0.min.js')}" type="text/css">
</body>

</html>