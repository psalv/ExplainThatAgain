


var OWNER;
var COURSEID;



$(document).ready(function () {

    // Ensure the user is logged in
    checkLoggedIn();

    // Unhide certain elements depending on if the user is the owner
    checkOwner();

    // Get all courses associated with the profile
    showCourses();



/*** Create a course **************************************************************************************************/

    $('#createCourse').submit(function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var thisForm = $(this).closest('#createCourse');
        var courseName = thisForm.find('#courseName').val();
        var sendData = JSON.stringify({
            'courseName': courseName,
            'owner': OWNER
        });


        $.ajax({
            url: '../controller/addCourse.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {
                    $('#troubleCourse').addClass('hidden');
                    $('#addCourse').modal('hide');

                    // Append the new course to the course list
                    var li = createCourseLi(data.id.id, courseName);
                    document.getElementById('courses').appendChild(li);

                }
                else {

                    $('#troubleCourse').removeClass('hidden');

                }
            }
        });
    });



/*** Create a session *************************************************************************************************/

    $('#createSession').submit(function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var thisForm = $(this).closest('#createSession');
        var sessionName = thisForm.find('#sessionName').val();
        var slideLink = thisForm.find('#slideLink').val();
        var sendData = JSON.stringify({
            'sessionName': sessionName,
            'courseid': COURSEID,
            'owner': OWNER,
            'slideLink': slideLink
        });


        $.ajax({
            url: '../controller/addSession.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {
                    $('#troubleSession').addClass('hidden');
                    $('#addSession').modal('hide');

                    var li = createSessionLi(data.id.sessionid, sessionName);

                    $('.sessions').each(function () {
                        if($(this).attr('data-id') == COURSEID){
                            $(this).append(li);
                            return;
                        }
                    })
                }
                else {
                    $('#troubleSession').removeClass('hidden');
                }
            }
        });
    });


    // Logout the user
    $('.logout').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            Cookies.remove('username');
            window.location = "../index.php";
        })
    });

    // Logout the user
    $('.profileButton').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            window.location = "profile.php?user=" + Cookies.get('username');
        })
    });

    // Logout the user
    $('.homeButton').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            window.location = "loggedin.php";
        })
    });


});



/*** Create html elements to display and give functionality to a new course *******************************************/

function createCourseLi(id, courseName){
    var li = document.createElement('li');
    li.setAttribute('class', 'courseList');
    li.setAttribute('data-courseID', id);
    li.innerHTML = courseName;

    // Create an anchor to target the add session modal
    var an = document.createElement('a');
    an.setAttribute('data-toggle', 'modal');
    an.setAttribute('data-target', '#addSession');
    an.setAttribute('class', 'sessionAnchor');
    an.setAttribute('data-id', id);
    an.innerHTML = "+ Add session";

    // Add an even listener to set the current courseid whenever this anchor is clicked
    an.addEventListener('click', function () {
        COURSEID = $(this).attr('data-id');
    });


    var butDel = document.createElement('button');
    butDel.setAttribute('class', 'deleteButtonCourse btn btn-raised btn-primary btn-sm');
    butDel.setAttribute('data-id', id);
    butDel.innerHTML = "Delete";



    // Deletes a course
    butDel.addEventListener('click', function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var sendData = JSON.stringify({
            'courseid': id
        });

        $.ajax({
            url: '../controller/deleteCourse.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {

                    $('.courseList').each(function () {
                        if($(this).attr('data-courseID') == id){
                            $(this).remove();
                        }
                    });

                }
                else {
                    window.location = "youarelost.php";
                }
            }
        });
    });





    // An unordered list where the session information will go
    var ul = document.createElement('ul');
    ul.setAttribute('data-id', id);
    ul.setAttribute('class', 'sessions');

    li.appendChild(an);
    li.appendChild(butDel);
    li.appendChild(ul);

    return li;
}



/*** Create html elements to display and give functionality to a new session ******************************************/

