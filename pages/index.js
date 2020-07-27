import Router from "next/router";
import { auth } from "../utils/auth.js";

const Index = () => {
    return <div>Index</div>;
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
    return { props: {} };
};
export default Index;
