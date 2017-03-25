

var SESSIONID = parent.document.URL.substring(parent.document.URL.indexOf('?') + 1,
    parent.document.URL.length).split('&')[0].split('=')[1];

$(document).ready(function () {

    checkOwnerGetSlideLink(updateChat);

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

    if(data.username == OWNER){
        name.setAttribute('class', 'chatName redText')
    }

    var butDel = document.createElement('button');
    butDel.setAttribute('class', 'deleteButtonMessage btn btn-raised btn-primary btn-sm ownerOnly hidden');
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

                callback();

            }
            else {
                window.location = "youarelost.php";
            }
        }
    });
}