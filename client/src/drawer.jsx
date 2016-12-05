import * as React from "react";
import { Link } from "react-router";
import { Header, Navigation, Icon, Spacer } from "react-mdl";
import * as MDL from "react-mdl";
import * as connectionManager from "./connectionManager.js";

export class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isConnected: false };
        this.onConnectionStatusChanged = this.onConnectionStatusChanged.bind(this);
        connectionManager.addListener(this.onConnectionStatusChanged);

    }

    onConnectionStatusChanged(connected) {
        this.setState({ isConnected: connected });
    }

    render() {
        let connectionString = this.state.isConnected ? "Verbunden" : "Getrennt";
        let connectionIcon = this.state.isConnected ? "sync" : "sync_disabled";

        return (
            <MDL.Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50 ac-drawer">
                <header>
                    <h3>AControl</h3>
                    <div className="flex-container ac-connection-status-container">
                        <Icon name={ connectionIcon }/>
                        <span>{ connectionString }</span>
                    </div>
                </header>
                <Navigation className="mdl-color--blue-grey-800">
                    <Link className="mdl-navigation__link" to="/">
                        <Icon name="home"/>
                        Home
                    </Link>
                    <Link className="mdl-navigation__link" to="/plan">
                        <Icon name="grid_on"/>
                        Plan
                    </Link>
                    <Link className="mdl-navigation__link" to="/editor">
                        <Icon name="mode_edit"/>
                        Editor
                    </Link>
                    <Link className="mdl-navigation__link" to="/einstellungen">
                        <Icon name="settings"/>
                        Einstellungen
                    </Link>
                    <Spacer />
                    <Link className="mdl-navigation__link" to="/hilfe">
                        <Icon name="help_outline"/>
                        Hilfe
                    </Link>
                </Navigation>
            </MDL.Drawer>
        );
    }
}
