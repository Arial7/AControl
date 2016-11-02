define([ "react", "react-router" ], function(React, Router) {
    class Drawer extends React.Component {
        constructor(props) {
            super(props);
            this.state = { isConnected: false };

        }

        render() {
            let connectionString = this.state.isConnected ? "Verbunden" : "Getrennt";
            let connectionIcon = this.state.isConnected ? "sync" : "sync_disabled";

            return (
                <div className="ac-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <header>
                        <h3>AControl</h3>
                        <div className="flex-container ac-connection-status-container">
                            <i className="material-icons">{ connectionIcon }</i>
                            <span>{ connectionString }</span>
                        </div>
                    </header>
                    <nav className="mdl-navigation mdl-color--blue-grey-800">
                        <Router.Link className="mdl-navigation__link" to="/">
                            <i className="material-icons" role="presentation">home</i>
                            Home
                        </Router.Link>
                        <Router.Link className="mdl-navigation__link" to="/1plan">
                            <i className="material-icons" role="presentation">grid_on</i>
                            Plan
                        </Router.Link>
                        <Router.Link className="mdl-navigation__link" to="/editor">
                            <i className="material-icons" role="presentation">mode_edit</i>
                            Editor
                        </Router.Link>
                        <Router.Link className="mdl-navigation__link" to="/einstellungen">
                            <i className="material-icons" role="presentation">settings</i>
                            Einstellungen
                        </Router.Link>
                        <div className="mdl-layout-spacer"/>
                        <Router.Link className="mdl-navigation__link" to="/hilfe">
                            <i className="material-icons" role="presentation">help_outline</i>
                            Hilfe
                        </Router.Link>
                    </nav>
                </div>
            );
        }
    }

    return Drawer;
});
