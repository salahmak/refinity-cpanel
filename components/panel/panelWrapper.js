import Body from "./main/body.js";
import Side from "./main/side.js";

const PanelWrapper = ({ all, pending, accepted, setStatus, status, onLoadMore }) => {
    const enrolls = { all, pending, accepted };
    return (
        <>
            <div className="panel-wrapper">
                <Side
                    all={all.count}
                    pending={pending.count}
                    accepted={accepted.count}
                    setStatus={setStatus}
                    status={status}
                    className="panel-side"
                />
                <Body
                    status={status}
                    enrolls={enrolls}
                    onLoadMore={onLoadMore}
                    className="panel-body"
                />
            </div>
            <style jsx>{`
                .panel-wrapper {
                    display: flex;
                    justify-content: start;
                }
            `}</style>
        </>
    );
};

export default PanelWrapper;
