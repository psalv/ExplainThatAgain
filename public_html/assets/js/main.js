

$(document).ready(function () {
    checkLoggedIn();

    $('.logout').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            Cookies.remove('username');
            window.location = "../index.php";
        })
    });

    $('#searchProfessors').submit(function (e) {
        e.preventDefault();

        var thisForm = $(this).closest('#searchProfessors');
        var searchString = thisForm.find('#profSearch').val();
        var sendData = JSON.stringify({
            'searchString': searchString
        });

        console.log(sendData);

        $.ajax({
            url: '../controller/search.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                console.log(data);

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {

                    console.log('success');

                    // window.location = "html_elements/search.php?searchString=" + searchString;
                }
                else {

                    console.log('failure');
                    // todo add an error page
                }
            }
        });
    });

});


function checkLoggedIn() {
    if(Cookies.get('username') == undefined){
        window.location = "../index.php";
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