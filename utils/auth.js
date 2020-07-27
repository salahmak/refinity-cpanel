import { Cookies } from "react-cookie";
const cookies = new Cookies();

const auth = async (ctx) => {
    let token;

    if (ctx.req) {
        token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        if (!token)
            return {
                user: null,
                error: "token not found",
                authenticated: false,
            };
    } else {
        token = cookies.get("token");
        if (!token)
            return {
                user: null,
                error: "token not found",
                authenticated: false,
            };
    }

    try {
        const res = await fetch("http://localhost:3001/auth/getUser", {
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
