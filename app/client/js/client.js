//TODO: a lot of cleanup

(function($){

    var $header          = $('header'),
        $console         = $('.console'),
        $consoleMessages = $('.console .messages'),
        $controls        = $('.controls'),
        $activitySpinner = $('.spinner.activity'),
        $portsDropdown   = $('.ports-dropdown'),
        $settingsOverlay = $('.settings-overlay'),
        tracks           = new Array(),
        socket           = io();

    //ENTRY POINT
    $(function() {
        initClient();
    });

    /**
     * Initializes the client core
     */
    function initClient() {
        setupUI();
        setupListeners();
        loadTracks();
        getPorts();
        //When done initializing, hide the activity spinner
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 500);
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
     * Sets up all of the socket, click and general event handlers
     */
    function setupListeners() {
        socket.on('message', function(data) {
            var message = data;
            console.log('Message from server: ' + message);
            //logToConsole(message);
        });
        socket.on('connect port result', function(data) {
            if (data === true) {
                logToConsole("Connected to port");
            }
            else {
                logToConsole("Cannot connect to port");
            }
        });

        socket.on('connect', function() {
            logToConsole("Connection to server established");
        });

        socket.on('disconnect', function () {
            logToConsole("Connection to server lost");
        });

        socket.on('reconnect', function() {
            logToConsole("Reconnected to server");
            clearPorts();
            getPorts();
        });

        //The console toggle button and the cookie function
        $console.find('.toggle').on('click', function() {
            $console.toggleClass('collapsed');
            $controls.toggleClass('console-collapsed');

            var collapsed = $console.hasClass('collapsed').toString();
            Cookies.set('collapsedConsole', collapsed, {expires: 999999999});

        });
        $console.find('.clear').on('click', function() {
            $consoleMessages.empty();
        });

        $header.find('.server-settings-toggle').on('click', function() {
            $(this).removeClass('play');
            setTimeout(function () {
                $header.find('.server-settings-toggle').addClass('play');
            }, 10);
            $settingsOverlay.toggleClass('open');
            $settingsOverlay.find('.server').toggleClass('open');
        });

        $header.find('.client-settings-toggle').on('click', function() {
            $(this).removeClass('play');
            setTimeout(function () {
                $header.find('.client-settings-toggle').addClass('play');
            }, 10);
            $settingsOverlay.toggleClass('open');
            $settingsOverlay.find('.client').toggleClass('open');
        });

        //The port selection dropdown
        $portsDropdown.on('click', function() {
            $(this).toggleClass('dropped');
        });


    }

    /**
     * Loads the current plan of tracks from the server and parses it
     * TODO: outsource this method to another file
     */
    function loadTracks() {
        switch1 = new Switch(0, 0, "wl0", false);
        $controls.append(switch1.getObject());
        //TODO: temp: generate a lot of toggle buttons
        for(var x = 1; x < 23; x++) {
            for(var y = 1; y < 8; y++) {
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
     * Empties the ports list
     */
     function clearPorts() {
         $portsDropdown.find('.items').empty();
         $portsDropdown.find('.current').html("Select port");
     }

    /**
     * Get the list of available ports via AJAX and display them
     */
     function getPorts() {
         $.ajax({
             url: '/getPorts',
             type: 'GET',
             dataType: 'json',
             success: function(data) {
                 showPortsDropdown(data);
             },
             error: function(err) {
                console.log("failed to get ports");
                console.log(err);
             }
         });

         /**
          * Called when the AJAX request from the server was succesful.
          * Adds the ports the server returned to the dropdown and
          * shows it.
          * @param data - the AJAX response (the ports list) in JSON format
          */
         function showPortsDropdown(data) {
             $portsDropdown.addClass('visible');
             
             for (i = 0; i < data.length; i++) {
                 $portsDropdown.find('.items').append('<div>' + data[i].portName + "</div>");
                 $portsDropdown.find('.items > div').on('click', function() {
                    selectActivePort($(this).html());
                 });
             }
         }
     }

     /**
      * Loads the selected port to the dropdown and sends a
      * connection message to the server
      * @param text - the port name to connect to
      */
     function selectActivePort(text) {
         $portsDropdown.find('.current').html(text);
         logToConsole("Connecting to port: " + text);

         socket.emit('connect port request', text);

     }

    /**
     * Wrapper for adding objects or plain text to the console.
     * This adds a timestamp in front of the actual object or text
     * @param data - the message or object to add to the console
     */
    function logToConsole(data) {
        //append the current message (or object)
        $('.console .messages').append('<div>' + getCurrentTime() + data + '</div>');
        //calculate the height used by the objects and scroll to the bottom
        var h = 0;
        $('.console .messages').children().each(function(){ h += parseInt($(this).height());});
        h += '';
        $('.console .messages').animate({scrollTop: h}, 100);
    }

    /**
     * Function to get the current timestamp
     * @return String of style [HOURS:MINUTES:SECONDS]
     */
    function getCurrentTime() {
        var date = new Date();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var secs = date.getSeconds()  < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return "[" + hours + ":" + mins + ":" + secs + "]";
    }

    /**
     * This puts all of the toggle buttons and track icons to their intended
     * position based on their data-x and data-y value
     * (these represent the grid)
     * TODO: implement new Track class system
     */
    function alignControls() {
        $('.controls').children().each(function() {
            //TODO: get the values from somewhere, exp the width of the icons
            $(this).css('left', (50 * parseInt($(this).attr('data-x')) + 40) + 'px');
            $(this).css('top', (50 * parseInt($(this).attr('data-y')) + 40) + 'px');
        });
    }

})(jQuery)
