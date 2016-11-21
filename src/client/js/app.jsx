requirejs.config({
    baseUrl: "/js/",
    paths: {
        react: "/nm/react/dist/react",
        "react-dom": "/nm/react-dom/dist/react-dom",
        "react-router": "/nm/react-router/umd/ReactRouter",
        "react-mdl": "/nm/react-mdl/out/ReactMDL",
        classnames: "/nm/classnames/index",
        shortid: "/nm/js-shortid/lib/js-shortid",
        EventEmitter: "/nm/wolfy87-eventemitter/EventEmitter",
        utils: "/js/utils"
    }
});

requirejs(["react", "react-dom", "react-router", "react-mdl", "pages/home", "pages/plan",
    "pages/editor", "pages/settings", "views/drawer"],
    function(React, ReactDOM, Router, MDL, Home, Plan, Editor, Settings, Drawer) {

    var { Layout, Header, Content, IconButton } = MDL;

    class App extends React.Component {
        constructor(props) {
            super(props);
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
                <Layout fixedHeader fixedDrawer>
                    <Header title={ currentPage }
                        className="mdl-color--grey-100 mdl-color-text--grey-600">
                    </Header>
                    <Drawer/>
                    <Content>
                        { this.props.children }
                    </Content>
                </Layout>
            );
        }
    }



    ReactDOM.render(
        <Router.Router history={Router.hashHistory}>
            <Router.Route path="/" component={App}>
                <Router.IndexRoute component={Home} />
                <Router.Route path="plan" component={Plan} />
                <Router.Route path="editor(/:planName)" component={Editor} />
                <Router.Route path="settings" component={Settings} />
            </Router.Route>
        </Router.Router>
    , document.getElementById("app"));

    componentHandler.upgradeDom();

});
