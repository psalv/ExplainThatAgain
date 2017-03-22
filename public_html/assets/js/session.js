
var OWNER;
var SESSIONID;
var COOLDOWN = false;

// update every 15 seconds
var INTERVAL_TIME = 30000;

$(document).ready(function () {

    // Ensure the session is live
    checkLive();

    // Ensure the user is logged in
    checkLoggedIn();

    // Unhide certain elements depending on if the user is the owner
    checkOwnerGetSlideLink(function () {
        if(OWNER = Cookies.get('username')) {
            window.setInterval(newGraphPoint, INTERVAL_TIME);
        } else{
            window.setInterval(updateGraphPoint, INTERVAL_TIME);
        }
    });

    $('#ETA').on('click', function (e) {
        e.preventDefault();
        if(!COOLDOWN){
            COOLDOWN = true;
            incrementGraph();

            // todo: change button color

            window.setInterval(function () {
                COOLDOWN = false;

                // todo: change back color

            }, INTERVAL_TIME*2);
        }

    });


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


/*** Creates a new point for the graph *********************************************************************************/

function newGraphPoint(){
    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/newGraphPoint.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                updateGraphPoint();

            }
            else {
                console.log("New graph point could not be made")
            }
        }
    });
}


/*** Creates a get new point for the graph ****************************************************************************/

function updateGraphPoint(){
    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/updateGraphPoint.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                //


            }
            else {
                console.log("Could not fetch new graph point")
            }
        }
    });
}



/*** Increments current graph value ***********************************************************************************/

function incrementGraph(){
    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/incrementGraph.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            console.log(data);
            data = $.parseJSON(parseResponse(data.responseText));
            console.log(data);

            if (data.success === true) {

            }
            else {
                console.log("You're not confused, it's okay, don't worry about it.")
            }
        }
    });
}




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