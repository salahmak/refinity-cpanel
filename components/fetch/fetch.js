import { API } from "../../exports/config.js";

export default async (limits, token) => {
    const options = {
        headers: {
            "auth-token": token,
        },
    };
    try {
        const res = await Promise.all([
            fetch(`${API}/panel/enrolls/getall/?page=1&limit=${limits[0]}&status=all`, options),
            fetch(`${API}/panel/enrolls/getall/?page=1&limit=${limits[1]}&status=pending`, options),
            fetch(`${API}/panel/enrolls/getall/?page=1&limit=${limits[2]}&status=accepted`, options),
        ]);

        let errorReturn;

        res.forEach((r) => {
            if (!r.ok) {
                errorReturn = {
                    data: null,
                    fetchError: {
                        type: "fetch",
                        msg: `api server responded with error code: ${r.status}`,
                    },
                };
            }
        });

        if (errorReturn) return errorReturn;

        const all = await res[0].json();
        const pending = await res[1].json();
        const accepted = await res[2].json();

        const resObj = { data: { all, pending, accepted }, fetchError: null };
        return resObj;
    } catch (e) {
        return { data: null, fetchError: { type: "internal", msg: e } };
    }
};
