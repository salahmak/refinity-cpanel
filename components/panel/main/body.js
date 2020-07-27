import EnrollInfo from "./enrollInfo/enrollInfo.js";
import Browse from "./modes/browse.js";
import Search from "./modes/search.js";
import OptionsBar from "./optionBar/optionBar.js";
import LoadBtn from "./loadBtn/loadBtn.js";
import fetch from "isomorphic-unfetch";
import { API } from "../../../exports/config.js";

const Body = ({ enrolls, status, onLoadMore, onEnrollAction }) => {
    const [showInfo, setShowInfo] = React.useState(false);

    const [currentEnroll, setCurrentEnroll] = React.useState({});

    const [mode, setMode] = React.useState("browse");

    const [searchStr, setSearchStr] = React.useState("");
    const [searchArr, setSearchArr] = React.useState([]);
    const [searchFilter, setSearchFilter] = React.useState("name");

    const openEnrollInfo = (enroll) => {
        setCurrentEnroll(enroll);
        setShowInfo(true);
    };

    const closeEnrollInfo = () => {
        setCurrentEnroll({});
        setShowInfo(false);
    };

    const onModeChange = (e) => {
        setSearchArr([]);
        setSearchFilter("name");
        setSearchStr("");
        if (e.target.checked) {
            setMode("search");
        } else setMode("browse");
    };

    const onSearch = async () => {
        if (searchStr) {
            try {
                const res = await fetch(
                    `${API}/panel/enrolls/search/?string=${searchStr}&filter=${searchFilter}`
                );
                const data = await res.json();
                setSearchArr(data.list);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const modifyEnroll = async (action, method, id) => {
        try {
            const res = await fetch(`${API}/panel/enrolls/${action}/?id=${id}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.status === "success") {
                //setting the params array to execure the enroll action function for a reGET
                let paramsArr;
                if (action === "delete") {
                    if (data.enroll.status === "pending") {
                        paramsArr = [
                            enrolls.all.list.length - 1,
                            enrolls.pending.list.length - 1,
                            enrolls.accepted.list.length,
                        ];
                    } else {
                        paramsArr = [
                            enrolls.all.list.length - 1,
                            enrolls.pending.list.length,
                            enrolls.accepted.list.length - 1,
                        ];
                    }
                } else {
                    paramsArr = [
                        enrolls.all.list.length,
                        enrolls.pending.list.length - 1,
                        enrolls.accepted.list.length + 1,
                    ];
                }
                onEnrollAction(paramsArr);

                //update states
                setShowInfo(false);
                setCurrentEnroll({});

                console.log(data.msg);
            }
        } catch (err) {
            console.log(err);
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
                />
                {mode === "browse" && (
                    <Browse openEnrollInfo={openEnrollInfo} enrolls={enrolls} status={status} />
                )}

                {mode === "search" && (
                    <Search openEnrollInfo={openEnrollInfo} searchArr={searchArr} />
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
