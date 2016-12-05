import * as React from "react";
import { Grid, Cell } from "react-mdl";
import { EditorToolbar } from "./editorToolbar.jsx";
import { EditorGrid } from "./editorGrid.jsx";
import { defaultPlanSize, postJSON } from "../utils/utils.js"

let lastPlan = "";

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.planWidth = this.planHeight = defaultPlanSize
        lastPlan = this.props.params.planName;

    }

    planSizeChanged = (width, height) => {
        this.planWidth = width;
        this.planHeight = height;
        this.setState({ updatePlanSize: this.planWidth * this.planHeight });
    }

    selectedTrackChanged = (selected) => {
        this.setState({ selectedTrack: selected });
    }

    savePlan = () => {
        let cells = this.grid.getCellObjects().filter((val) => { return val !== null });
        let plan = {
            name: this.toolbar.getName(),
            width: this.toolbar.getWidth(),
            height: this.toolbar.getHeight(),
            tracks: cells
        };

        postJSON("/api/plan/new", plan)
            .then((response) => {
                console.log(response);
            });

    }

    render() {
        return (
            <div className="editor" style={{ height: "100%" }}>
                <Grid style={{ height: "100%" }}>
                    <Cell col={9}>
                        <EditorGrid ref={(ref) => this.grid = ref} width={this.planWidth}
                            height={this.planHeight}/>
                    </Cell>
                    <Cell col={3}>
                        <EditorToolbar onPlanSizeChange={ this.planSizeChanged }
                            onSavePlan={ this.savePlan }/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

