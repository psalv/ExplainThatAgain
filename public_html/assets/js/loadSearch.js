
$(document).ready(function () {
    var variables = parent.document.URL.substring(parent.document.URL.indexOf('?') + 1,
                                                    parent.document.URL.length - 1).split('&');

    var list = document.getElementById('searchResults');
    for(var i = 0; i < variables.length; i++){
        var param = variables[i].split('=')[1];
        var li = document.createElement('li');

        var an = document.createElement('a');
        an.setAttribute('href', 'profile.php?user=' + param);
        an.setAttribute('class', 'searchRedirect');
        an.setAttribute('inn', 'searchRedirect');
        an.innerHTML = param;

        li.appendChild(an);
        list.appendChild(li);
    }

});