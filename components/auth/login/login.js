import Alert from "../../alert/alert.js";
import Loading from "../../loading/grow.js";

export default ({ onSubmit, setEmail, setPassword, alert, loading }) => {
    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={onSubmit} className="form-signin card border-0">
                    <h1 className="h3 mb-3 text-center font-weight-normal">Sign in</h1>
                    {alert.display && <Alert alert={alert} />}
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
                            required
                        />
                    </div>

                    <button
                        style={{ minHeight: "48px" }}
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={loading}
                    >
                        <div className="d-flex justify-content-center align-items-center">
                            {loading ? <Loading /> : <span>Sign In</span>}
                        </div>
                    </button>
                </form>
            </div>

            <style jsx>
                {`
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
                `}
            </style>
        </>
    );
};
