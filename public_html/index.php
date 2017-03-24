<!DOCTYPE html>
<html lang="en">

<head>

    <!--=========================================== WEBPAGE METADATA ====================================-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Explain That Again</title>
    <!-- Favicons

    <!--=========================================== CSS FILES ===========================================-->
    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">

    <!-- Custom Fonts -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="assets/less/main.css">

</head>

    <!--=========================================== MAIN FILES ==========================================-->

<body>

<?php

    // Creates database and tables if they do not yet exist
    include_once "../init_db.php";
    $page = "index-page";
    $hasGmap = true;

    ?>

    <div class="row insetArea">

        <!-- Logo area -->
        <div class="col-md-8 text-center">
            This site uses cookies, please have them enabled.
            <img src="./assets/images/ETA_logo_v2_white.png" width="80%">
        </div>

        <div class="col-md-4 loginSignup">

            <div class="row text-center">

                <!-- Login by username and password -->
                <form id="loginUser" action="" method="post">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" id="signinUser" placeholder="User Name">
                        </div>
                        <div class="col-md-6">
                            <input type="password" id="signinPass" placeholder="Password">
                        </div>
                    </div>

                    <div class="col-md-12 text-center">
                        <button class="sp btn btn-raised btn-primary btn-lg">Login</button>
                    </div>
                </form>


            </div>

            <div class="row text-center">

                <!-- Sign up by username and password -->
                <form id="submitUser" action="" method="post">

                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" id="formUser" placeholder="User Name">
                        </div>
                        <div class="col-md-6">
                            <input type="password" id="formPass" placeholder="Password">
                            <input type="password" id="formPassC" placeholder="Confirm Password">
                        </div>
                    </div>

                    <div class="col-md-12 text-center">
                        <button class="sp btn btn-raised btn-primary btn-lg">Sign Up</button>
                    </div>
                </form>


                <button class="sp btn btn-raised btn-primary btn-lg" id="facebookLogin">Login with Facebook</button>

            </div>

            <div class="row">

                <!-- Prompts for when the user cannot login -->
                <div id="taken" class="hidden toggle-Hidden col-md-12 text-center">
                    Username taken.
                </div>

                <div id="noMatch" class="hidden toggle-Hidden col-md-12 text-center">
                    Passwords did not match.
                </div>

                <div id="incorrectPass" class="hidden toggle-Hidden col-md-12 text-center">
                    Incorrect password or username.
                </div>

                <div id="passLength" class="hidden toggle-Hidden col-md-12 text-center">
                    Passwords must be 6 characters long.
                </div>

            </div>

        </div>

    </div>


    <!--=========================================== JS SCRIPTS ==========================================-->


<!-- jQuery -->
<script src="assets/js/jquery.min.js" type="text/javascript"></script>

<!-- Bootstrap Core JavaScript -->
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>

<!-- Plugin JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

<!-- Cookies -->
<script src="assets/js/js.cookie.js" type="text/javascript"></script>

<!-- Scripts -->
<script src="assets/js/index.js" type="text/javascript"></script>

</body>
</html>
