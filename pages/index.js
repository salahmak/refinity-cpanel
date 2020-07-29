import Router from "next/router";

const Index = () => {
    return <div>Index</div>;
};

export const getServerSideProps = async (ctx) => {
    if (ctx.res) {
        ctx.res.writeHead(302, {
            Location: "/login",
        });
        ctx.res.end();
    } else {
        Router.push("/login");
    }

    return { props: {} };
};
export default Index;
