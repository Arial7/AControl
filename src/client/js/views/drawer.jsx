define([ "react", "react-router", "react-mdl" ], function(React, Router, MDL) {

    var { Header, Navigation, Icon, Spacer } = MDL;

    class Drawer extends React.Component {
        constructor(props) {
            super(props);
            this.state = { isConnected: false };

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
                        <Router.Link className="mdl-navigation__link" to="/">
                            <Icon name="home"/>
                            Home
                        </Router.Link>
                        <Router.Link className="mdl-navigation__link" to="/plan">
                            <Icon name="grid_on"/>
                            Plan
                        </Router.Link>
                        <Router.Link className="mdl-navigation__link" to="/editor">
                            <Icon name="mode_edit"/>
                            Editor
                        </Router.Link>
                        <Router.Link className="mdl-navigation__link" to="/einstellungen">
                            <Icon name="settings"/>
                            Einstellungen
                        </Router.Link>
                        <Spacer />
                        <Router.Link className="mdl-navigation__link" to="/hilfe">
                            <Icon name="help_outline"/>
                            Hilfe
                        </Router.Link>
                    </Navigation>
                </MDL.Drawer>
            );
        }
    }

    return Drawer;
});
