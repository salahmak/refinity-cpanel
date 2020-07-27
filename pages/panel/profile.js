import Layout from "../../components/Layout/Layout.js";
import { auth } from "../../utils/auth.js";
import Router from "next/router";

export default ({ user, authenticated }) => {
    return (
        <Layout name={user.username} authenticated={authenticated} profile>
            <div>profile</div>
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    const { user, error, authenticated } = await auth(ctx);
    if (user && !error) {
        return {
            props: {
                user,
                authenticated,
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
