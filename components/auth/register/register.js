export default ({ onSubmit, setUsername, setEmail, setPassword }) => {
    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={onSubmit} className="form-signin">
                    <h1 className="h3 mb-3 text-center font-weight-normal">Register</h1>
                    <div className="input-el">
                        <label htmlFor="inputUsername" className="sr-only">
                            Username
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setUsername(e.target.value)}
                            id="inputUsername"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            required
                            autoFocus=""
                        />
                    </div>
                    <div className="input-el">
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
                    <div className="input-el">
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
                        onClick={onSubmit}
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Register
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
                .input-el {
                    margin: 12px;
                }
            `}</style>
        </>
    );
};
