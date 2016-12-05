import * as React from "react";
import { baseIconSize } from "../utils/utils.js";
import * as tracks from "../tracks/tracks.js";

require("./editorGrid.sass");

export class EditorGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    cellClicked = (event) => {
        let t = this.getSelectedTrack();
        if (t) {
            if (t.startsWith("w")) {
                event.target.style.backgroundImage = `url("/img/tracks/${t}_r.png")`
            } else {
                event.target.style.backgroundImage = `url("/img/tracks/${t}.png")`;
            }
        } else {
            event.target.style.backgroundImage = undefined;
        }
    }

    getCell = (x, y, name) => {
        if (!this.cells) { this.cells = {} };
        return <div className="editor-grid-cell" key={ `${x}-${y}` } onClick={ this.cellClicked }
            style={{
                left: x * baseIconSize,
                top: y * baseIconSize,
                backgroundImage: (name) ? `url("/img/tracks/${name}.png")` : "",
                width: baseIconSize,
                height: baseIconSize
            }} ref={ (ref) => this.cells[`${x}-${y}`] = ref }></div>;
    }

    getCellObjects = () => {
        let cells = [];
        for (let key in this.cells) {
            cells.push(tracks.objectFromStyle(this.cells[key].style));
        }
        return cells;
    }

    render() {

        let cells = [];

        for (let x = 0; x < this.props.width; x++) {
            for (let y = 0; y < this.props.height; y++) {
                cells.push(this.getCell(x, y));
            }
        }

        return (
            <div className="editor-grid" id="editorGrid">
                { cells }
            </div>
        );
    }
}
