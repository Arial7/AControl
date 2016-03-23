do($ = jQuery) ->
    
    @socket = io()
    @mainMenu = $ 'nav#main-menu'
    @portListParent = @mainMenu.find '#port-list-parent'
    @logList = $ ".log-list"
    @settings = []

    # Initialize the client base, when the page has loaded
    $ ->
        initBase()
    
    # Initialize base system, such as the settings, load the ports
    initBase = () =>
        console.log "Initializing base system"
        initSettingsView()
        loadPorts()

    # Initialize the settings inside of the main navigation
    initSettingsView = () =>
        $settings = @mainMenu.children().find('li').each (i) =>
            self = @mainMenu.children().find('li').eq i
            $this = $ self
            # Save the settings state, this will be used for
            # updating the views
            settingName = $this.attr "id"
            # Note that dividers do not have an ID
            if settingName?
                settingName = settingName.substring 2
                @settings.push
                    name: settingName
                    disabled: $this.attr("data-disabled")?
                    action: $this.attr "data-action"
                    type: $this.attr "data-type"

            # Add the disabled class - disabling pointer events
            if $this.attr("data-disabled")?
                $this.addClass "disabled"
            
            # Add the type's class for styling
            type = $this.attr "data-type"
            $this.addClass type

            if type is "button"
                actionName = $this.attr "data-action"
                $this.on "click", @[actionName]
            
            # TODO: handle checkboxes
        @log "Initialized settings"

    # Should be called when one or more settings have been changed.
    # This will update the views accordingly.
    settingsChanged = () =>



    # Sends an AJAX request to the server, asking for a list of the
    # available port to connect to. 
    # After getting a positive response, updatePortList() is called
    loadPorts = () =>
        
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
            url: "/getPorts"
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

    # Creates message boxes in the logging list. Can be used for
    # debugging and common messages.
    # @param message - String to be displayed
    # @param error - Optional. If true, the box is displayed with a
    # red background.
    @log = (message, error) =>
        messageBox = document.createElement "div"
        $messageBox = $ messageBox
        $messageBox.addClass "log-message"
        $messageBox.addClass "log-error" if error? and error is true
        messageBox.innerHTML = message

        @logList.append $messageBox

        setTimeout ->
            $messageBox.addClass "done"
            setTimeout ->
                $messageBox.remove()
            , 700
        , 5000


    # ACTIONS

    @shutdownServer = () =>
        shutdown = () =>
            @log "Shutting down Server..."
            confirmationDialog.close()

        confirmationDialog = new Dialog "Do you really want to shutdown 
            the server? This will disconnect all other clients and kill 
            the connection to the ABase"
        confirmationDialog.setTitle "Shutdown Server"
        confirmationDialog.setNegativeAction shutdown, "OK"
        confirmationDialog.setPositiveAction ->
            confirmationDialog.close()
        , "Cancel"
        confirmationDialog.show()
    @connectToPort = () =>
        @log "Connecting to ABase..."

    @disconnectFromPort = () =>
        @log "Disconnecting from ABase..."

    @editPlan = () =>
        @log "Editing Plan..."

    @loadPlan = () =>
        @log "Loading Plan..."
