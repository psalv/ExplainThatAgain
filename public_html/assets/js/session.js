
var OWNER;
var SESSIONID;

$(document).ready(function () {

    // Ensure the session is live
    checkLive();

    // Ensure the user is logged in
    checkLoggedIn();

    // Unhide certain elements depending on if the user is the owner
    checkOwnerGetSlideLink();







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
});








/*** Check that the session is live ***********************************************************************************/

function checkLive() {
    SESSIONID = parent.document.URL.substring(parent.document.URL.indexOf('?') + 1,
        parent.document.URL.length).split('&')[0].split('=')[1];


    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/getLive.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === false) {
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

function checkOwnerGetSlideLink() {

    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/getSessionOwnerSlideLink.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                OWNER = data.owner;
                $('.ownerOnly').each(function () {
                    $(this).removeClass('hidden');
                });

                $('#presentation').attr('src', swapEmbed(data.slideLink));

            }
            else {
                window.location = "youarelost.php";
            }
        }
    });
}

function swapEmbed(ln) {
    var ind = ln.indexOf('pub');
    return ln.slice(0, ind) + "embed" + ln.slice(ind + 3);
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