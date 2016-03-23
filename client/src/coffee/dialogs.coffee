# Class for displaying dialogs with one or two actions and some informational
# text. The dialog will be appended to the body element.
# NOTE: The actual DOM object is not created until the dialog is shown. This
# makes discarding a dialog very simple and extremely fast.
class @Dialog
    
    # @param text - The text the dialog will show.
    constructor: (text) ->
        @positiveLabel = "OK"
        @negativeLabel = "Cancel"
        @text = text

    # Set th title of the dialog. A title should be set for better user
    # orientation.
    # @param title - The title text.
    setTitle: (title) ->
        @title = title

    # Set the callback to be called when the positive action has been 
    # triggered. Optionally override the default text.
    # @param callback - Function to be called when the action is triggered.
    # @param label - Optional. Text to override the default ("OK").
    setPositiveAction: (callback, label) ->
        @positiveAction = callback
        @positiveLabel = label if label?

    # Same as withPositiveAction(), but for the negative one.
    # @param callback - Function to be called when the action is triggered.
    # @param label - Optional. Text to override the default ("Cancel").
    setNegativeAction: (callback, label) ->
        @negativeAction = callback
        @negativeLabel = label if label?

    # Create the actual DOM elements, set callbacks and display the dialog.
    # If there is already a dialog element, replace its content.
    show: ->
        $dialog = $ ".dialog"
        if not dialog?
            createdNew = true
            $dialog = $ document.createElement "div"
            $dialog.addClass "dialog"
            # Create title if neccessary
            if @title?
                $title = $ document.createElement "h2"
                $dialog.append $title
            # Add the message
            $message = $ document.createElement "p"
            $dialog.append $message
            # Create actions if neccessary
            $actionBar = $ document.createElement "div"
            $actionBar.addClass "actions"
            $dialog.append $actionBar
            if @positiveAction?
                $positive = $ document.createElement "div"
                $positive.addClass "positive"
                $actionBar.append $positive
            if @negativeAction?
                $negative = $ document.createElement "div"
                $negative.addClass "negative"
                $actionBar.append $negative
        else
            $message = $dialog.children "p"
            $title = $dialog.children "h2"
            $actionBar = $dialog.children ".actions"
            $positive = $actionBar.children ".positive"
            $positive.off "click"
            $negative = $actionBar.children ".negative"
            $negative.off "click"
            
        $message.html @text
        # Only overwirte the title if neccessary
        if @title?
            $title.html @title
        # Only overwrite the actions if neccessary
        if @positiveAction?
            $positive.html @positiveLabel
            $positive.on "click", @positiveAction
        if @negativeAction?
            console.log @negativeLabel
            $negative.html @negativeLabel
            $negative.on "click", @negativeAction
        $dialog.removeClass "hidden"

        if createdNew
            $("body").append $dialog
            $("body").append $(document.createElement "div").addClass "dialog-ov visible"

    # Hides the dialog objects from the user, but still preserves the objects
    # for better performance (caching).
    close: ->
        $("body").children(".dialog").addClass "hidden"
        $("body").children(".dialog-ov").removeClass "visible"

    # Remove the dialog box and the overlay from the DOM and delete the objects
    # This should only be used for debugging purposes. Reusing the objects
    # is always a better option.
    deleteObjects: ->
        $(".dialog").remove()
        $(".dialog-ov").remove()
        
        
