export default ({ status, setStatus, all, pending, accepted }) => {
    return (
        <>
            <div className="sidenav">
                <div>
                    <div className="select-item">
                        <button
                            onClick={() => setStatus("all")}
                            type="button"
                            className={`btn btn-${status === "all" ? "primary" : "light"}`}
                        >
                            All <span className="badge badge-secondary">{all}</span>
                        </button>
                    </div>
                    <hr />
                    <div className="select-item">
                        <button
                            onClick={() => setStatus("pending")}
                            type="button"
                            className={`btn btn-${status === "pending" ? "primary" : "light"}`}
                        >
                            Pending <span className="badge badge-secondary">{pending}</span>
                        </button>
                    </div>
                    <hr />
                    <div className="select-item">
                        <button
                            onClick={() => setStatus("accepted")}
                            type="button"
                            className={`btn btn-${status === "accepted" ? "primary" : "light"}`}
                        >
                            Accepted <span className="badge badge-secondary">{accepted}</span>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .sidenav {
                    width: 210px;
                    border-right: 1px solid black;
                    overflow-x: hidden;
                    padding-top: 80px;
                }

                .select-item {
                    width: 100%;
                    padding: 0 20px;
                }

                @media screen and (max-width: 765px) {
                    .sidenav {
                        padding-top: 100px;
                    }
                    .select-item {
                        padding: 0 5px;
                    }
                    .select-item > button {
                        font-size: 14px;
                    }
                }
            `}</style>
        </>
    );
};
