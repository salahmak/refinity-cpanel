import Link from "next/link";
import { useRouter } from "next/router";
import { API } from "../../exports/config.js";

export default ({ authenticated, name, profile }) => {
    const Router = useRouter();

    const onSignOut = async () => {
        const res = await fetch(`/api/signout`, {
            credentials: "include",
        });
        if (res.ok) {
            Router.push("/login");
        }
    };
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
                                {profile ? (
                                    <Link href="/panel">
                                        <button className="btn btn-secondary my-2 my-sm-0 m-1">
                                            panel
                                        </button>
                                    </Link>
                                ) : (
                                    <Link href="/panel/profile">
                                        <button className="btn btn-secondary my-2 my-sm-0 m-1">
                                            Profile
                                        </button>
                                    </Link>
                                )}
                                <button onClick={onSignOut} className="btn btn-secondary my-2 my-sm-0">
                                    sign out
                                </button>
                            </>
                        ) : (
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
