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
    %{--<asset:stylesheet src="bundle.css"/>--}%

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${resource(dir: 'stylesheets', file: 'session.css')}" type="text/css">

</head>

<body>

    <div class="row">
        <div class="row topRow">
            <div class="col-md-6 text-center">
                Session ID: ${this.params.sessionId}
            </div>
            <div class="col-md-6 text-center">
                <g:link controller="Session" action="endSession" params="[sessionId: 1]">End Session</g:link>
            </div>
        </div>
        <div class="row fullsize">
            <div class="col-lg-8 text-center contentSession">
                <div id="graph"></div>
            </div>

            <div class="col-lg-3 text-center chatSession">
                CHAT<br>(FORTHCOMING)
            </div>
        </div>
    </div>

    <div class="row text-center">
        <g:link controller="Session" action="returnToIndex">Back</g:link>
    </div>


    %{--Bundles all javascripts into a single file--}%
    <asset:javascript src="bundle.js"/>

</body>

</html>