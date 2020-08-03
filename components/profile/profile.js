import Alert from "../alert/alert.js";
import Loading from "../loading/grow.js";

export default ({
	onEmailSubmit,
	onPasswordSubmit,
	user,
	emailChange,
	setEmailChange,
	passwordChange,
	setPasswordChange,
	alert,
	emailLoading,
	passwordLoading,
}) => {
	return (
		<>
			<div className="profile-wrapper">
				<article className="card details m-2">
					<div className="text">
						<div className="heading">
							<h3>Details</h3>
						</div>
						<div className="body">
							<span className="p-1">username: {`${user.username}`}</span>
							<span className="p-1">email: {`${user.email}`}</span>
							<span className="p-1">admin since: {`${Date(user.date)}`}</span>
							<span className="p-1">accepted enrolls: {`${user.acceptedEnrolls}`}</span>
							<span className="p-1">deleted enrolls: {`${user.deletedEnrolls}`}</span>
						</div>
					</div>
				</article>
				<article className="card m-2">
					<div className="text">
						<div className="heading">
							<h3>Change email</h3>
						</div>
						{alert.display && alert.type === "email" && <Alert alert={alert} />}
						<div className="body">
							<form onSubmit={onEmailSubmit} className="form-signin">
								<div className="input-el">
									<label htmlFor="inputCurrentMail">Current email</label>
									<input
										type="email"
										id="inputCurrentMail"
										name="CurrentMail"
										className="form-control"
										placeholder="Current email"
										required
										readOnly
										autoFocus=""
										value={user.email}
									/>
								</div>
								<div className="input-el">
									<label htmlFor="inputNewMail">New email</label>
									<input
										onChange={(e) =>
											setEmailChange({ ...emailChange, newEmail: e.target.value })
										}
										type="email"
										id="inputNewMail"
										name="newEmail"
										className="form-control"
										placeholder="New Email"
										required
										autoFocus=""
										value={emailChange.newEmail}
									/>
								</div>
								<div className="input-el">
									<label htmlFor="inputPassword">Password</label>
									<input
										onChange={(e) =>
											setEmailChange({ ...emailChange, password: e.target.value })
										}
										type="password"
										id="inputPassword"
										name="password"
										className="form-control"
										placeholder="Password"
										required
										value={emailChange.password}
									/>
								</div>
								<button
									style={{ minHeight: "48px" }}
									disabled={emailLoading || passwordLoading}
									className="btn btn-lg btn-primary btn-block"
									type="submit"
								>
									{emailLoading ? <Loading /> : "Confirm Email Change"}
								</button>
							</form>
						</div>
					</div>
				</article>

				<article className="card m-2">
					<div className="text">
						<div className="heading">
							<h3>Change Password</h3>
						</div>
						{alert.display && alert.type === "password" && <Alert alert={alert} />}
						<div className="body">
							<form onSubmit={onPasswordSubmit} className="form-signin">
								<div className="input-el">
									<label htmlFor="inputCurrentPassword">Current password</label>
									<input
										onChange={(e) =>
											setPasswordChange({
												...passwordChange,
												current: e.target.value,
											})
										}
										type="password"
										id="inputCurrentPassword"
										name="Current-password"
										className="form-control"
										placeholder="Current Password"
										required
										value={passwordChange.current}
									/>
								</div>

								<div className="input-el">
									<label htmlFor="inputNewPassword">New password</label>
									<input
										onChange={(e) =>
											setPasswordChange({ ...passwordChange, new: e.target.value })
										}
										type="password"
										id="inputNewPassword"
										name="New-password"
										className={`form-control ${
											passwordChange.new !== passwordChange.confirm &&
											"border-danger"
										}`}
										placeholder="New Password"
										required
										value={passwordChange.new}
									/>
								</div>
								<div className="input-el">
									<label htmlFor="inputConfirmNewPassword">Confirm new password</label>
									<input
										onChange={(e) =>
											setPasswordChange({
												...passwordChange,
												confirm: e.target.value,
											})
										}
										type="password"
										id="inputConfirmNewPassword"
										name="Confirm-New-password"
										className={`form-control ${
											passwordChange.new !== passwordChange.confirm &&
											"border-danger"
										}`}
										placeholder="Confirm new Password"
										required
										value={passwordChange.confirm}
									/>
								</div>
								<button
									style={{ minHeight: "48px" }}
									disabled={
										emailLoading ||
										passwordLoading ||
										passwordChange.new !== passwordChange.confirm
									}
									className="btn btn-lg btn-primary btn-block"
									type="submit"
								>
									{passwordLoading ? <Loading /> : "Confirm Password Change"}
								</button>
							</form>
						</div>
					</div>
				</article>
			</div>

			<style jsx>{`
				.heading h3 {
					margin: 0 0 10px 0;
					padding: 4px 1px;
					border-bottom: 1px solid #888888;
				}
				.body span {
					display: block;
				}
				.profile-wrapper {
					display: felx;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					padding: 20px 15px;
					flex-wrap: wrap;
				}
				.input-el {
					margin: 12px;
				}
				.card {
					flex: 0 0 500px;
					margin: 10px 0px;
					border: 1px solid #ccc;
					box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
				}

				.card .text {
					padding: 15px;
				}

				.card .text > button {
					padding: 10px;
					width: 100%;
				}
				.details {
					flex: 100% !important;
				}
				@media screen and (max-width: 768px) {
					.card {
						flex: 100%;
					}
				}
			`}</style>
		</>
	);
};
