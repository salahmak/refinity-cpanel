import Card from "../card/card.js";

export default ({ enrolls, openEnrollInfo, status }) => {
    return (
        <div>
            <div className="card-wrapper">
                {enrolls[status].list.map((enroll, i) => {
                    return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                })}
            </div>

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
