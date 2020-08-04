import Layout from "../components/Layout/Layout.js";
import Register from "../components/auth/register/register.js";
import Router from "next/router";
import { auth } from "../utils/auth.js";
import WithAuth from "../HOCs/withAuth.js";

const RegisterPage = ({ onSubmit, setUsername, setEmail, setPassword, alert, loading }) => {
    return (
        <Layout title="Refinity panel | register">
            <Register
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={onSubmit}
                alert={alert}
                loading={loading}
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
        console.log("there was an error while getting initial props for /register");
    }
};
export default WithAuth(RegisterPage, "register");
