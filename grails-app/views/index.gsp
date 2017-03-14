
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
    <link rel="apple-touch-icon" sizes="57x57" href="../assets/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="60x60" href="">
    <link rel="apple-touch-icon" sizes="72x72" href="">
    <link rel="apple-touch-icon" sizes="76x76" href="">
    <link rel="apple-touch-icon" sizes="114x114" href="../assets/images/apple-touch-icon-retina.png">
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
    <link rel="stylesheet" type="text/css" href="../assets/stylesheets/bootstrap.css">

    <!-- Custom Fonts -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Raleway:300,400,700" rel="stylesheet">

    <!-- Custom CSS -->

</head>




    <body>

    <div id="root">test</div>

    <g:link controller="User" action="show" params="[username: 'test']">Navigate to profile</g:link>
    <g:link controller="Session" action="show" params="[sessionId: '1']">Navigate to session</g:link>

    %{--Bundles all javascripts into a single file--}%
    <asset:javascript src="bundle.js"/>

    </body>



</html>

