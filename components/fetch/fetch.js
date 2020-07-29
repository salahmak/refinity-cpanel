import fetch from "isomorphic-unfetch";
import { API } from "../../exports/config.js";

export default async (lim1 = 20, lim2 = 20, lim3 = 20, Cookie) => {
    const options = {
        credentials: "include",
        headers: {
            Cookie,
        },
    };

    const res = await Promise.all([
        fetch(`${API}/panel/enrolls/getall/?page=1&limit=${lim1}&status=all`, options),
        fetch(`${API}/panel/enrolls/getall/?page=1&limit=${lim2}&status=pending`, options),
        fetch(`${API}/panel/enrolls/getall/?page=1&limit=${lim3}&status=accepted`, options),
    ]);

    const all = await res[0].json();
    const pending = await res[1].json();
    const accepted = await res[2].json();

    const resObj = { all, pending, accepted };
    return resObj;
};
