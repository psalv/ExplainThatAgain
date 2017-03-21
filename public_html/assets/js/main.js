

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
                            buildUrl += similar[i].username + '&';
                        }
                        window.location = buildUrl;
                    }

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