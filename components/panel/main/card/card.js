export default ({ enroll, openEnrollInfo }) => {
    return (
        <>
            <article className="card">
                <div className="text">
                    <h6>name: {enroll.name}</h6>
                    <h6>email: {enroll.email}</h6>
                    <h6>grade: {enroll.grade}</h6>
                    <h6>service: {enroll.service}</h6>
                    <button
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => openEnrollInfo(enroll)}
                        className="btn btn-primary"
                    >
                        more info
                    </button>
                </div>
            </article>

            <style jsx>{`
                .card {
                    flex: 0 0 300px;
                    margin: 10px;
                    border: 1px solid #ccc;
                    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
                }

                .card .text {
                    padding: 20px;
                }

                .card .text > button {
                    padding: 10px;
                    width: 100%;
                }
                @media screen and (max-width: 768px) {
                    .card {
                        flex: auto;
                    }
                }
            `}</style>
        </>
    );
};
