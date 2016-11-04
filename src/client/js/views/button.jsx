define(["react", "classnames"], function(React, classnames) {

    class Button extends React.Component {
        constructor(props) {
            super(props);
            this.onClicked = props.action;
        }

        render() {
            let classes = classnames("mdl-button", "mdl-js-button",
                    {"mdl-button--raised": this.props.raised},
                    {"mdl-button--colored": this.props.colored});

            return (
                <button className={classes} onClick={this.onClicked}>
                    {this.props.children}
                    {this.props.label}
                </button>
            );
        }


    }

    return Button;
});
