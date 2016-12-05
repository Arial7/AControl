import * as React from "react";
import classNames from "classnames";

import { baseIconSize } from "../utils/utils.js";

var g0 = require("./img/g0.png");

// {{{ Track & Switches names
export var allTrackNames = [
    "g0",
    "g90",
    "a0",
    "a90",
    "a180",
    "a270",
    "p0",
    "p90",
    "p180",
    "p270",
    "d0",
    "d90",
    "d180",
    "d270",
    "dd0",
    "dd90"
];

export var allSwitchNames = [
    "wl0",
    "wl90",
    "wl180",
    "wl270",
    "wr0",
    "wr90",
    "wr180",
    "wr270"
]

// }}}

let allTracksBGs = {};


function loadBGs() {
    for (let t of allTrackNames) {
        allTracksBGs[t] = require(`./img/${t}.png`);
    }
    for (let s of allSwitchNames) {
        allTracksBGs[s] = require(`./img/${s}.png`);
        allTracksBGs[`${s}_l`] = require(`./img/${s}_l.png`);
        allTracksBGs[`${s}_r`] = require(`./img/${s}_r.png`);
    }
}

loadBGs();


export class Track extends React.Component {
    state = { isLeft: true };

    constructor(props) {
        super(props);
    }

    getObject() {

    }

    handleClick = () => {
        if (this.props.isSwitch) {
            this.setState({ isLeft: !this.state.isLeft });
        } else {
            this.props.onTrackClicked();
        }
    }

    getBG() {
        if (this.props.isSwitch) {
            return `url(${allTracksBGs[`${this.props.name}_${this.state.isLeft ? "l" : "r"}`]})`;
        } else {
            return `url(${allTracksBGs[this.props.name]})`;
        }
    }

    render() {
        let scale = this.props.scale | 1;

        let left = (this.props.x | 0) * baseIconSize * scale;
        let top = (this.props.y | 0) * baseIconSize * scale;
        let width = baseIconSize * scale;
        let height = baseIconSize * scale;
        let backgroundImage = this.getBG();
        let position = this.props.position | "relative";

        let classes = classNames( this.props.className, (this.props.isSwitch) ? "switch" : "track" );

        return (
            <div className={ classes } style={{ left, top, width, height, backgroundImage }}
                onTouchTap={ this.handleClick }></div>
        );
    }

}
