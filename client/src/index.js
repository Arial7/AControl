import { Router, Route, IndexRoute, hashHistory } from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';

import { App } from "./app.jsx";
import { Home } from "./home/home.jsx";
import { Plan } from "./plan/plan.jsx";
import { Editor } from "./editor/editor.jsx";
import { Settings } from "./settings/settings.jsx";

injectTapEventPlugin();

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="plan(/:planName)" component={Plan} />
            <Route path="editor(/:planName)" component={Editor} />
            <Route path="settings" component={Settings} />
        </Route>
    </Router>
, document.getElementById("app"));
