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

    <!-- The name of the profile owner -->
    <div class="row text-center text-uppercase">
        <h1 id="profileOwner"></h1>
    </div>

    <div class="row ownerOnly">

        <div class="row">

            <!-- The logout button, redirects to the index -->
            <div class="col-md-8">
                <button class="btn btn-raised btn-primary btn-lg logout">Logout</button>
            </div>

            <div class="col-md-4">

                <a href="#" data-toggle="modal" data-target="#addCourse">Add course</a>

            </div


        </div>


        <!-- A modal for creating a course -->
        <div class="modal fade" id="addCourse" tabindex="-1" role="dialog" aria-labelledby="Terms Of Service" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="row">

                        <!-- Create a course  -->
                        <form id="createCourse" action="" method="post">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" id="courseName" placeholder="Course Name">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <button class="btn btn-raised btn-primary btn-lg">Create Course</button>
                                </div>
                            </div>
                        </form>

                    </div>

                    <div class="row">

                        <!-- Prompts for when the course cannot be created -->
                        <div id="troubleCourse" class="hidden toggle-Hidden col-md-12 text-center">
                            Could not create course, ensure that it does not already exist.
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>


    <!-- An area for the search results to populate to -->
    <div class="row">
        <ul id="courses"></ul>
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
<script src="../assets/js/profile.js" type="text/javascript"></script>

</body>
</html>
