import * as React from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { blueGrey500, blueGrey700, blue500 } from "material-ui/styles/colors";

//import Drawer from "./drawer.jsx";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";

// Icons
import ActionHome from "material-ui/svg-icons/action/home";
import ImageGridOn from "material-ui/svg-icons/image/grid-on";



const theme = {
    palette: {
        primary1Color: blueGrey500,
        primary2Color: blueGrey700,
        accent1Color: blue500,
    },
    drawer: {
        color: blueGrey700
    }
};

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawerIsOpen: false};
    }

    toggleDrawer = () => {
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
    }

    closeDrawer = () => {
        this.setState({ drawerIsOpen: false });
    }

    render() {

        let currentPage = "Home";
        if ( this.props.location.pathname.indexOf("plan") > -1 ) {
            currentPage = "Plan";
        } else if ( this.props.location.pathname.indexOf("editor") > -1 ) {
            currentPage = "Editor";
        } else if ( this.props.location.pathname.indexOf("einstellungen") > -1 ) {
            currentPage = "Einstellungen";
        }

        return (
            <MuiThemeProvider muiTheme={ getMuiTheme(theme) }>
                <div>
                    <AppBar title="AControl" onLeftIconButtonTouchTap={ this.toggleDrawer } />
                    <Drawer docked={ false } open={ this.state.drawerIsOpen }
                        onRequestChange={(open) => this.setState({ drawerIsOpen: open })}>

                        <MenuItem primaryText="Home" leftIcon={<ActionHome/>}
                            onTouchTap={ this.closeDrawer }/>
                        <MenuItem primaryText="Plan" leftIcon={<ImageGridOn/>}
                            onTouchTap={ this.closeDrawer }/>
                    </Drawer>
                    { this.props.children }
                </div>
            </MuiThemeProvider>
       );
    }
};



