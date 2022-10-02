const fetchData = async(route, method, details, token) => {
    try {
        const options = method === "GET" ? null : { body: JSON.stringify(details) }
        const res = await fetch(`http://localhost:5000/api/${route}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
                Authorization: `Bearer ${token}`,
            },
            ...options
        });
        return res;
    } catch (error) {
        return error;
    }
};

export default fetchData;