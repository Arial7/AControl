# Base class for every custom UI element.
class UIElement
    # The constructor just creates an empty div DOM object.
    # Every UI element should add its own classes in their constructor.
    constructor: () ->
        @$ = $ document.createElement "div"

    # Wrapper for jquery.on, as the UIElement does not have direct access to
    # jQuery methods.
    # @param event {String} - The event that will call the callback
    # @param callback {Function} - The function that will be called, should
    # the event occur.
    on: (event, callback) ->
        @$.on event, callback

    # Wrapper for jquery.one, as the UIElement does not have direct access to
    # jQuery methods.
    # @param event {String} - The event that will call the callback
    # @param callback {Function} - The function that will be called, should
    # the event occur.
    once: (event, callback) ->
        @$.one event, callback


class Button extends UIElement
    # @param text {String} - The label of the button.
    # @param action {Function} - Optional. A callback for the "click" event.
    # Can be added later.
    constructor: (@text, @action, @disabled) ->
        super()
        @$.addClass "button"
        @$.text @text
        @$.addClass "disabled" if @disabled
        @on "click", @action if @action?

class Pane extends UIElement
    # @param orientation {String} - Either "horizontal" or "vertical"
    constructor: (@orientation) ->
        super()
        @$.addClass "pane"
        @$.addClass @orientation
        @elements = []

    # Change the pane's orientation.
    # @param orientation {String} - The new orientation.
    setOrientation: (orientation) ->
        # This is a bit obsessive
        @orientation = orientation
        @$.removeClass "horizontal vertical"
        @$.addClass @orientation

    # Appends a single element to the pane.
    # @param element {UIElement} - The element to append.
    appendElement: (element) ->
        @elements.push element
        @$.append element.$

    # Appends multiple elements to the pane.
    # @param elements {Array<UIElement>} - The elements to append.
    appendElements: (elements) ->
        for element in elements
            @elements.push element
            @$.append element.$

    attachTo: ($parent) ->
        $parent.prepend @$

class MenuBar extends Pane
    constructor: (@title) ->
        super "horizontal"
        @$.addClass "menu-bar"
        @$.append "<h2>#{@title}</h2>"


class MenuItem extends UIElement
    constructor: (@text, @items) ->
        super()
        @$.addClass "menu-item"
        @$.text @text
        @list = $ "<ul class='menu-item-list'></ul>"
        @$.append @list
        for item in @items
            @list.append item.$

        @on "click", @toggle

    toggle: =>
        @$.toggleClass "dropped"

class MenuLabel extends UIElement
    constructor: (@text) ->
        super()
        @$.addClass "menu-label"
        @$.text @text

class MenuButton extends Button
    constructor: (@text, @action, @disabled) ->
        super @text, @action, @disabled
        @$.addClass "menu-button"

class MenuDivider extends UIElement
    constructor: ->
        super()
        @$.addClass "menu-divider"

class MenuCheckbox extends UIElement
    constructor: (@label, @action, @checked) ->
        super()
        @$.addClass "menu-checkbox"
        @$.text @label
        @$.addClass "checked" if @checked
        @on "click", @toggle

    toggle: =>
        @checked = !@checked
        @$.toggleClass "checked"
        @action @checked

class MenuRadioList extends UIElement
    constructor: (@label) ->
        super()
        @$.addClass "menu-radiolist"
        @$.text @label
        @list = $ "<ul class='menu-radiolist-list'></ul>"
        @$.append @list
        @items = []

    addItem: (item) ->
        @items.push item
        @list.append item.$

    addItems: (items) ->
        for item in items
            @items.push item
            @list.append item.$

    getSelectedItem: ->
        for item in @items
            if item.selected
                return item

    getSelectedValue: ->
        for item in @items
            if item.selected
                return item.text

    empty: ->
        @items = []
        @list.empty()

class RadioButton extends Button
    constructor: (@text, @parent) ->
        super @text
        @$.addClass "radio-button"
        @parent.addItem @
        @on "click", @click

    attachTo: (parent) ->
        @parent = parent

    deselect: ->
        @selected = false
        @$.removeClass "selected"

    click: =>
        item.deselect() for item in @parent.items
        @selected = true
        @$.addClass "selected"
        
        
    
