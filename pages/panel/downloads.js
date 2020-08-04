import Layout from "../../components/Layout/Layout.js";
import Downloads from "../../components/downloads/downloads.js";
import { auth } from "../../utils/auth.js";
import signOut from "../../utils/signout.js";
import Router from "next/router";
import { API } from "../../exports/config.js";
import { useState } from "react";
import moment from "moment";
const download = require("downloadjs");

const DownloadsPage = ({ user, authenticated, token }) => {
    const [enrollsFilter, setEnrollsFilter] = useState("all");
    const [emailsFilter, setEmailsFilter] = useState("emails");

    const [alert, setAlert] = useState({ display: false, msg: "" });

    const onDownload = async (type, filter) => {
        setAlert({ display: false, msg: "" });

        const res = await fetch(`${API}/panel/${type}/download?filter=${filter}`, {
            headers: {
                "auth-token": token,
            },
        });
        if (!res.ok) {
            if (res.status === 401) return signOut("?msg=unautherized");
            const data = await res.json();
            return setAlert({ display: true, msg: data.msg });
        }
        const blob = await res.blob();
        const time = moment().format("YYYY-MM-DD-hh:mm:ss");
        download(blob, `${type}-${filter === "emails" ? "all" : filter}-${time}.csv`);
    };

    return (
        <Layout title="Refinity panel | downloads" name={user.username} authenticated={authenticated}>
            <Downloads
                enrollsFilter={enrollsFilter}
                setEnrollsFilter={setEnrollsFilter}
                emailsFilter={emailsFilter}
                setEmailsFilter={setEmailsFilter}
                onDownload={onDownload}
                alert={alert}
            />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    try {
        const { user, error, authenticated, token } = await auth(ctx);
        if (user && !error) {
            return {
                props: {
                    user,
                    authenticated,
                    token,
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
    } catch {
        console.log("there was an error while getting props for /downloads");
    }
};

export default DownloadsPage;
