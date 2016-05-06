do($ = jQuery) ->
    
    @socket = io()
    @mainMenu = $ 'nav#main-menu'
    @portListParent = @mainMenu.find '#port-list-parent'
    @settings = []

    # Initialize the client base, when the page has loaded
    $ ->
        initBase()
    
    # Initialize base system, such as the settings, load the ports
    initBase = ->
        initSettingsView()
        setupSocketListeners()
        loadPorts()

    loadPlan = ->
        console.log "Loading plan..."

    initSettingsView = ->
        $body = $ "body"

        portsRadioList = new MenuRadioList "Port"

        menuBar = new MenuBar "AControl"
        menuBar.attachTo $body

        menuBar.appendElement new MenuItem "File", [
            new MenuButton "Load Plan", loadPlan
            new MenuButton "Edit Plan", editPlan
            new MenuDivider
            new MenuButton "Shutdown Server", shutdownServer
        ]

        menuBar.appendElement new MenuItem "Connection", [
            new MenuButton "Connect", connectToPort
            new MenuButton "Disconnect", disconnectFromPort, true
            portsRadioList
        ]

        menuBar.appendElement new MenuItem "Tools", [
            new MenuButton "Settings", null, true
            new MenuButton "Help", null, true
        ]
     
    # Connect common socket events to their handlers.
    # Note that specialized events might be listened to from
    # another location.
    setupSocketListeners = =>
        # Received when the connection to the server is established
        @socket.on "connect", =>
            @log "Connected to the server"
        # Received when the connection to the server is lost
        @socket.on "disconnect", =>
            @log "Disconnected from the server"
        # Received when the connection to the server is
        # re-established.
        @socket.on "reconnect", =>
            @log "Reconnected to the server"
        # Received when the server wants to notify every/a generic
        # client about something (such as upcoming events).
        @socket.on "message", (message) =>
            @log message

    # Sends an AJAX request to the server, asking for a list of the
    # available port to connect to.
    # After getting a positive response, updatePortList() is called
    loadPorts = =>
        # Clears the children of the port list, afterwards add the
        # new children.
        updatePortList = (data) =>
            @portListParent.children().empty()
            @portListParent.html "Ports"
            portList = document.createElement "ul"
            $portList = $ portList
            for port in data
                $portList.append "<li>#{port.portName}</li>"
            
            $portList.find("li").on "click", ->
                selectActivePort this.innerHTML

            @portListParent.append $portList

        # Send the AJAX request
        $.ajax {
            url: "/ports"
            type: "GET"
            dataType: "json"
            success: (data) ->
                updatePortList data
            error: (err) =>
                @log err, true
        }
    
    # Selects the currently active port, to be used later while
    # connecting.
    selectActivePort = (port) =>
        @currentPort = port
        settingsChanged()



    # ACTIONS -----------------------------------------------------


    # Handler for 'File/Shutdown Server'
    # Will show a Dialog to the user, if confirmed, will emit
    # server shutdown event.
    @shutdownServer = =>
        # TODO: implement shutting down the server
        shutdown = () =>
            @log "Shutting down Server..."
            confirmationDialog.close()

        confirmationDialog = new Dialog "Do you really want to shutdown 
            the server? This will disconnect all other clients and kill 
            the connection to the ABase. Note that restarting the server
            might take some time, so killing it while trains are rolling 
            could be dangerous."
        confirmationDialog.setTitle "Shutdown Server"
        confirmationDialog.setNegativeAction shutdown, "OK"
        confirmationDialog.setPositiveAction ->
            confirmationDialog.close()
        , "Cancel"
        confirmationDialog.show()

    # Handler for 'Connection/Connect'
    # Will send a request to the server, asking to connect to a
    # specified port.
    @connectToPort = =>
        @log "Connecting to ABase..."
    
    # Handler for 'Connection/Disconnect'
    # Sends the disconnect request to the server.
    @disconnectFromPort = =>
        @log "Disconnecting from ABase..."

    # Handler for 'File/Edit Plan'
    # Loads the plan editor.
    @editPlan = =>
        # TODO: reimplement the plan editor
        @log "Editing Plan..."
    
    # Hanlder for 'File/Load Plan'
    # Shows a dialog to the user, asking for a plan file to be
    # opened.
    @loadPlan = =>
        @log "Loading Plan..."


