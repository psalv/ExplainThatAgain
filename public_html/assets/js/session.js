
var OWNER;
var SESSIONID;
var COOLDOWN = false;
var FIRST = true;
var CHART;

var GRAPH_DATA = {
    labels: [],
    datasets: [
        {
            label: "Confusometer",
            borderWidth: 2,
            data: [],
            borderColor: 'rgb(227, 227, 227, 1)',
            backgroundColor: 'rgb(227, 227, 227, 1)'

        }
    ]

};

// update every 15 seconds
var INTERVAL_TIME = 150000;

$(document).ready(function () {

    // Ensure the session is live
    checkLive();

    // Ensure the user is logged in
    checkLoggedIn();

    // Loads the graph data from the mysql database
    loadGraphData();

    // Creates the graph itself and links it to the data
    createGraph();

    // Either creates new graph point or just updates graph based on if the user is the owner
    checkOwnerGetSlideLink(function () {
        if(OWNER = Cookies.get('username')) {
            window.setInterval(newGraphPoint, INTERVAL_TIME);
        } else{
            window.setInterval(loadGraphData, INTERVAL_TIME);
        }
    });

    // Gets all chat messages associated with this session
    updateChat();
    window.setInterval(updateChat, 5000);

    // Explain that again button
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



/*** Submits new chat message *****************************************************************************************/

    $('#submitMessage').submit(function (e) {
        e.preventDefault();

        var thisForm = $(this).closest('#submitMessage');
        var message = thisForm.find('#message').val();

        // No empty messages
        if(message == ""){
            return;
        }

        var sendData = JSON.stringify({
            'sessionID': SESSIONID,
            'message': message,
            'owner': Cookies.get('username')
        });

        $.ajax({
            url: '../controller/newMessage.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {

                    $('#message').val("");
                    updateChat();

                }
                else {
                    console.log("Could not update chat")
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



/*** Loads all graph data and updates graph ***************************************************************************/

function loadGraphData(){
    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/loadGraphData.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                GRAPH_DATA.labels = [];
                GRAPH_DATA.datasets[0].data = [];

                var len = data.points.length;

                var startPos = len > 15? len - 15 : 0;

                for(var i = startPos; i < len; i++){
                    GRAPH_DATA.labels.push(data.points[i].xaxis);
                    GRAPH_DATA.datasets[0].data.push(data.points[i].confusion)
                }

                if(FIRST){
                    FIRST = false;
                    createGraph();
                }
                else{
                    CHART.update();
                }

            }
            else {
                console.log("New graph point could not be made")
            }
        }
    });
}

function createGraph(){

    var ctx = document.getElementById("graphArea");
    CHART = new Chart(ctx, {
        type: 'bar',
        data: GRAPH_DATA,
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 40,
                        stepSize: 1
                        }
                }]
            }
        }
    });
}



/*** Creates a new point for the graph *********************************************************************************/

function newGraphPoint(){
    var sendData = JSON.stringify({
        'sessionID': SESSIONID,
        'interval': INTERVAL_TIME/1000
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

                loadGraphData();

            }
            else {
                console.log("New graph point could not be made")
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

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                // nothing

            }
            else {
                console.log("You're not confused, it's okay, don't worry about it.")
            }
        }
    });
}



/*** Updates the chat *************************************************************************************************/

function updateChat(){
    var sendData = JSON.stringify({
        'sessionID': SESSIONID
    });

    $.ajax({
        url: '../controller/loadChatData.php',
        crossDomain: false,
        data: sendData,
        method: "POST",
        cache: false,

        complete: function (data) {

            data = $.parseJSON(parseResponse(data.responseText));

            if (data.success === true) {

                buildChat(data);

            }
            else {
                console.log("Could not update chat")
            }
        }
    });
}


function buildChat(data){
    $('#messageList').empty();
    var messageList = document.getElementById('messageList');

    for(var i = 0; i < data.messages.length; i++){
        var li = createChatMessage(data.messages[i]);
        messageList.appendChild(li);
    }
}


function createChatMessage(data) {
    var id = data.id;
    var li = document.createElement('li');
    li.setAttribute('class', 'chatMessage');
    li.setAttribute('data-chatID', id);

    // Poster
    var name = document.createElement('h3');
    name.setAttribute('class', 'chatName');
    name.innerHTML = data.username;


    var butDel = document.createElement('button');
    butDel.setAttribute('class', 'deleteButtonMessage btn btn-raised btn-primary btn-sm');
    butDel.setAttribute('data-id', id);
    butDel.innerHTML = "Delete";

    // Deletes a message
    butDel.addEventListener('click', function (e) {
        e.preventDefault();

        if(Cookies.get('username') != OWNER){
            console.log('Hey, stop doing that.');
            return;
        }

        var sendData = JSON.stringify({
            'messageid': id,
            'sessionid': SESSIONID
        });

        $.ajax({
            url: '../controller/deleteMessage.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {

                    $('.courseList').each(function () {
                        if($(this).attr('data-chatID') == id){
                            $(this).remove();
                        }
                    });
                    updateChat();

                }
                else {
                    console.log("Error deleting message")
                }
            }
        });
    });


    // Message
    var div = document.createElement('div');
    div.setAttribute('class', 'chatDiv');
    div.innerHTML = data.message;

    li.appendChild(name);
    li.appendChild(butDel);
    li.appendChild(div);
    return li;
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

function checkOwnerGetSlideLink(callback) {

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

    callback();
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