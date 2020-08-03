import { useRouter } from "next/router";

export default ({ error }) => {
	const Router = useRouter();
	return (
		<>
			<div className="error-wrapper">
				<div className="row">
					<div className="col-md-12">
						<div>
							<h1>Oops!</h1>
							<h2>Failed to fetch the enrollments...</h2>
							<div>
								Sorry, there was an error while fetching the data from the api, please
								check the if the backend server is online or reload the page, please
								consider contacting a developer if this error continues to happen.
								<br />
								<ul>
									<li>Error type: {error.type} </li>
									<li>Error message: {error.msg} </li>
								</ul>
							</div>
							<div>
								<div onClick={() => Router.reload()} className="btn btn-primary btn-lg">
									Click here to reload the page
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				.error-wrapper {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 50px;
				}
			`}</style>
		</>
	);
};
