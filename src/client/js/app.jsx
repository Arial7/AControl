requirejs.config({
    baseUrl: "/js/",
    paths: {
        react: "/nm/react/dist/react.min",
        "react-dom": "/nm/react-dom/dist/react-dom",
        "react-router": "/js/lib/react-router",
        classnames: "/nm/classnames/index",
        shortid: "/nm/js-shortid/lib/js-shortid"
    }
});

requirejs(["react", "react-dom", "react-router", "pages/home", "pages/plan", "views/drawer"],
    function(React, ReactDOM, Router, Home, Plan, Drawer) {

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = { currentPage: "Home" };
            this.children = this.props.children;
        }

        render() {
            return (
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer">
                    <header className="mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                        <div className="mdl-layout__header-row">
                            <span className="mdl-layout-title">{ this.state.currentPage }</span>
                            <div className="mdl-layout-spacer"/>
                        </div>

                    </header>
                    <Drawer />
                    <main className="mdl-layout__content">
                        <div className="page-content">
                            { this.children }
                        </div>
                    </main>
                </div>
            );
        }
    }



    ReactDOM.render(
            <Router.Router history={Router.browserHistory}>
                <Router.Route path="/" component={App}>
                    <Router.IndexRoute component={Home}/>
                </Router.Route>
                <Router.Route path="/plan" component={App}>
                    <Router.IndexRoute component={Plan}/>
                </Router.Route>
            </Router.Router>, document.getElementById("app"));
    componentHandler.upgradeDom();

});
