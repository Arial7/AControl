define([], function() {
    return {
        fetchJSON: (url) => {
            return fetch(url)
                .then((response) => {
                    return response.json()
                });
        },
        postJSON: (url, json) => {
            let data = new FormData();
            data.append("json", JSON.stringify(json));
            return fetch(url, { method: "POST", body: data });
        },
        baseACIconSize: 48,
        defaultPlanSize: 8
    }
});
