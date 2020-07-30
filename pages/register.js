import Layout from "../components/Layout/Layout.js";
import Register from "../components/auth/register/register.js";
import Router from "next/router";
import { auth } from "../utils/auth.js";
import WithAuth from "../HOCs/withAuth.js";

const RegisterPage = ({ onSubmit, setUsername, setEmail, setPassword }) => {
    return (
        <Layout>
            <Register
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={onSubmit}
            />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
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
};
export default WithAuth(RegisterPage, "register");
