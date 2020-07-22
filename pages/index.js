import Layout from "../components/Layout/Layout.js";
import PanelWrapper from "../components/panel/panelWrapper.js";
import fetch from "isomorphic-unfetch";
import getEnrolls from "../components/fetch/fetch.js";
import { API } from "../exports/config.js";

const PanelPage = ({ all, pending, accepted }) => {
    const [allEnrolls, setAllEnrolls] = React.useState(all);
    const [pendingEnrolls, setPendingEnrolls] = React.useState(pending);
    const [acceptedEnrolls, setAcceptedEnrolls] = React.useState(accepted);

    const [status, setStatus] = React.useState("all");

    const [allPage, setAllPage] = React.useState(allEnrolls.currentPage);
    const [pendingPage, setPendingPage] = React.useState(pendingEnrolls.currentPage);
    const [acceptedPage, setAcceptedPage] = React.useState(acceptedEnrolls.currentPage);

    const onLoadMore = async () => {
        console.log("clicked");
        if (status === "all") {
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/getall/?page=${allPage + 1}&limit=5&status=${status}`
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
                    `${API}/panel/enrolls/getall/?page=${pendingPage + 1}&limit=5&status=${status}`
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
                    `${API}/panel/enrolls/getall/?page=${acceptedPage + 1}&limit=5&status=${status}`
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

    const onEnrollAction = async (params) => {
        const { all, pending, accepted } = await getEnrolls(params[0], params[1], params[2]);
        setAllEnrolls(all);
        setPendingEnrolls(pending);
        setAcceptedEnrolls(accepted);
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
                onEnrollAction={onEnrollAction}
            />
        </Layout>
    );
};

PanelPage.getServerSideProps = async () => {
    const { all, pending, accepted } = await getEnrolls();
    return { all, pending, accepted };
};

export default PanelPage;
