

$(document).ready(function () {

/*** Create user ******************************************************************************************************/

    if(Cookies.get('username') != undefined){
        window.location = "html_elements/loggedin.php";
    }

    $('#submitUser').submit(function (e) {
        e.preventDefault();

        var thisForm = $(this).closest('#submitUser');
        var password = thisForm.find('#formPass').val();
        if(password != thisForm.find('#formPassC').val()){
            toggleHiddenToggler('#noMatch');
            return;
        }

        var username = thisForm.find('#formUser').val();
        var sendData = JSON.stringify({
            'username': username,
            'password': password
        });

        if(password.length < 6){
            toggleHiddenToggler('#passLength');
        }

        $.ajax({
            url: 'controller/newUser.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));

                if (data.success === true) {
                    Cookies.remove('username');
                    Cookies.set('username', username, { expires: 7});

                    window.location = "html_elements/loggedin.php";
                }
                else {
                    toggleHiddenToggler('#taken');
                }
            }
        });

    });



/*** Facebook *********************************************************************************************************/


    //todo: redirect to facebook api
    $('#facebookLogin').on('click', function () {
        window.location();
    });


/*** Login ************************************************************************************************************/

    $('#loginUser').submit(function (e) {
        e.preventDefault();

        var thisForm = $(this).closest('#loginUser');
        var username = thisForm.find('#signinUser').val();
        var password = thisForm.find('#signinPass').val();
        var sendData = JSON.stringify({
            'username': username,
            'password': password
        });


        $.ajax({
            url: 'controller/signinUser.php',
            crossDomain: false,
            data: sendData,
            method: "POST",
            cache: false,

            complete: function (data) {

                data = $.parseJSON(parseResponse(data.responseText));
                console.log(data);

                if (data.success === true) {
                    Cookies.remove('username');
                    Cookies.set('username', username, { expires: 7});

                    window.location = "html_elements/loggedin.php";

                }
                else {
                    toggleHiddenToggler('#incorrectPass');
                }
            }
        });
    });
});









/*** Error prompts *****************************************************************************************************/

function toggleHiddenToggler(on){
    $('.toggle-Hidden').each(function () {
        $(this).addClass('hidden')
    });
    $(on).removeClass('hidden');
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