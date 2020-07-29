import Layout from "../../components/Layout/Layout.js";
import PanelWrapper from "../../components/panel/panelWrapper.js";
import fetch from "isomorphic-unfetch";
import getEnrolls from "../../components/fetch/fetch.js";
import { API } from "../../exports/config.js";
import { useState } from "react";
import { auth } from "../../utils/auth.js";
import Router from "next/router";

const limit = 3;

const PanelPage = ({ all, pending, accepted, user, authenticated, Cookie }) => {
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
                    `${API}/panel/enrolls/getall/?page=${allPage + 1}&limit=${limit}&status=${status}`,
                    {
                        credentials: "include",
                        headers: {
                            Cookie,
                        },
                    }
                );
                const data = await res.json();
                console.log(data);
                if (data.list) {
                    setAllEnrolls({
                        list: allEnrolls.list.concat(data.list),
                        totalPages: data.totalPages,
                        currentPage: data.currentPage,
                        count: data.count,
                    });
                    setAllPage(data.currentPage);
                } else {
                    console.log(data);
                }
            } catch (err) {
                console.log(err);
            }
        } else if (status === "pending") {
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/getall/?page=${
                        pendingPage + 1
                    }&limit=${limit}&status=${status}`,
                    {
                        credentials: "include",
                        headers: {
                            Cookie,
                        },
                    }
                );
                const data = await res.json();
                if (data.list) {
                    setPendingEnrolls({
                        list: pendingEnrolls.list.concat(data.list),
                        totalPages: data.totalPages,
                        currentPage: data.currentPage,
                        count: data.count,
                    });
                    setPendingPage(data.currentPage);
                }
            } catch (err) {
                console.log(err);
            }
        } else if (status === "accepted") {
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/getall/?page=${
                        acceptedPage + 1
                    }&limit=${limit}&status=${status}`,
                    {
                        credentials: "include",
                        headers: {
                            Cookie,
                        },
                    }
                );
                const data = await res.json();
                if (data.list) {
                    setAcceptedEnrolls({
                        list: acceptedEnrolls.list.concat(data.list),
                        totalPages: data.totalPages,
                        currentPage: data.currentPage,
                        count: data.count,
                    });
                    setAcceptedPage(data.currentPage);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const onEnrollAction = async (params) => {
        const { all, pending, accepted } = await getEnrolls(params[0], params[1], params[2], Cookie);
        setAllEnrolls(all);
        setPendingEnrolls(pending);
        setAcceptedEnrolls(accepted);
    };

    return (
        <Layout name={user.username} authenticated={authenticated}>
            <PanelWrapper
                onLoadMore={onLoadMore}
                status={status}
                setStatus={setStatus}
                all={allEnrolls}
                pending={pendingEnrolls}
                accepted={acceptedEnrolls}
                onEnrollAction={onEnrollAction}
                Cookie={Cookie}
            />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    const { user, error, authenticated, Cookie } = await auth(ctx);
    if (user && !error) {
        const { all, pending, accepted } = await getEnrolls(limit, limit, limit, Cookie);
        return {
            props: {
                all,
                pending,
                accepted,
                user,
                authenticated,
                Cookie,
            },
        };
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
};

export default PanelPage;
