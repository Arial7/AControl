export function fetchJSON(url) {
    return fetch(url)
        .then((response) => {
            return response.json();
        });
}

export function postJSON(url, json) {
    return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json)});
}

export const baseIconSize = 48;
export const defaultPlanSize = 8;
