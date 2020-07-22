import fetch from "isomorphic-unfetch";
export default async (lim1 = 20, lim2 = 20, lim3 = 20) => {
    const res = await Promise.all([
        fetch(`${process.env.API}/panel/enrolls/getall/?page=1&limit=${lim1}&status=all`),
        fetch(`${process.env.API}/panel/enrolls/getall/?page=1&limit=${lim2}&status=pending`),
        fetch(`${process.env.API}/panel/enrolls/getall/?page=1&limit=${lim3}&status=accepted`),
    ]);

    const all = await res[0].json();
    const pending = await res[1].json();
    const accepted = await res[2].json();

    const resObj = { all, pending, accepted };

    return resObj;
};
