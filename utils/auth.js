import { API } from "../exports/config.js";
import cookies from "next-cookies";

const auth = async (ctx) => {
    const { token } = cookies(ctx);
    try {
        const res = await fetch(`${API}/auth/getUser`, {
            credentials: "include",
            headers: {
                "auth-token": token,
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
            token,
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
