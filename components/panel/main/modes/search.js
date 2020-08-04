import Card from "../card/card.js";
import Alert from "../../../alert/alert.js";

export default ({ searchArr, openEnrollInfo, alert }) => {
    return (
        <div>
            <div className="card-wrapper">
                {searchArr.length === 0 && alert.display && <Alert alert={alert} />}
                {searchArr.length !== 0 &&
                    searchArr.map((enroll, i) => {
                        return <Card key={i} openEnrollInfo={openEnrollInfo} enroll={enroll} />;
                    })}
            </div>
            <style jsx>{`
                .card-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    padding: 5px;
                }
            `}</style>
        </div>
    );
};
