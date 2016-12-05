let connectionStatusListeners = [];

let isConnected = false;

export function addListener(fun) {
    connectionStatusListeners.push(fun);
}

export function connect(port) {
    if (isConnected) {
        console.warn("ConnectionManager: Was already connected");
        return;
    } else {
        console.log("ConnectionManager: Connecting to " + port);
        console.info("ConnectionManager: Not implemented, just simulating!");
        isConnected = true;
        for (let listener of connectionStatusListeners) {
            listener(isConnected);
        }
    }
}

export function disconnect() {
    console.log("ConnectionManager: Disconnecting");
    isConnected = false;
    for (let listener of connectionStatusListeners) {
        listener(isConnected);
    }
}

