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

<div class="row">
    <div class="row">

        <!-- The logout button, redirects to the index -->
        <div class="col-md-12">
            <button class="btn btn-raised btn-primary btn-lg logout">Logout</button>
            <button class="btn btn-raised btn-primary btn-lg profileButton">Profile</button>
            <button class="btn btn-raised btn-primary btn-lg homeButton">Home</button>
        </div>

    </div>

    <div class="row" id="slideArea">
        <div class="col-md-7">
            <iframe id="presentation" src="" frameborder="0" width="700" height="500" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>

        <div class="col-md-5">
            <canvas id="graphArea" width="700" height="500"></canvas>
        </div>
    </div>

    <div class="row">
        <button class="btn btn-raised btn-primary btn-lg" id="ETA">Explain that again</button>
    </div>
</div>


<div class="row">

    <div class="row">
        <div class="messages">
            <ul id="messageList"></ul>
        </div>
    </div>

    <div class="row">
        <form id="submitMessage" action="" method="post">
            <div class="row">
                <div class="col-md-6">
                    <input type="text" id="message" placeholder="Your chat message">
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 text-center">
                    <button class="btn btn-raised btn-primary btn-lg">Submit</button>
                </div>
            </div>
        </form>
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
<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js" type="text/javascript"></script>
<script src="../assets/js/session.js" type="text/javascript"></script>

</body>
</html>
