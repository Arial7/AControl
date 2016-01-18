(function($){

    var $header          = $('header'),
        $console         = $('.console'),
        $consoleMessages = $('.console .messages'),
        $controls        = $('.controls'),
        $activitySpinner = $('.spinner.activity'),
        $portsDropdown   = $('.ports-dropdown'),
        $settingsOverlay = $('.settings-overlay'),
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
        socket.on('connect', function() {
            logToConsole("Connection to server established");
        });

        socket.on('disconnect', function () {
            logToConsole("Connection to server lost");
        });
        socket.on('connect port result', function(data) {
            if (data === true) {
                logToConsole("Connected to port");
            }
            else {
                logToConsole("Cannot connect to port");
            }
        });
        socket.on('reconnect', function() {
            logToConsole("Reconnected to server");
            clearPorts();
            getPorts();
        });
        socket.on('switch toggled', function(data) {
            logToConsole("toggled switch " + data);
            $('.switch').each(function() {
                if ($(this).attr('switchid') == data) {
                    if ($(this).hasClass("l")) {
                        $(this).removeClass("l");
                        $(this).addClass("r");
                    }
                    else {
                        $(this).removeClass("r");
                        $(this).addClass("l");
                    }
                }
            });
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
        $header.find('.refresh-ports-list').on('click', function() {
            $(this).removeClass('play');
            setTimeout(function() {
                $(this).addClass('play');
            }.bind(this), 10);
            getPorts();
        });
        $header.find('.shutdown-server-button').on('click', function() {
            if (confirm ('Are you sure to shutdown the server? It will disconnect every other client.')) {
                socket.emit("shutdownServer");
            }
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
        socket.emit("get plan request", "./plan1.acp");
        socket.on("get plan result", function(plan) {
            var i = 0;
            var switchID = 0;
            for (var y = 0; y < plan.height; y++) {
                for (var x = 0; x < plan.width; x++) {
                    var currentTrack = plan.plan[i];
                    if (currentTrack.type != undefined) {
                        var switch1 = new Switch(x, y, currentTrack.type, currentTrack.left, switchID);
                        $controls.append(switch1.getObject());
                        switchID++;
                    }
                    else {
                        var track = new Track(x, y, currentTrack);
                        $controls.append(track.getObject());
                    }
                    i++;
                }
            }
            //Set up the toggle buttons
            $('.switch').each(function() {
                $(this).on('click', function(){
                    socket.emit('toggle switch', $(this).attr('switchid'));
                });
            });
        });




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
})(jQuery)
