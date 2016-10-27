define([ "react", "views/basicCard", "views/textfield" ], function(React, BasicCard, TextField) {
    class ConnectionCard extends React.Component {
        constructor(props) {
            super(props);
            this.state = { availablePorts: [] };
            this.onConnectClicked = this.onConnectClicked.bind(this);
        }

        onConnectClicked() {
            console.log(this.textField.getData());
        }
                /*button#ac-connection-device-menu.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon
                    i.material-icons(role="presentation") arrow_drop_down
                ul.mdl-menu.mdl-menu__item.mdl-js-menu.mdl-js-ripple-effect(for="ac-connection-device-menu")
                    li.mdl-menu__item /dev/ttyS0
                    li.mdl-menu__item /dev/ttyS88
                    li.mdl-menu__item /dev/ttyS8
                button#ac-connection-connect.mdl-button.mdl-js-button.mdl-button--raised Verbinden
                */
        render() {
            return (
                <BasicCard title="Verbindung" elevation="2">
                    <h4>Gefundene Geräte</h4>

                    <h4>Anderes Gerät wählen</h4>
                    <TextField label="/dev/null" id="ac-connection-device-field" ref={(ref) => { this.textField = ref }}/>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onclick={ this.onConnectClicked }>
                      Verbinden
                    </button>
                </BasicCard>
            );
        }
    };

    return ConnectionCard;
});

