import Layout from "../components/Layout/Layout.js";
import Login from "../components/auth/login/login.js";
import Router from "next/router";
import { auth } from "../utils/auth.js";
import WithAuth from "../HOCs/withAuth.js";

const LoginPage = ({ onSubmit, setEmail, setPassword, alert, loading }) => {
    return (
        <Layout>
            <Login
                loading={loading}
                alert={alert}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={onSubmit}
            />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    try {
        const { authenticated, error } = await auth(ctx);
        if (authenticated && !error) {
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
    } catch {
        console.log("there was an error while getting initial props for /login");
    }
};

export default WithAuth(LoginPage, "login");
