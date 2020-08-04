import EnrollInfo from "./enrollInfo/enrollInfo.js";
import Browse from "./modes/browse.js";
import Search from "./modes/search.js";
import signOut from "../../../utils/signout.js";
import OptionsBar from "./optionBar/optionBar.js";
import LoadBtn from "./loadBtn/loadBtn.js";
import { API } from "../../../exports/config.js";
import { useState } from "react";

const Body = ({ enrolls, status, onLoadMore, onEnrollAction, token }) => {
    const [showInfo, setShowInfo] = useState(false);

    const [currentEnroll, setCurrentEnroll] = useState({});

    const [mode, setMode] = useState("browse");

    const [searchStr, setSearchStr] = useState("");
    const [searchArr, setSearchArr] = useState([]);
    const [searchFilter, setSearchFilter] = useState("name");

    const [alert, setAlert] = useState({ display: false, msg: "" });

    const [searchAlert, setSearchAlert] = useState({ display: false, msg: "" });

    const [searchLoading, setSearchLoading] = useState(false);

    const [acceptLoading, setAcceptLoading] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const openEnrollInfo = (enroll) => {
        setCurrentEnroll(enroll);
        setShowInfo(true);
    };

    const closeEnrollInfo = () => {
        setAlert({ display: false, msg: "" });
        setCurrentEnroll({});
        setShowInfo(false);
    };

    const onModeChange = (e) => {
        setSearchAlert({ display: false, msg: "" });
        setSearchArr([]);
        setSearchFilter("name");
        setSearchStr("");
        if (e.target.checked) {
            setMode("search");
        } else setMode("browse");
    };

    const onSearch = async () => {
        if (searchStr) {
            setSearchLoading(true);
            setSearchAlert({ display: false, msg: "" });
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/search/?string=${searchStr}&filter=${searchFilter}`,
                    {
                        headers: {
                            "auth-token": token,
                        },
                    }
                );
                const data = await res.json();
                if (!res.ok) {
                    if (res.status === 401) return signOut("?msg=unautherized");
                    setSearchArr([]);
                    setSearchAlert({ display: true, msg: data.msg, variant: "info" });
                    setSearchLoading(false);
                    return;
                }
                setSearchLoading(false);
                setSearchArr(data.list);
            } catch (err) {
                setSearchLoading(false);
                console.error(err);
            }
        }
    };

    const modifyEnroll = async (action, method, id) => {
        if (action === "accept") {
            setAcceptLoading(true);
        } else {
            setDeleteLoading(true);
        }
        setAlert({ display: false, msg: "" });
        try {
            const res = await fetch(`${API}/panel/enrolls/${action}/?id=${id}`, {
                method,
                headers: {
                    "auth-token": token,
                },
            });
            if (!res.ok) {
                if (res.status === 401) return signOut("?msg=unautherized");

                const data = await res.json();
                setAlert({ display: true, msg: data.msg });
                setAcceptLoading(false);
                setDeleteLoading(false);
                return;
            }

            setAcceptLoading(false);
            setDeleteLoading(false);
            onEnrollAction();
            if (mode === "search") onSearch();
            //update states
            setShowInfo(false);
            setCurrentEnroll({});
        } catch (err) {
            console.error(err);
        }
    };

    //todo CREATE 2 COMPS: BROWSE/SEARCH AND PASS SEARCHARR TO SEACH//-- done

    return (
        <>
            <main>
                <OptionsBar
                    searchFilter={searchFilter}
                    setSearchFilter={setSearchFilter}
                    searchStr={searchStr}
                    setSearchStr={setSearchStr}
                    mode={mode}
                    onModeChange={onModeChange}
                    onSearch={onSearch}
                    loading={searchLoading}
                />
                {mode === "browse" && (
                    <Browse openEnrollInfo={openEnrollInfo} enrolls={enrolls} status={status} />
                )}

                {mode === "search" && (
                    <Search alert={searchAlert} openEnrollInfo={openEnrollInfo} searchArr={searchArr} />
                )}

                {enrolls[status].currentPage !== enrolls[status].totalPages &&
                    enrolls[status].totalPages !== 0 &&
                    mode === "browse" && <LoadBtn onLoadMore={onLoadMore} />}
            </main>
            <EnrollInfo
                modifyEnroll={modifyEnroll}
                close={closeEnrollInfo}
                enroll={currentEnroll}
                show={showInfo}
                alert={alert}
                acceptLoading={acceptLoading}
                deleteLoading={deleteLoading}
            />
            <style jsx>{`
                main {
                    padding: 0px;
                    width: 100%;
                }
            `}</style>
        </>
    );
};
export default Body;
