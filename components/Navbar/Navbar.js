import Link from "next/link";
import onSignOut from "../../utils/signout.js";

export default ({ authenticated, name, token }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                {authenticated && name && (
                    <span className="navbar-brand">{`Welcome to the panel, ${name}`}</span>
                )}

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
                        {authenticated ? (
                            <>
                                <Link href="/panel">
                                    <button className="btn my-2 my-sm-0 m-1">Panel</button>
                                </Link>

                                <Link href="/panel/profile">
                                    <button className="btn my-2 my-sm-0 m-1">Profile</button>
                                </Link>

                                <Link href="/panel/downloads">
                                    <button className="btn my-2 my-sm-0 m-1">Downloads</button>
                                </Link>
                                <button
                                    onClick={() => onSignOut("", token)}
                                    className="btn my-2 my-sm-0"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="btn my-2 my-sm-0">Login</button>
                                </Link>
                                <Link href="/register">
                                    <button className="btn my-2 my-sm-0 m-1">Register</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};
