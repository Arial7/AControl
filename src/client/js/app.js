(function($) {
    var $connectionStatusLabel = $(".ac-connection-status"),
        $connectionStatusIcon  = $(".ac-connection-status-icon");

    $(function() {
        console.log("Hello World!");
        setupPollers();
        console.log("Fetching");
        fetch("/api/getAvailablePorts")
            .then((response) => {
                console.log(response);
                return response.json();
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    });

    function setupPollers() {
        window.setInterval(() => {
            fetch("/api/hasConnection")
                .then((response) => {
                    return response.json();
                }).then((response) => {
                    let c = response.connected;
                    $connectionStatusLabel.text(c ? "Verbunden" : "Getrennt");
                    $connectionStatusIcon.text(c ? "sync" : "sync_disabled");
                });
        }, 1000);
    }

})(jQuery)
