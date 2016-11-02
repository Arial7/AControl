define([ "react", "classnames" ], function(React, classnames) {
    class Column extends React.Component {
        constructor(props) {
            super(props);
            this.children = props.children;
            this.width = props.width;
        }

        render() {
            let classNames = classnames("mdl-cell", "mdl-cell--" + this.width + "-col");
            return (

                <div className={ classNames }>
                    { this.children }
                </div>
            );
        }
    };

    return Column;
});
