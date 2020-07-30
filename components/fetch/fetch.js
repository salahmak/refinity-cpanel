import fetch from "isomorphic-unfetch";
import { API } from "../../exports/config.js";

export default async (limits, token) => {
    const options = {
        headers: {
            "auth-token": token,
        },
    };

    const res = await Promise.all([
        fetch(`${API}/panel/enrolls/getall/?page=1&limit=${limits[0]}&status=all`, options),
        fetch(`${API}/panel/enrolls/getall/?page=1&limit=${limits[1]}&status=pending`, options),
        fetch(`${API}/panel/enrolls/getall/?page=1&limit=${limits[2]}&status=accepted`, options),
    ]);

    const all = await res[0].json();
    const pending = await res[1].json();
    const accepted = await res[2].json();

    const resObj = { all, pending, accepted };
    return resObj;
};
