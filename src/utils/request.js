export const request = async (url, method, data) => {
    return await fetch(url, {
        headers: {
            "Content-type": "application/json",
        },
        method: method || "GET",
        body: data ? JSON.stringify(data) : undefined,
    }).then((res) => res.json());
};
