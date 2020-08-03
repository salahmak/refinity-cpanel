import Alert from "../alert/alert.js";

export default ({
	enrollsFilter,
	setEnrollsFilter,
	emailsFilter,
	setEmailsFilter,
	onDownload,
	alert,
}) => {
	return (
		<>
			<div className="downloads-wrapper">
				<article className="card m-2">
					<div className="text">
						<div className="heading">
							<h3>Download data as .csv</h3>
						</div>
						{alert.display && <Alert alert={alert} />}
						<div className="body">
							<div className="form-inline">
								<div className="form-group"></div>
								<span>Enrollments</span>
								<div className="form-group mx-sm-3">
									<select
										value={enrollsFilter}
										onChange={(e) => setEnrollsFilter(e.target.value)}
										className="form-control"
									>
										<option value="all">All</option>
										<option value="pending">Pending</option>
										<option value="accepted">Accepted</option>
									</select>
									<button
										onClick={() => onDownload("enrolls", enrollsFilter)}
										className="btn btn-primary m-2"
									>
										Download
									</button>
								</div>
							</div>
							<div className="form-inline">
								<div className="form-group"></div>
								<span>Emails</span>
								<div className="form-group mx-sm-3">
									<select
										value={emailsFilter}
										onChange={(e) => setEmailsFilter(e.target.value)}
										className="form-control"
									>
										<option value="emails">All</option>
										<option value="email-lists">Emails list</option>
										<option value="tutoring-mails">Tutoring emails</option>
										<option value="relations-mails">Relations emails</option>
										<option value="academic-mails">Academic emails</option>
									</select>
									<button
										onClick={() => onDownload("emails", emailsFilter)}
										className="btn btn-primary m-2"
									>
										Download
									</button>
								</div>
							</div>
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
				.downloads-wrapper {
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
