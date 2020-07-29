import { API } from "../exports/config.js";

const auth = async (ctx) => {
    try {
        const res = await fetch(`${API}/auth/getUser`, {
            credentials: "include",
            headers: {
                Cookie: ctx.req.headers.cookie,
            },
        });

        if (!res.ok)
            return {
                user: null,
                error: res.status,
                authenticated: false,
            };

        const user = await res.json();
        return {
            user,
            error: null,
            authenticated: true,
            Cookie: ctx.req.headers.cookie,
        };
    } catch (e) {
        return {
            user: null,
            error: e.message,
            authenticated: false,
        };
    }
};

module.exports = { auth };
