export default ({ onSubmit, setEmail, setPassword }) => {
    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={onSubmit} className="form-signin">
                    <h1 className="h3 mb-3 text-center font-weight-normal">Sign in</h1>
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
                            required
                        />
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">
                        Sign in
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
