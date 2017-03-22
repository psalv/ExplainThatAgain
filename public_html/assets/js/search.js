

$(document).ready(function () {


    // Check that the user is logged in
    checkLoggedIn();


    // Logout the user
    $('.logout').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            Cookies.remove('username');
            window.location = "../index.php";
        })
    });

    // Go to own profile
    $('.profileButton').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            window.location = "profile.php?user=" + Cookies.get('username');
        })
    });

    // Go home
    $('.homeButton').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            window.location = "loggedin.php";
        })
    });


/*** Searches for users with names similar to the search parameter, or exactly matching *******************************/

    $('#searchProfessors').submit(function (e) {
        e.preventDefault();

        var thisForm = $(this).closest('#searchProfessors');
        var searchString = thisForm.find('#profSearch').val();
        var sendData = JSON.stringify({
            'searchString': searchString
        });

        $.ajax({
            url: '../controller/search.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {

                    var similar = data.res;
                    if(similar.length == 1){
                        window.location = "profile.php?user=" + similar[0].username;
                    }
                    else{
                        var buildUrl = "searchPage.php?";
                        for(var i = 0; i < similar.length; i++){
                            buildUrl += i + '=' + similar[i].username + '&';
                        }
                        window.location = buildUrl;
                    }

                }
                else {
                    window.location = "youarelost.php";
                }
            }
        });
    });



/*** Takes the user to a specific session by id ***********************************************************************/

    $('#goToSession').submit(function (e) {
        e.preventDefault();

        var thisForm = $(this).closest('#goToSession');
        var sessionID = thisForm.find('#idGo').val();
        var sendData = JSON.stringify({
            'sessionID': sessionID
        });

        $.ajax({
            url: '../controller/getLive.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));
                console.log(data);

                if (data.success === true) {

                    window.location = "session.php?id=" + data.id;

                }
                else {
                    $('#notLive').removeClass('hidden');
                }
            }
        });
    });
});



/*** Check that the user is logged in *********************************************************************************/

function checkLoggedIn() {
    if(Cookies.get('username') == undefined){
        window.location = "../index.php";
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