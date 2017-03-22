
var OWNER;
var SESSIONID;

$(document).ready(function () {

    // Ensure the session is live
    checkLive();

    // Ensure the user is logged in
    checkLoggedIn();

    // Unhide certain elements depending on if the user is the owner
    checkOwner();







    // Logout the user
    $('.logout').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            Cookies.remove('username');
            window.location = "../index.php";
        })
    });


});








/*** Check that the session is live *********************************************************************************/

function checkLive() {
    SESSIONID = parent.document.URL.substring(parent.document.URL.indexOf('?') + 1,
        parent.document.URL.length).split('&')[0].split('=')[1];

    // need to do a post to check if the session is live.

}



/*** Check that the user is logged in *********************************************************************************/

function checkLoggedIn() {
    if(Cookies.get('username') == undefined){
        window.location = "../index.php";
    }
}



/*** Check if the user is owns the profile ****************************************************************************/

function checkOwner() {

    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/getSessionOwner.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));
            console.log(data);
            if (data.success === true) {

                OWNER = data.owner;
                console.log(OWNER);
                $('.ownerOnly').each(function () {
                    $(this).removeClass('hidden');
                })

            }
            else {
                window.location = "youarelost.php";
            }
        }
    });
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