import Layout from "../components/Layout/Layout.js";
import PanelWrapper from "../components/panel/panelWrapper.js";
import fetch from "isomorphic-unfetch";

const PanelPage = ({ all, pending, accepted }) => {
    const [allEnrolls, setAllEnrolls] = React.useState(all);
    const [pendingEnrolls, setPendingEnrolls] = React.useState(pending);
    const [acceptedEnrolls, setAcceptedEnrolls] = React.useState(accepted);

    const [status, setStatus] = React.useState("all");

    const [searchArr, setSearchArr] = React.useState([]);

    const [allPage, setAllPage] = React.useState(allEnrolls.currentPage);
    const [pendingPage, setPendingPage] = React.useState(pendingEnrolls.currentPage);
    const [acceptedPage, setAcceptedPage] = React.useState(acceptedEnrolls.currentPage);

    const onLoadMore = async () => {
        console.log("clicked");
        if (status === "all") {
            try {
                const res = await fetch(
                    `http://localhost:3001/panel/enroll/getall/?page=${
                        allPage + 1
                    }&limit=5&status=${status}`
                );
                const data = await res.json();
                console.log(data);
                if (data.list) {
                    setAllEnrolls({
                        list: allEnrolls.list.concat(data.list),
                        totalPages: data.totalPages,
                        currentPage: data.currentPage,
                        count: data.count,
                    });
                    setAllPage(data.currentPage);
                } else {
                    console.log(data);
                }
            } catch (err) {
                console.log(err);
            }
        } else if (status === "pending") {
            try {
                const res = await fetch(
                    `http://localhost:3001/panel/enroll/getall/?page=${
                        pendingPage + 1
                    }&limit=5&status=${status}`
                );
                const data = await res.json();
                if (data.list) {
                    setPendingEnrolls({
                        list: pendingEnrolls.list.concat(data.list),
                        totalPages: data.totalPages,
                        currentPage: data.currentPage,
                        count: data.count,
                    });
                    setPendingPage(data.currentPage);
                }
            } catch (err) {
                console.log(err);
            }
        } else if (status === "accepted") {
            try {
                const res = await fetch(
                    `http://localhost:3001/panel/enroll/getall/?page=${
                        acceptedPage + 1
                    }&limit=5&status=${status}`
                );
                const data = await res.json();
                if (data.list) {
                    setAcceptedEnrolls({
                        list: acceptedEnrolls.list.concat(data.list),
                        totalPages: data.totalPages,
                        currentPage: data.currentPage,
                        count: data.count,
                    });
                    setAcceptedPage(data.currentPage);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <Layout>
            <PanelWrapper
                onLoadMore={onLoadMore}
                status={status}
                setStatus={setStatus}
                all={allEnrolls}
                pending={pendingEnrolls}
                accepted={acceptedEnrolls}
            />
        </Layout>
    );
};

PanelPage.getInitialProps = async () => {
    const res = await Promise.all([
        fetch("http://localhost:3001/panel/enroll/getall/?page=1&limit=5&status=all"),
        fetch("http://localhost:3001/panel/enroll/getall/?page=1&limit=5&status=pending"),
        fetch("http://localhost:3001/panel/enroll/getall/?page=1&limit=5&status=accepted"),
    ]);

    const all = await res[0].json();
    const pending = await res[1].json();
    const accepted = await res[2].json();
    return { all, pending, accepted };
};

export default PanelPage;
