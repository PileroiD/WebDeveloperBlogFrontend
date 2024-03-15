export const request = async (url, method, data) => {
    return await fetch(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-type": "application/json",
        },
        method: method || "GET",
        body: data ? JSON.stringify(data) : undefined,
    }).then((res) => {
        console.log("res.headers :>> ", res.headers.getSetCookie());
        return res.json();
    });
};
