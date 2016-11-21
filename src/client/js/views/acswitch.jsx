define(["react", "utils"], function(React, utils) {
    class ACSwitch extends React.Component {
        constructor(props) {
            super(props);
            this.x = props.x;
            this.y = props.y;
            this.onClick = this.onClick.bind(this);
        }

        onClick() {
            let lastImage = this.props.name;
            if (lastImage.endsWith("L")) {
                console.log(lastImage.substr(0, -1), "was left");
            } else if (lastImage.endsWith("R")) {
                console.log(lastImage.substring(0, 4), "was right");
            }
        }

        render() {
            let scale = (this.props.scale || 1) * utils.baseACIconSize;

            let x = (this.props.x * scale) + "px";
            let y = (this.props.y * scale) + "px";
            let width = scale + "px";
            let height = scale + "px";

            let image = "url(/img/tracks/" + this.props.name + ".png)"

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

    return ACSwitch;
});
