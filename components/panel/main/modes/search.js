import Card from "../card/card.js";

export default ({ enrolls, pending, accepted, openEnrollInfo, filter }) => {
    return (
        <div>
            <span>Main content</span>
            {filter === "all" && (
                <div className="card-wrapper">
                    {enrolls.map((enroll, i) => {
                        return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                    })}
                </div>
            )}

            {filter === "pending" && (
                <div className="card-wrapper">
                    {pending.map((enroll, i) => {
                        return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                    })}
                </div>
            )}

            {filter === "accepted" && (
                <div className="card-wrapper">
                    {accepted.map((enroll, i) => {
                        return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                    })}
                </div>
            )}
        </div>
    );
};