function createSessionLi(id, sessionName){
    var li = document.createElement('li');
    li.setAttribute('class', 'sessionList');
    li.setAttribute('data-sessionID', id);
    li.innerHTML = sessionName;

    // Create an anchor to target the add session modal
    var an = document.createElement('a');
    an.setAttribute('href', '#' + id);
    an.setAttribute('class', 'sessionLink');
    an.setAttribute('data-id', id);

    // Navigate to session if it is live
    an.addEventListener('click', function (e) {
        e.preventDefault();

        var sendData = JSON.stringify({
            'sessionID': id
        });


        $.ajax({
            url: '../controller/getLive.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {
                    window.location = "session.php?id=" + id;
                }
                else {
                    window.location = "youarelost.php";
                }
            }
        });
    });
    an.innerHTML = "go to session";


    var but = document.createElement('button');
    but.setAttribute('class', 'liveButton btn btn-raised btn-primary btn-sm');
    but.setAttribute('id', 'live-' + id);
    but.setAttribute('data-id', id);
    but.innerHTML = "Live";

    var sendData = JSON.stringify({
        'sessionID': id
    });

    // Check if the sessions are live.
    $.ajax({
        url: '../controller/getLive.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                but.setAttribute('style', 'background-color: red !important')
            }
        }
    });

    // Add an even listener to toggle the 'liveness' of a session
    but.addEventListener('click', function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var sendData = JSON.stringify({
            'sessionid': id
        });

        $.ajax({
            url: '../controller/toggleLive.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {

                    if(data.live == 1){
                        $('#live-' + id).css('background-color', 'red !important');

                    }
                    else{
                        $('#live-' + id).css('background-color', 'none');


                    }

                }
                else {
                    window.location = "youarelost.php";
                }
            }
        });
    });



    var butDel = document.createElement('button');
    butDel.setAttribute('class', 'deleteButtonSession btn btn-raised btn-primary btn-sm');
    butDel.setAttribute('data-id', id);
    butDel.innerHTML = "Delete";


    // Deletes a session
    butDel.addEventListener('click', function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var sendData = JSON.stringify({
            'sessionid': id
        });

        $.ajax({
            url: '../controller/deleteSession.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {

                    $('.sessionList').each(function () {
                        if($(this).attr('data-sessionID') == id){
                            $(this).remove();
                        }
                    });

                }
                else {
                    window.location = "youarelost.php";
                }
            }
        });
    });


    var butNotes = document.createElement('button');
    butNotes.setAttribute('class', 'deleteButtonNotes btn btn-raised btn-primary btn-sm');
    butNotes.setAttribute('data-id', id);
    butNotes.innerHTML = "Slides";


    // Opens notes in new tab/window
    // TODO !! IMPORTANT !! ensure that we make a note for popup blockers to be off for this to work
    butNotes.addEventListener('click', function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var sendData = JSON.stringify({
            'sessionid': id
        });

        $.ajax({
            url: '../controller/getNotes.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {
                    window.open(data.url.slideLink,'_blank');

                }

                else{
                    console.log("Error opening notes")
                }
            }
        });
    });


    li.appendChild(an);
    li.appendChild(but);
    li.appendChild(butDel);
    li.appendChild(butNotes);

    return li;
}



/*** Get and show all courses using createCourseLi ********************************************************************/

function showCourses() {

    var sendData = JSON.stringify({
        'owner': OWNER
    });

    $.ajax({
        url: '../controller/getCoursesSessions.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                var courses = data.courses;

                // Iterate through all of the returned courses and create html elements for them
                var list = document.getElementById('courses');
                for(var i = 0; i < courses.length; i++){
                    var li = createCourseLi(courses[i].id, courses[i].coursename);
                    list.appendChild(li);
                }

                var sessions = data.sessions;

                // Iterate through all of the returned courses and create html elements for them
                for(var i = 0; i < sessions.length; i++){
                    var li = createSessionLi(sessions[i].sessionid, sessions[i].sessionname);


                    $('.sessions').each(function () {
                        if($(this).attr('data-id') == sessions[i].courseOwner){
                            $(this).append(li);
                        }
                    });
                }
            }
            else {
                window.location = "youarelost.php";
            }
        }
    });
}



/*** Check that the user is logged in *********************************************************************************/

function checkLoggedIn() {
    if(Cookies.get('username') == undefined){
        window.location = "../index.php";
    }
}



/*** Check if the user is owns the profile ****************************************************************************/

function checkOwner() {
    OWNER = parent.document.URL.substring(parent.document.URL.indexOf('?') + 1,
        parent.document.URL.length).split('&')[0].split('=')[1];
    $('#profileOwner').html(OWNER);
    if(Cookies.get('username') == OWNER){
        $('.ownerOnly').each(function () {
            $(this).removeClass('hidden');
        })
    }
}



/*** Parse responsetext for json **************************************************************************************/

function parseResponse(response){

    var buildResponse = "";
    var build = false;
    var next = false;
    for(var i = 0; i < response.length; i++){
        if(next){
            if(response[i] == '"'){
                return buildResponse;
            }
            else{
                next = false;
            }
        }

        if(response[i] == '{'){
            build = true;
        }

        if(build){
            buildResponse += response[i];
        }

        if(response[i] == '}'){
            next = true;
        }
    }
    return buildResponse;
}