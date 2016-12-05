import * as React from "react";
import { fetchJSON } from "../utils/utils.js";
import { ACTrack } from "../tracks/actrack.jsx";
import { ACSwitch } from "../tracks/acswitch.jsx";


const TYPE_NORMAL = "normal";
const TYPE_SWITCH = "switch";

let lastPlan = "";

export class Plan extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.params.planName) {
            this.loadCurrentPlan();
        } else if (lastPlan !== "") {
            this.props.params.planName = lastPlan;
            this.loadCurrentPlan();
        }
    }

    loadCurrentPlan() {
        console.log("Plan: Loading plan " + this.props.params.planName);
        fetchJSON("/api/plan/" + this.props.params.planName)
            .then((plan) => {
                lastPlan = this.props.params.planName;
                this.parsePlan(plan);
            });
    }

    parsePlan = (plan) => {
        let tracks = [];
        for (let track of plan.tracks) {
            if (track.type == TYPE_NORMAL) {
                tracks.push(<ACTrack x={track.x} y={track.y} name={track.icon}
                    key={ `${track.x}-${track.y}` } />);
            } else if (track.type == TYPE_SWITCH) {
                tracks.push(<ACSwitch x={track.x} y={track.y}
                    name={ track.icon + ((track.isLeft) ? "_l" : "_r") }
                    key={ `${track.x}-${track.y}` } />);
            } else {
                console.error("Plan: Unrecognized track type " + track.type);
            }
        }
        this.plan = tracks;
        this.setState({ hasToRedraw: true });
    }

    render() {
        return (
            <div className="ac-plan">
                { this.plan }
            </div>
        );
    }
}
