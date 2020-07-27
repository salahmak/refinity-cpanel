import Link from "next/link";

export default ({ authenticated, name }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand">{`Welcome to the panel, ${name}`}</a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <div className="mr-auto"></div>
                    <div className="my-2 my-lg-0">
                        {!authenticated && (
                            <>
                                <Link href="/login">
                                    <button className="btn btn-secondary my-2 my-sm-0">login</button>
                                </Link>
                                <Link href="/register">
                                    <button className="btn btn-secondary my-2 my-sm-0 m-1">
                                        register
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};
