define([ "react", "shortid"], function(React, shortid) {
    class TextField extends React.Component {
        constructor(props) {
            super(props);
            this.id = props.id || "tf-" + shortid.generate();
            this.label = props.label;
        }

        onChanged(event) {
            this.setState({value: event.target.value});
        }

        getData() {
            return this.state.value;
        }

        render() {
            return (
                <div className="mdl-textfield mdl-js-textfield">
                    <input id={ this.id } className="mdl-textfield__input" type="text" onChange={ this.onChanged }/>
                    <label for={ this.id } className="mdl-textfield__label"> { this.label } </label>
                </div>
            );
        }
    };

    return TextField;
});
