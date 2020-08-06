import Body from "./main/body.js";
import Side from "./main/side.js";
import { useState, useEffect } from "react";

const PanelWrapper = ({
    all,
    pending,
    accepted,
    setStatus,
    status,
    onLoadMore,
    onEnrollAction,
    token,
}) => {
    const enrolls = { all, pending, accepted };

    useEffect(() => {
        if (window.innerWidth <= 765) setSide(false);
    }, []);

    const [side, setSide] = useState(true);

    return (
        <>
            <div className="panel-wrapper">
                {side && (
                    <Side
                        all={all.count}
                        pending={pending.count}
                        accepted={accepted.count}
                        setStatus={setStatus}
                        status={status}
                        className="panel-side"
                    />
                )}
                <Body
                    side={side}
                    setSide={setSide}
                    status={status}
                    enrolls={enrolls}
                    onLoadMore={onLoadMore}
                    onEnrollAction={onEnrollAction}
                    className="panel-body"
                    token={token}
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
