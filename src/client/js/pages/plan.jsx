define(["react", "utils", "views/actrack", "views/acswitch"], function(React, utils, ACTrack, ACSwitch) {

    const TYPE_NORMAL = "normal";
    const TYPE_SWITCH = "switch";

    class Plan extends React.Component {
        constructor(props) {
            super(props);
            this.parsePlan = this.parsePlan.bind(this);
            this.loadCurrentPlan();
        }

        loadCurrentPlan() {
            utils.fetchJSON("/api/plan/current")
                .then((plan) => {
                    this.parsePlan(plan);
                });
        }

        parsePlan(plan) {
            let tracks = [];
            for (let track of plan.tracks) {
                if (track.type == TYPE_NORMAL) {
                    tracks.push(<ACTrack x={track.x} y={track.y} name={track.icon}
                        key={ track.x + 1 * track.y + 1 } />);
                } else if (track.type == TYPE_SWITCH) {
                    tracks.push(<ACSwitch x={track.x} y={track.y}
                        name={ track.icon + ((track.isLeft) ? "_L" : "_R") }
                        key={ track.x + 1 * track.y + 1 } />);
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

    return Plan;
});
