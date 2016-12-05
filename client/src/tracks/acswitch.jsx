import * as React from "react";
import { baseIconSize } from "../utils/utils.js";

export class ACSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.x = props.x;
        this.y = props.y;
        this.onClick = this.onClick.bind(this);
        this.state = {icon: this.props.name };
    }

    onClick() {
        let lastImage = this.state.icon;
        let l = lastImage.substr(0, lastImage.indexOf("_"));
        if (lastImage.endsWith("_l")) {
            this.setState({ icon: l + "_r" });
        } else if (lastImage.endsWith("_r")) {
            this.setState({ icon: l + "_l" });
        }
    }

    render() {
        let scale = (this.props.scale || 1) * baseIconSize;

        let x = (this.props.x * scale) + "px";
        let y = (this.props.y * scale) + "px";
        let width = scale + "px";
        let height = scale + "px";

        let image = "url(/img/tracks/" + this.state.icon + ".png)"

        return (
            <div className="ac-switch" style={{
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundImage: image
            }} onClick={ this.onClick }></div>
        );
    }
}
