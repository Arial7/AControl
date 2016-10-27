requirejs.config({
    baseUrl: "/js/",
    paths: {
        react: "/nm/react/dist/react.min",
        "react-dom": "/nm/react-dom/dist/react-dom",
        classnames: "/nm/classnames/index",
        shortid: "/nm/shortid/lib/index"
    }
});

requirejs(["react", "react-dom", "views/connectionCard"], function(React, ReactDOM, ConnectionCard) {
    ReactDOM.render(<ConnectionCard/>, document.getElementById("ac-connection-card"));
});
/*

(function($) {
    var $connectionStatusLabel = $(".ac-connection-status"),
        $connectionStatusIcon  = $(".ac-connection-status-icon");

    $(function() {
        console.log("Hello World!");
        setupPollers();
        console.log("Fetching");
        fetch("/api/getAvailablePorts")
            .then((response) => {
                return response.json();
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    });

    function createObject(tag, classes) {
        return $(`<#{tag} class="#{classes}"></#{tag}>`);
    };

    function jsonFetch(url) {
        return fetch(url).then((response) => { return response });
    };

    function setupPollers() {
        window.setInterval(() => {
            jsonFetch("/api/hasConnection")
                .then((response) => {
                    let c = response.connected;
                    $connectionStatusLabel.text(c ? "Verbunden" : "Getrennt");
                    $connectionStatusIcon.text(c ? "sync" : "sync_disabled");
                });
        }, 1000);
    };

    class RadioButton {
        constructor(label, id) {
            this.root = createObject("label", "mdl-radio mdl-js-radio mdl-js-ripple-effect");
            if (id) {
                this.id = id;
            } else {
                this.id = shortid.generate();
            }
            this.root.attr("for", this.id);
            this.input = creteObject("input", "mdl-radio__button");
            this.input.attr("type", "radio");
            this.input.attr("name", this.id);


        }
    };

})(jQuery)
*/
