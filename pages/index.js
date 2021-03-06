import Router from "next/router";
import { auth } from "../utils/auth.js";

const Index = () => {
    return <div>Index</div>;
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
    } catch {
        console.log("there was an error while getting initial props for /login");
    }
};
export default Index;
