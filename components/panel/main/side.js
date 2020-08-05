export default ({ status, setStatus, all, pending, accepted }) => {
    return (
        <>
            <div className="sidenav">
                <div>
                    <button
                        onClick={() => setStatus("all")}
                        type="button"
                        className={`btn btn-${status === "all" ? "primary" : "light"} select-item`}
                    >
                        All <span className="badge badge-secondary">{all}</span>
                    </button>
                    <hr />
                    <button
                        onClick={() => setStatus("pending")}
                        type="button"
                        className={`btn btn-${status === "pending" ? "primary" : "light"} select-item`}
                    >
                        Pending <span className="badge badge-secondary">{pending}</span>
                    </button>
                    <hr />
                    <button
                        onClick={() => setStatus("accepted")}
                        type="button"
                        className={`btn btn-${status === "accepted" ? "primary" : "light"} select-item`}
                    >
                        Accepted <span className="badge badge-secondary">{accepted}</span>
                    </button>
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
                    margin: 0px 10px;
                }

                @media screen and (max-height: 765px) {
                    .sidenav {
                        padding-top: 100px;
                    }
                    .select-item {
                        font-size: 14px;
                        margin: 0px 5px;
                    }
                }
            `}</style>
        </>
    );
};
