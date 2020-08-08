import Layout from "../../components/Layout/Layout.js";
import PanelWrapper from "../../components/panel/panelWrapper.js";
import ErrorWrapper from "../../components/error/error.js";
import fetch from "isomorphic-unfetch";
import getEnrolls from "../../components/fetch/fetch.js";
import signOut from "../../utils/signout.js";
import { API } from "../../exports/config.js";
import { useState } from "react";
import { auth } from "../../utils/auth.js";
import Router from "next/router";

const limits = [5, 25, 10];

const PanelPage = ({ all, pending, accepted, user, authenticated, token, error }) => {
    const [allEnrolls, setAllEnrolls] = useState(all);
    const [pendingEnrolls, setPendingEnrolls] = useState(pending);
    const [acceptedEnrolls, setAcceptedEnrolls] = useState(accepted);

    const [status, setStatus] = useState("all");

    const [allPage, setAllPage] = useState(allEnrolls.currentPage);
    const [pendingPage, setPendingPage] = useState(pendingEnrolls.currentPage);
    const [acceptedPage, setAcceptedPage] = useState(acceptedEnrolls.currentPage);

    const onLoadMore = async () => {
        if (status === "all") {
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/getall/?page=${allPage + 1}&limit=${
                        limits[0]
                    }&status=${status}`,
                    {
                        headers: {
                            "auth-token": token,
                        },
                    }
                );
                if (!res.ok) {
                    if (res.status === 401) return signOut("session=expired", token);
                    return console.error(`the server responded with ${res.status}`);
                }
                const data = await res.json();

                setAllEnrolls({
                    list: allEnrolls.list.concat(data.list),
                    totalPages: data.totalPages,
                    currentPage: data.currentPage,
                    count: data.count,
                });
                setAllPage(data.currentPage);
            } catch (err) {
                console.log(err);
            }
        } else if (status === "pending") {
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/getall/?page=${pendingPage + 1}&limit=${
                        limits[1]
                    }&status=${status}`,
                    {
                        headers: {
                            "auth-token": token,
                        },
                    }
                );
                if (!res.ok) {
                    if (res.status === 401) return signOut("session=expired", token);
                    return console.error(`the server responded with ${res.status}`);
                }
                const data = await res.json();

                setPendingEnrolls({
                    list: pendingEnrolls.list.concat(data.list),
                    totalPages: data.totalPages,
                    currentPage: data.currentPage,
                    count: data.count,
                });
                setPendingPage(data.currentPage);
            } catch (err) {
                console.log(err);
            }
        } else if (status === "accepted") {
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/getall/?page=${acceptedPage + 1}&limit=${
                        limits[2]
                    }&status=${status}`,
                    {
                        headers: {
                            "auth-token": token,
                        },
                    }
                );
                if (!res.ok) {
                    if (res.status === 401) return signOut("session=expired", token);
                    return console.error(`the server responded with ${res.status}`);
                }
                const data = await res.json();

                setAcceptedEnrolls({
                    list: acceptedEnrolls.list.concat(data.list),
                    totalPages: data.totalPages,
                    currentPage: data.currentPage,
                    count: data.count,
                });
                setAcceptedPage(data.currentPage);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const onEnrollAction = async (params) => {
        const { data, fetchError } = await getEnrolls(limits, token);

        if (!data && fetchError) return console.error(fetchError);

        setAllEnrolls(data.all);
        setPendingEnrolls(data.pending);
        setAcceptedEnrolls(data.accepted);
    };

    return (
        <Layout token={token} title="Refinity panel" name={user.username} authenticated={authenticated}>
            {!error ? (
                <PanelWrapper
                    onLoadMore={onLoadMore}
                    status={status}
                    setStatus={setStatus}
                    all={allEnrolls}
                    pending={pendingEnrolls}
                    accepted={acceptedEnrolls}
                    onEnrollAction={onEnrollAction}
                    token={token}
                />
            ) : (
                <ErrorWrapper error={error} />
            )}
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    try {
        const { user, error, authenticated, token } = await auth(ctx);
        if (!error) {
            const { data, fetchError } = await getEnrolls(limits, token);

            if (data && !fetchError) {
                return {
                    props: {
                        error: false,
                        all: data.all,
                        pending: data.pending,
                        accepted: data.accepted,
                        user,
                        authenticated,
                        token,
                    },
                };
            } else {
                return {
                    props: {
                        all: { currentPage: 0 },
                        pending: { currentPage: 0 },
                        accepted: { currentPage: 0 },
                        error: fetchError,
                        user,
                        authenticated,
                        token,
                    },
                };
            }
        } else {
            if (ctx.res) {
                ctx.res.writeHead(302, {
                    Location: "/login",
                });
                ctx.res.end();
            } else {
                Router.push("/login");
            }
        }
    } catch (e) {
        console.log("there was an error while getting server side props");
    }
};

export default PanelPage;
