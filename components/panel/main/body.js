import EnrollInfo from "./enrollInfo/enrollInfo.js";
import Browse from "./modes/browse.js";
import OptionsBar from "./optionBar/optionBar.js";
import LoadBtn from "./loadBtn/loadBtn.js";

const Body = ({ enrolls, status, onLoadMore }) => {
    const [showInfo, setShowInfo] = React.useState(false);

    const [currentEnroll, setCurrentEnroll] = React.useState({});

    const [mode, setMode] = React.useState("browse");

    const [searchStr, setSearchStr] = React.useState("");

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
        if (e.target.checked) {
            setMode("search");
        } else [setMode("browse")];
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
                />
                {mode === "browse" && (
                    <Browse openEnrollInfo={openEnrollInfo} enrolls={enrolls} status={status} />
                )}
                {enrolls[status].currentPage !== enrolls[status].totalPages &&
                    mode === "browse" && <LoadBtn onLoadMore={onLoadMore} />}
            </main>
            <EnrollInfo close={closeEnrollInfo} enroll={currentEnroll} />
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
