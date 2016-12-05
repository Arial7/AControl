import * as React from "react";

import { Card, CardTitle, CardText, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import * as connectionManager from "../connectionManager.js";
import { fetchJSON } from "../utils/utils.js";

export class ConnectionCard extends React.Component {
    state = { isConnected: false, availablePorts: [], selectedDevice: 0 }

    constructor(props) {
        super(props);
        connectionManager.addListener(this.onConnectionChanged);
    }

    onConnectionChanged = (status) => {
        this.setState({ isConnected: status });
    }

    onConnectClicked = () => {
        if (!this.state.isConnected) {
            let dev = this.state.availablePorts[this.state.selectedDevice];
            console.log("ConnectionCard: Trying to connect to " + dev);
            connectionManager.connect(dev);
        } else {
            connectionManager.disconnect();
        }
    }

    onRefreshDevices = () => {
        fetchJSON("/api/getAvailablePorts")
            .then((ports) => {
                let portsArray = [];
                for (name of ports.ports) {
                    portsArray.push(name);
                }
                console.log("ConnectionCard: Available ports: " + portsArray);
                this.setState({availablePorts: portsArray});
            });
    }

    componentWillMount() {
        this.onRefreshDevices();
    }

    onSelectChanged = (event, index, value) => {
        this.setState({ selectedDevice: value });
    }

    render() {
        let ports = [];
        if (this.state.availablePorts) {
            this.state.availablePorts.map((port, i) => {
                ports.push(<MenuItem key={i} value={i} primaryText={ port }/>);
            });
        }
        let connString = this.state.isConnected ? "Trennen" : "Verbinden";

        return (
            <Card>
                <CardTitle title="Verbindung"/>
                <CardText>
                    <span>Gefundene Geräte</span>
                    <SelectField floatingLabelText="Gerät" value={ this.state.selectedDevice }
                        onChange={ this.onSelectChanged }>
                        {ports}
                    </SelectField>
                </CardText>
                <CardActions>
                    <FlatButton primary={ true } label={ connString }
                        onTouchTap={ this.onConnectClicked }/>
                    <FlatButton primary={ true } label="Aktualisieren"
                        onTouchTap={ this.onRefreshDevices }/>
                </CardActions>
            </Card>
        );
    }
};

