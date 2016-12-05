import * as React from "react";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { defaultPlanSize } from "../utils/utils.js";
import * as tracks from "../tracks/tracks.js";
import { Track, allTrackNames, allSwitchNames } from "../tracks/track.jsx";

import "./editorToolbar.sass";

const defaultPlanName = "Neuer Plan";

function getBG(name) {
    return { backgroundImage: `url("/img/tracks/${name}.png")` };
}

export class EditorToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.planName = defaultPlanName;
        this.state = { activeTab: 0 };
        this.planWidth = this.planHeight = defaultPlanSize;
    }

    setPlanName = (event) => {
        this.planName = event.target.value;
    }

    setPlanWidth = (event) => {
        this.planWidth = event.target.value;
        this.props.onPlanSizeChange(this.planWidth, this.planHeight);
    }

    setPlanHeight = (event) => {
        this.planHeight = event.target.value;
        this.props.onPlanSizeChange(this.planWidth, this.planHeight);
    }

    getWidth() {
        return this.planWidth;
    }

    getHeight() {
        return this.planHeight;
    }

    getName() {
        return this.planName;
    }

    getSelectedTrack = () => {
        return this.selectedTrack;
    }

    setSelectedTrack = (event) => {
        this.selectedTrack = event.target.getAttribute("name");
        for (let i = 0; i < this.tracksList.childNodes.length; i++) {
            this.tracksList.childNodes[i].classList.remove("selected");
        }
        event.target.classList.add("selected");
    }

    render() {

        let ts = [];
        for (let t of allTrackNames) {
            ts.push(<Track className="editor-select-button" key={ t } name={ t }
                onTrackClicked={ this.setSelectedTrack } />);
        }

        for (let s of allSwitchNames) {
            ts.push(<Track className="editor-select-button" key={ s } name={ s }
                onTrackClicked={ this.setSelectedTrack }/>);
        }

        let tracksList = <section className="editor-toolbar-trackslist"
            ref={ (ref) => this.tracksList = ref }>
            { ts }
        </section>;

        return (
            <div className="editor-toolbar">
                <div>
                    <TextField floatingLabelText="Name" defaultValue={ defaultPlanName }
                        onChange={ this.setPlanName } />
                    <TextField floatingLabelText="Breite" defaultValue={ defaultPlanSize }
                        onChange={ this.setPlanWidth } type="number"
                        className="editor-toolbar-size" />
                    <TextField floatingLabelText="Höhe" defaultValue={ defaultPlanSize }
                        onChange={ this.setPlanHeight } type="number"
                        className="editor-toolbar-size" />
                </div>
                { tracksList }
                <FlatButton primary={ true } label="Löschen"/>
                <FlatButton primary={ true } label="Speichern" onTouchTap={ this.props.onSavePlan } />
            </div>
        );
    }
}
