import Layout from "../components/Layout/Layout.js";
import Login from "../components/auth/login/login.js";
import Router from "next/router";
import { auth } from "../utils/auth.js";
import WithAuth from "../HOCs/withAuth.js";

const LoginPage = ({ onSubmit, setEmail, setPassword }) => {
    return (
        <Layout>
            <Login setEmail={setEmail} setPassword={setPassword} onSubmit={onSubmit} />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    const { authenticated, error, user } = await auth(ctx);
    if (authenticated && !error && user) {
        if (ctx.res) {
            ctx.res.writeHead(302, {
                Location: "/panel",
            });
            ctx.res.end();
        } else {
            Router.push("/panel");
        }
    }
    return { props: {} };
};

export default WithAuth(LoginPage, "login");
