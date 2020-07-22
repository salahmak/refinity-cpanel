export default ({ filter, setFilter, all, pending, accepted }) => {
    return (
        <>
            <div className="sidenav">
                <div className="side-wrapper">
                    <p>- Enrollments</p>
                    <div className="side-opt-wrapper">
                        <span
                            className={filter === "all" ? "active-tab" : "opt"}
                            onClick={() => setFilter("all")}
                        >
                            {`-all   ${all}`}
                        </span>

                        <span
                            className={filter === "pending" ? "active-tab" : "opt"}
                            onClick={() => setFilter("pending")}
                        >
                            {`-pending   ${pending}`}
                        </span>

                        <span
                            className={filter === "accepted" ? "active-tab" : "opt"}
                            onClick={() => setFilter("accepted")}
                        >
                            {`-accepted   ${accepted}`}
                        </span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .side-wrapper {
                    padding: 8px 16px;
                    color: black;
                }

                .side-wrapper p {
                    font-size: 25px;
                    display: block;
                }

                .side-opt-wrapper {
                    padding-left: 20px;
                }

                .opt {
                    font-size: 18px;
                    display: block;
                    cursor: pointer;
                }

                .sidenav {
                    width: 210px;
                    border-right: 1px solid black;
                    overflow-x: hidden;
                    padding-top: 20px;
                }

                .active-tab {
                    font-size: 18px;
                    border: 1px solid black;
                    display: block;
                    cursor: pointer;
                }

                @media screen and (max-height: 450px) {
                    .sidenav {
                        padding-top: 15px;
                    }
                }
            `}</style>
        </>
    );
};
