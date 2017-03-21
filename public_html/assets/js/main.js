
$(document).ready(function () {

    $('#submitUser').submit(function (e) {
        e.preventDefault();

        var thisForm = $(this).closest('#submitUser');
        var password = thisForm.find('#formPass').val();
        if(password != thisForm.find('#formPassC').val()){
            $('#noMatch').removeClass('hidden');
            return;
        }

        var username = thisForm.find('#formUser').val();
        var sendData = JSON.stringify({
            'username': username,
            'password': password
        });


        $.ajax({
            url: 'controller/newUser.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {
                    Cookies.set('username', username, { expires: 7});

                    console.log(Cookies.get());
                }
                else {
                    $('#taken').removeClass('hidden');
                }
            }
        });
    });
});

function parseResponse(response){
    // if(response == null){

    // }
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