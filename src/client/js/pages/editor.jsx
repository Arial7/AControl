define([ "react", "react-mdl", "views/editorToolbar", "views/editorGrid", "utils" ],
    function(React, MDL, EditorToolbar, EditorGrid, utils) {

    const { Grid, Cell } = MDL;

    class Editor extends React.Component {
        constructor(props) {
            super(props);

            this.planWidth = this.planHeight = utils.defaultPlanSize

        }

        planSizeChanged = () => {
            this.planWidth = this.toolbar.getWidth();
            this.planHeight = this.toolbar.getHeight();
            this.setState({ updatePlanSize: this.planWidth * this.planHeight });
        }

        componentDidMount() {
            this.toolbar.addListener("planSizeChanged", this.planSizeChanged);
            this.toolbar.addListener("savePlan", this.savePlan);
            this.grid.setToolbar(this.toolbar);
        }

        savePlan = () => {
            let cells = this.grid.getCellObjects().filter((val) => { return val !== null });
            let plan = {
                name: this.toolbar.getName(),
                width: this.toolbar.getWidth(),
                height: this.toolbar.getHeight(),
                tracks: cells
            };

            utils.postJSON("/api/plan/new", plan)
                .then((response) => {
                    console.log(response);
                });

        }

        render() {
            return (
                <div className="ac-editor" style={{ height: "100%" }}>
                    <Grid style={{ height: "100%" }}>
                        <Cell col={9}>
                            <EditorGrid ref={(ref) => this.grid = ref} width={this.planWidth}
                                height={this.planHeight}/>
                        </Cell>
                        <Cell col={3}>
                            <EditorToolbar ref={ (ref) => this.toolbar = ref }/>
                        </Cell>
                    </Grid>
                </div>
            );
        }
    }

    return Editor;

});
