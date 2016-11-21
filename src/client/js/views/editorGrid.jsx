define(["react", "utils", "tracks"], function(React, utils, tracks) {

    class EditorGrid extends React.Component {
        constructor(props) {
            super(props);
        }

        setToolbar = (toolbar) => {
            this.toolbar = toolbar;
        }

        getSelectedTrack = () => {
            return this.toolbar.getSelectedTrack();
        }

        cellClicked = (event) => {
            event.target.style.backgroundImage = `url("/img/tracks/${this.getSelectedTrack()}.png")`;
        }

        getCell = (x, y, name) => {
            if (!this.cells) { this.cells = {} };
            return <div className="ac-editor-grid-cell" key={ `${x}-${y}` } onClick={ this.cellClicked }
                style={{
                    left: x * utils.baseACIconSize,
                    top: y * utils.baseACIconSize,
                    backgroundImage: (name) ? `url("/img/tracks/${name}.png")` : "",
                    width: utils.baseACIconSize,
                    height: utils.baseACIconSize
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
                <div className="ac-editor-grid" id="editorGrid">
                    { cells }
                </div>
            );
        }
    }

    return EditorGrid;
})
