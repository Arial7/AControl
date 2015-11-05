//TODO: a lot of cleanup

(function($){

    var $console = $('.console'),
        $consoleMessages = $('.console .messages'),
        $controls = $('.controls'),
        $activitySpinner = $('.spinner.activity'),
        socket = io();


    //ENTRY POINT
    $(function() {
        initClient();
    });

    /**
     * Loads the current plan of tracks from the server and parses it
     * TODO: outsource this method to another file
     */
    function loadTracks() {
        //TODO: temp: generate a lot of toggle buttons
        for(var x = 0; x < 23; x++) {
            for(var y = 0; y < 8; y++) {
                //TODO: create skeletons for the toggle buttons and track icons
                $controls.append('<div class="track switch" data-id="' + (x + y + 1) * (y + x + 1) + '" data-icn="g0" data-x="' + x + '" data-y="' + y + '"></div>');
            }
        }

        //Set up the toggle buttons
        $('.track.switch').click(function(){
            socket.emit('toggle message', $(this).attr('data-id'));
        });

        $('.track.switch').each(function() {
            $(this).addClass($(this).attr('data-icn'));
        });

        alignControls();

    }

    /**
     * Sets up all of the socket, click and general event handlers
     */
    function setupListeners() {
        socket.on('message', function(data) {
            var message = data;
            console.log('Message from server: ' + message);
            logToConsole(message);
        });

        $console.find('.toggle').on('click', function() {
            $console.toggleClass('collapsed');
            $controls.toggleClass('console-collapsed');

            var collapsed = $console.hasClass('collapsed').toString();
            Cookies.set('collapsedConsole', collapsed, {expires: 999999999});

        });
    }

    /**
     * Initializes the client core
     */
    function initClient() {
        setupUI();
        setupListeners();
        loadTracks();
        $activitySpinner.addClass('hidden');
        console.log('Client initialized');
    }

    /**
     * Handles initialization of some UI components
     */
    function setupUI() {
        if (Cookies.get('collapsedConsole') == "true") {
            $console.addClass('collapsed');
            $controls.addClass('console-collapsed');
        }
    }

    /**
     * Wrapper for adding objects or plain text to the console.
     * This adds a timestamp in front of the actual object or text
     */
    function logToConsole(data) {
        //append the current message (or object)
        $('.console .messages').append('<div>[' + getCurrentTime() + '] ' + data + '</div>');
        //calculate the height used by the objects and scroll to the bottom
        var h = 0;
        $('.console .messages').children().each(function(){ h += parseInt($(this).height());});
        h += '';
        $('.console .messages').animate({scrollTop: h}, 100);
    }

    /**
     * Function to get the current timestamp
     * @return String of HOURS:MINUTES:SECONDS
     */
    function getCurrentTime() {
        var date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    /**
     * This puts all of the toggle buttons and track icons to their intended
     * position based on their data-x and data-y value (these represent the grid)
     */
    function alignControls() {
        $('.controls').children().each(function() {
            //TODO: get the values from somewhere, exp the width of the icons
            $(this).css('left', (50 * parseInt($(this).attr('data-x')) + 40) + 'px');
            $(this).css('top', (50 * parseInt($(this).attr('data-y')) + 40) + 'px');
        });
    }
})(jQuery)
