define([ "react", "classnames" ], function(React, classnames) {
    class BasicCard extends React.Component {
        constructor(props) {
            super(props);
            this.children = props.children;
            this.title = props.title;
            this.elevation = props.elevation;
        }

        render() {
            let classNames = classnames("mdl-card", "mdl-shadow--" + this.elevation + "dp");
            return ( <div className={ classNames }>
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text"> { this.title } </h2>
                </div>
                <div className="mdl-card__supporting-text">
                    { this.children }
                </div>
            </div>);
        }
    };

    return BasicCard;
});
