import { Cookies } from "react-cookie";
import { API } from "../exports/config.js";
import cookies from "next-cookies";
const client_cookies = new Cookies();

const auth = async (ctx) => {
    let token;

    if (ctx.req) {
        token = cookies(ctx).token;
        if (!token)
            return {
                user: null,
                error: "token not found",
                authenticated: false,
            };
    } else {
        token = client_cookies.get("token");
        if (!token)
            return {
                user: null,
                error: "token not found",
                authenticated: false,
            };
    }

    try {
        const res = await fetch(`${API}/auth/getUser`, {
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
