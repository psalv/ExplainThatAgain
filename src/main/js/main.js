

$('.profileButton').on('click', function (e) {
    e.preventDefault();
    $('#login').addClass('hidden');
    $('#session').addClass('hidden');
    $('#profile').removeClass('hidden');

});

$('.sessionButton').on('click', function (e) {
    e.preventDefault();
    $('#login').addClass('hidden');
    $('#session').removeClass('hidden');
    $('#profile').addClass('hidden');
});

$('.loginButton').on('click', function (e) {
    e.preventDefault();
    $('#login').removeClass('hidden');
    $('#session').addClass('hidden');
    $('#profile').addClass('hidden');
});