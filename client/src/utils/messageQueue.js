let events = {};

export function addListener(namespace, event, fun) {
    if (!events[namespace]) { events[namespace] = {} };
    if (!events[namespace][event]) {
        events[namespace][event] = [ fun ];
    } else {
        events[namespace][event].push(fun);
    }

}

export function emitEvent(namespace, name, data) {
    // If there aren't any listeners bound, don't care for anything.
    if (!events[namespace][name]) {
        return;
    } else {
        for (listener of events[namespace][name]) {
            listener(data);
        }
    }
}

export function getNamespace(namespace) {
    return {
        addListener: (event, fun) => { addListener(namespace, event, fun); },
        emitEvent: (name, data) => { emitEvent(namespace, name, data); }
    };
}
