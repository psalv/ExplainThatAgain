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
    <link rel="stylesheet" type="text/css" href="../assets/css/bootstrap.min.css">

    <!-- Custom Fonts -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="../assets/less/main.css">

</head>

<!--=========================================== MAIN FILES ==========================================-->

<body>

    <nav class="fixed nav">
        <button class="btn btn-raised btn-primary btn-lg logout">Logout</button>
        <button class="btn btn-raised btn-primary btn-lg profileButton">Profile</button>
        <button class="btn btn-raised btn-primary btn-lg homeButton">Home</button>
    </nav>

    <div class="row insetArea">

        <!-- The logout button, redirects to the index -->
        <div class="col-md-8">
            <img src="../assets/images/ETA_logo_v2_white.png" width="80%">
        </div>

        <div class="col-md-4 loginSignup">

            <div class="row">

                <!-- Search for a professor by username, will return the most similar results -->
                <form id="searchProfessors" action="" method="post">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <input type="text" id="profSearch" placeholder="Professor's Name">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="sp btn btn-raised btn-primary btn-lg">Search for professor</button>
                        </div>
                    </div>
                </form>

            </div>

            <div class="row">

                <!-- Go to a session by the specific session id -->
                <form id="goToSession" action="" method="post">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <input type="text" id="idGo" placeholder="Session ID">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="sp btn btn-raised btn-primary btn-lg">Go to session</button>
                        </div>
                    </div>
                </form>

                <div class="row hidden" id="notLive">
                    <div>That session is not live</div>
                </div>

            </div>

        </div>

    </div>




<!--=========================================== JS SCRIPTS ==========================================-->


<!-- jQuery -->
<script src="../assets/js/jquery.min.js" type="text/javascript"></script>

<!-- Bootstrap Core JavaScript -->
<script src="../assets/js/bootstrap.min.js" type="text/javascript"></script>

<!-- Plugin JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

<!-- Cookies -->
<script src="../assets/js/js.cookie.js" type="text/javascript"></script>

<!-- Scripts -->
<script src="../assets/js/search.js" type="text/javascript"></script>

</body>
</html>
