define([ "EventEmitter" ], function(EventEmitter) {

    class ConnectionManager {
        constructor() {
            this.ee = new EventEmitter();
        }

        addListener(event, listener) {
            this.ee.addListener(event, listener);
        }

        connect(port) {
            if (this.isConnected) {
                console.warn("ConnectionManager: Was already connected")
                return;
            } else {
                console.log("ConnectionManager: Connecting to " + port);
                this.ee.emitEvent("connectionChanged", [ true ]);
                this.isConnected = true;
            }
        }

        disconnect() {
            console.log("ConnectionManager: Disconnecting");
            this.isConnected = false;
            this.ee.emitEvent("connectionChanged", [ false ]);
        }
    }

    let instance = new ConnectionManager();
    return instance;
});
