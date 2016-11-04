define([ "react", "utils", "react-mdl" ],
    function(React, utils, MDL) {

    const { Card, CardTitle, CardText, CardActions, Button, Textfield, RadioGroup, Radio} = MDL;

    class ConnectionCard extends React.Component {
        constructor(props) {
            super(props);
            this.state = { availablePorts: ["test"] };
            this.onConnectClicked = this.onConnectClicked.bind(this);
            this.onRefreshDevices = this.onRefreshDevices.bind(this);
        }

        onConnectClicked() {
            console.log(this.textField.getData());
        }

        onRefreshDevices() {
            utils.fetchJSON("/api/getAvailablePorts")
                .then((ports) => {
                    let portsArray = [];
                    for (name of ports.ports) {
                        portsArray.push(name);
                    }
                    console.log("Available ports: " + portsArray);
                    this.setState({availablePorts: portsArray});
                });
        }

        componentWillMount() {
            this.onRefreshDevices();
        }

        render() {
            console.log("Rendering ConnectionCard");
            console.log(this.state);
            let ports = [];
            this.state.availablePorts.map((port, i) => {
                ports.push(<div><Radio key={i} value={ port } ripple>{port}</Radio></div>);
            });
            let connString = this.state.isConnected ? "Trennen" : "Verbinden";
            return (
                <Card shadow={1}>
                    <CardTitle>Verbindung</CardTitle>
                    <CardText>
                        <b>Gefundene Geräte</b>
                        <RadioGroup name="select-device" value="">
                            {ports}
                        </RadioGroup>
                        <b>Anderes Gerät wählen</b>
                        <Textfield label="/dev/null" ref={(ref) => { this.textField = ref }}/>
                    </CardText>
                    <CardActions border>
                        <Button colored disabled onClick={ this.onConnectClicked }>{ connString }</Button>
                        <Button colored onClick={ this.onRefreshDevices }>Aktualisieren</Button>
                    </CardActions>
                </Card>
            );
        }
    };

    return ConnectionCard;
});

