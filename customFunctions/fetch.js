const fetchData = async(route, method, details, token) => {
    try {
        const options = method === "GET" ? null : { body: JSON.stringify(details) }
        const res = await fetch(`https://oprah-blog.onrender.com/api/${route}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accepts: "*/*",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            ...options
        });
        return res;
    } catch (error) {
        return error;
    }
};

export default fetchData;