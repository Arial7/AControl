define(["react", "react-mdl", "EventEmitter", "views/acimage", "views/acbutton", "tracks", "utils"],
    function(React, MDL, EventEmitter, ACImage, ACButton, tracks, utils) {

    const { Textfield, Tabs, Tab, Button } = MDL;
    const defaultPlanName = "Neuer Plan";

    function getBG(name) {
        return { backgroundImage: `url("/img/tracks/${name}.png")` };
    }

    class EditorToolbar extends React.Component {
        constructor(props) {
            super(props);
            this.planName = defaultPlanName;
            this.state = { activeTab: 0 };
            this.planWidth = this.planHeight = utils.defaultPlanSize;
            this.ee = new EventEmitter();
        }

        addListener(event, listener) {
            this.ee.addListener(event, listener);
        }

        setPlanName = (event) => {
            this.planName = event.target.value;
        }

        setPlanWidth = (event) => {
            this.planWidth = event.target.value;
            this.ee.emitEvent("planSizeChanged");
        }

        setPlanHeight = (event) => {
            this.planHeight = event.target.value;
            this.ee.emitEvent("planSizeChanged");
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

        savePlan = () => {
            this.ee.emitEvent("savePlan");
        }

        render() {

            let ts = [];
            for (let t of tracks.allTracks) {
                ts.push(<div className="ac-editor-select-button" key={ t }
                    style={ tracks.getBG(t) } onClick={ this.setSelectedTrack } name={ t }></div>);
            }

            for (let s of tracks.allSwitches) {
                ts.push(<div className="ac-editor-select-button" key={ s }
                    style={ tracks.getBG(s) } onClick={ this.setSelectedTrack } name={ s }></div>);
            }

            let tracksList = <section className="ac-editor-toolbar-trackslist"
                ref={ (ref) => this.tracksList = ref }>
                { ts }
            </section>;

            return (
                <div className="ac-editor-toolbar">
                    <div>
                        <Textfield label="Name" defaultValue={ defaultPlanName }
                            onChange={ this.setPlanName } floatingLabel />
                        <Textfield label="Breite" floatingLabel pattern="-?[0-9]+?"
                            onChange={ this.setPlanWidth }
                            error="Das ist keine Zahl" className="ac-editor-toolbar-size"
                            defaultValue={ utils.defaultPlanSize } />
                        <Textfield label="Höhe" floatingLabel pattern="-?[0-9]+?"
                            onChange={ this.setPlanHeight }
                            error="Das ist keine Zahl" className="ac-editor-toolbar-size"
                            defaultValue={ utils.defaultPlanSize } />
                    </div>
                    { tracksList }
                    <Button colored ripple>Löschen</Button><Button colored ripple
                        onClick={ this.savePlan }>Speichern</Button>
                </div>
            );
        }
    }

    return EditorToolbar;
})
