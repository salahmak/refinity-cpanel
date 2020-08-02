import Layout from "../../components/Layout/Layout.js";
import Downloads from "../../components/downloads/downloads.js";
import { auth } from "../../utils/auth.js";
import Router from "next/router";
import { API } from "../../exports/config.js";
import { useState } from "react";
import moment from "moment";
const download = require("downloadjs");

const downloadsPage = ({ user, authenticated, token }) => {
    const [enrollsFilter, setEnrollsFilter] = useState("all");
    const [emailsFilter, setEmailsFilter] = useState("emails");

    const onDownload = async (type, filter) => {
        const res = await fetch(`${API}/panel/${type}/download?filter=${filter}`, {
            headers: {
                "auth-token": token,
            },
        });
        if (!res.ok) return;
        const blob = await res.blob();
        const time = moment().format("YYYY-MM-DD-hh:mm:ss");
        download(blob, `${type}-${filter === "emails" ? "all" : filter}-${time}.csv`);
    };

    return (
        <Layout name={user.username} authenticated={authenticated}>
            <Downloads
                enrollsFilter={enrollsFilter}
                setEnrollsFilter={setEnrollsFilter}
                emailsFilter={emailsFilter}
                setEmailsFilter={setEmailsFilter}
                onDownload={onDownload}
            />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
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
};

export default downloadsPage;
