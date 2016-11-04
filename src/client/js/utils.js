define([], function() {
    return {
        fetchJSON: (url) => {
            return fetch(url)
                .then((response) => {
                    return response.json()
                });
        }
    }
});
