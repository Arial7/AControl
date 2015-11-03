var socket = io();
socket.on('message', function(data) {
    var message = data;
    console.log('Message from server: ' + message);
    logToConsole(message);
});

$(function(){
    //TODO: temp: generate a lot of toggle buttons
    for(var x = 0; x < 23; x++) {
        for(var y = 0; y < 10; y++) {
            $('.controls').append('<div class="toggle-btn" data-id="' + x * (y + x) + '" data-icn="WL0-R", data-x="' + x + '" data-y="' + y + '"></div>');
        }
    }

    //Set up the toggle buttons
    $('.toggle-btn').click(function(){
        socket.emit('toggle message', $(this).attr('data-id'));
    });

    $('.toggle-btn').css('background-image: ', 'url("/img/' + $(this).attr('data-icn') + '.png")');

    alignControls();

    $('.console .toggle').on('click', function() {
        $('.console').toggleClass('collapsed');
        $('.controls').toggleClass('console-collapsed');
    });

    console.log('Client initialized');
});

function logToConsole(data) {
    $('.console .messages').append('<div>' + data + '</div>');
    var h = 0;
    $('.console .messages').children().each(function(){ h += parseInt($(this).height());});
    h += '';
    $('.console .messages').animate({scrollTop: h});
}

function alignControls() {
    $('.controls').children().each(function() {
        //TODO: get the values from somewhere, exp the width of the icons
        $(this).css('left', (50 * parseInt($(this).attr('data-x')) + 40) + 'px');
        $(this).css('top', (50 * parseInt($(this).attr('data-y')) + 40) + 'px');
    });
}
