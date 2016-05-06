# Creates message boxes in the logging list. Can be used for
# debugging and common messages.
# @param message - String to be displayed
# @param error - Optional. If true, the box is displayed with a
# red background.
@log = (message, error) =>
    $messageBox = $ "<div></div>"
    $messageBox.addClass "log-message"
    $messageBox.addClass "log-error" if error? and error is true
    $messageBox.text message

    @logList.append $messageBox

    $messageBox.addClass "show"

    setTimeout ->
        $messageBox.removeClass "show"
        setTimeout ->
            $messageBox.remove()
        , 700
    , 5000


