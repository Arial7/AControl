define([ "react", "utils", "react-mdl", "connectionManager" ],
    function(React, utils, MDL, connectionManager) {

        const { Card, CardTitle, CardText, CardActions, Button, Textfield, RadioGroup, Radio
            , Snackbar } = MDL;

    class ConnectionCard extends React.Component {
        constructor(props) {
            super(props);
            this.radioGroup = {};
            this.onConnectClicked = this.onConnectClicked.bind(this);
            this.onRefreshDevices = this.onRefreshDevices.bind(this);
            this.onDeviceInputChanged = this.onDeviceInputChanged.bind(this);
            this.onConnectionChanged = this.onConnectionChanged.bind(this);
            this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
            connectionManager.addListener("connectionChanged", this.onConnectionChanged);
        }

        onConnectionChanged(status) {
            this.setState({ isConnected: status });
                this.setState({ isSnackbarActive: true, snackbarText: "Verbunden" });
        }

        onConnectClicked() {
            if (!this.state.isConnected) {
                console.log("ConnectionCard: Trying to connect to " + this.connectionDevice);
                this.setState({ isSnackbarActive: true, snackbarText: "Verbinde mit " +
                    this.connectionDevice });
                connectionManager.connect(this.connectionDevice);
            } else {
                connectionManager.disconnect();
            }
        }

        onRefreshDevices() {
            utils.fetchJSON("/api/getAvailablePorts")
                .then((ports) => {
                    let portsArray = [];
                    for (name of ports.ports) {
                        portsArray.push(name);
                    }
                    console.log("ConnectionCard: Available ports: " + portsArray);
                    this.setState({availablePorts: portsArray});
                });
        }

        onDeviceInputChanged(event) {
            this.connectionDevice = event.target.value;
            this.setState({ connectionButtonEnabled: true });

        }

        componentWillMount() {
            this.setState({ availablePorts: [], isSnackbarActive: false });
            this.onRefreshDevices();
        }

        handleTimeoutSnackbar() {
            this.setState({ isSnackbarActive: false });
        }

        render() {
            let ports = [];
            if (this.state.availablePorts) {
                this.state.availablePorts.map((port, i) => {
                    ports.push(<Radio key={i} value={ port } ripple
                        ref={(ref) => { this.radioGroup[port] = ref }}>{port}</Radio>);
                });
            }
            let connString = this.state.isConnected ? "Trennen" : "Verbinden";

            let connectionButton;

            if (this.state.connectionButtonEnabled) {
                connectionButton = <Button colored onClick={ this.onConnectClicked }>
                    { connString }
                </Button>;
            } else {
                connectionButton = <Button colored disabled>{ connString }</Button>;
            }

            let { isSnackbarActive, snackbarText } = this.state;

            return (
                <Card shadow={1}>
                    <CardTitle>Verbindung</CardTitle>
                    <CardText>
                        <b>Gefundene Geräte</b>
                        <RadioGroup name="select-device" value="" childContainer="div"
                            onChange={ this.onDeviceInputChanged }>
                            {ports}
                        </RadioGroup>
                        <b>Anderes Gerät: &nbsp;</b>
                        <Textfield label="/dev/null" onChange={ this.onDeviceInputChanged }
                            ref={(ref) => { this.textField = ref }}/>
                    </CardText>
                    <CardActions border>
                        { connectionButton }
                        <Button colored onClick={ this.onRefreshDevices }>Aktualisieren</Button>
                    </CardActions>
                    <Snackbar
                      active={isSnackbarActive}
                      onTimeout={this.handleTimeoutSnackbar}>{snackbarText}
                    </Snackbar>
                </Card>
            );
        }
    };

    return ConnectionCard;
});

