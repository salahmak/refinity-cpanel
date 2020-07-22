import Card from "../card/card.js";

export default ({ enrolls, openEnrollInfo, filter }) => {
    return (
        <div>
            {filter === "all" && (
                <div className="card-wrapper">
                    {enrolls.all.list.map((enroll, i) => {
                        return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                    })}
                </div>
            )}

            {filter === "pending" && (
                <div className="card-wrapper">
                    {enrolls.pending.list.map((enroll, i) => {
                        return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                    })}
                </div>
            )}

            {filter === "accepted" && (
                <div className="card-wrapper">
                    {enrolls.accepted.list.map((enroll, i) => {
                        return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                    })}
                </div>
            )}
            <style jsx>{`
                .card-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};
