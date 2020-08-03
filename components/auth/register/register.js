import Alert from "../../alert/alert.js";
import Loading from "../../loading/grow.js";

export default ({ onSubmit, setUsername, setEmail, setPassword, alert, loading }) => {
    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={onSubmit} className="form-signin">
                    <h1 className="h3 mb-3 text-center font-weight-normal">Register</h1>
                    {alert.display && <Alert alert={alert} />}
                    <div className="mb-2">
                        <label htmlFor="inputUsername" className="sr-only">
                            Username
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            id="inputUsername"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            required
                            autoFocus=""
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputEmail" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            id="inputEmail"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoComplete="email"
                            autoFocus=""
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputPassword" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="inputPassword"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            required=""
                        />
                    </div>
                    <button
                        style={{ minHeight: "48px" }}
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={loading}
                    >
                        <div className="d-flex justify-content-center align-items-center">
                            {loading ? <Loading /> : <span>Register</span>}
                        </div>
                    </button>
                </form>
            </div>
            <style jsx>{`
                .login-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                    padding: 50px;
                }
                .form-signin {
                    flex: 0 0 250px;
                }
            `}</style>
        </>
    );
};
