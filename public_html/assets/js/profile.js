
var OWNER;
var COURSEID;

$(document).ready(function () {


    checkLoggedIn();


    checkOwner();


    showCourses();



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
                console.log(data);

                if (data.success === true) {
                    $('#troubleCourse').addClass('hidden');
                    $('#addCourse').modal('hide');

                    // Append the new course to the course list
                    var li = createCourseLi(data.id.id, courseName);

                    document.getElementById('courses').appendChild(li);

                    $('.sessionAnchor').each(function () {
                        $(this).on('click', function () {
                            COURSEID = $(this).attr('data-id');
                            console.log(COURSEID);
                        })
                    });

                }
                else {

                    $('#troubleCourse').removeClass('hidden');

                }
            }
        });
    });



    $('#createSession').submit(function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var thisForm = $(this).closest('#createSession');
        var sessionName = thisForm.find('#sessionName').val();
        var sendData = JSON.stringify({
            'sessionName': sessionName,
            'courseid': COURSEID
        });


        $.ajax({
            url: '../controller/addSession.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));
                console.log(data);

                if (data.success === true) {
                    $('#troubleSession').addClass('hidden');
                    $('#addSession').modal('hide');



                }
                else {

                    $('#troubleSession').removeClass('hidden');

                }
            }
        });
    });


    $('.logout').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            Cookies.remove('username');
            window.location = "../index.php";
        })
    });


});



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
    an.innerHTML = "Add session";

    // An unordered list where the session information will go
    var ul = document.createElement('ul');
    ul.setAttribute('data-id', id);
    ul.setAttribute('class', 'sessions');

    li.appendChild(an);
    li.appendChild(ul);

    return li;
}



function showCourses() {

    var sendData = JSON.stringify({
        'owner': OWNER
    });

    $.ajax({
        url: '../controller/getCourses.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                var courses = data.courses;

                var list = document.getElementById('courses');

                for(var i = 0; i < courses.length; i++){

                    var li = createCourseLi(courses[i].id, courses[i].coursename);

                    list.appendChild(li);
                }

            }
            else {

                // todo: need an error page

            }

            $('.sessionAnchor').each(function () {
                $(this).on('click', function () {
                    COURSEID = $(this).attr('data-id');
                    console.log(COURSEID);
                })
            });
        }
    });


}



function checkLoggedIn() {
    if(Cookies.get('username') == undefined){
        window.location = "../index.php";
    }
}


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