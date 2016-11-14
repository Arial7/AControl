define(["react", "views/acImage"], function(React, ACImage) {
    class Plan extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div className="ac-plan">
                    <ACImage x={0} y={0} name="G_0"/>
                    <ACImage x={0} y={1} name="W_L_0_L"/>
                </div>
            );
        }
    }

    return Plan;
});
