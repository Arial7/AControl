import * as React from "react";
import { baseIconSize } from "../utils/utils.js";

export class ACTrack extends React.Component {
    constructor(props) {
        super(props);
        this.x = props.x;
        this.y = props.y;
    }
    render() {
        let scale = (this.props.scale || 1) * baseIconSize;

        let x = (this.props.x * scale) + "px";
        let y = (this.props.y * scale) + "px";
        let width = scale + "px";
        let height = scale + "px";

        let image = "url(/img/tracks/" + this.props.name + ".png)"

        return (
            <div className="ac-track" style={{
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundImage: image
            }}></div>
        );
    }
}
