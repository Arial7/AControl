requirejs.config({
    baseUrl: "/js/",
    paths: {
        react: "/nm/react/dist/react",
        "react-dom": "/nm/react-dom/dist/react-dom",
        "react-router": "/nm/react-router/umd/ReactRouter",
        "react-mdl": "/nm/react-mdl/out/ReactMDL",
        classnames: "/nm/classnames/index",
        shortid: "/nm/js-shortid/lib/js-shortid",
        utils: "/js/utils"
    }
});

requirejs(["react", "react-dom", "react-router", "react-mdl", "pages/home", "pages/plan", "views/drawer"],
    function(React, ReactDOM, Router, MDL, Home, Plan, Drawer) {

    var { Layout, Header, Content } = MDL;

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = { currentPage: "Home" };
        }

        render() {
            return (
                <Layout fixedHeader fixedDrawer>
                    <Header title={ this.state.currentPage } className="mdl-color--grey-100 mdl-color-text--grey-600" />
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
            </Router.Route>
        </Router.Router>
    , document.getElementById("app"));

    componentHandler.upgradeDom();

});
