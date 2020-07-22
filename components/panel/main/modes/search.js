import Card from "../card/card.js";

export default ({ searchArr, openEnrollInfo }) => {
    return (
        <div>
            <div className="card-wrapper">
                {searchArr.map((enroll, i) => {
                    return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                })}
                {searchArr.length === 0 && (
                    <div>
                        <h3>No results found</h3>
                    </div>
                )}
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
