export default () => {
	return (
		<div className="d-flex justify-content-center align-items-center">
			<span
				className="spinner-grow text-danger spinner-grow-sm"
				role="status"
				aria-hidden="true"
			></span>
			<span
				className="spinner-grow text-warning spinner-grow-sm"
				role="status"
				aria-hidden="true"
			></span>
			<span
				className="spinner-grow text-secondary spinner-grow-sm"
				role="status"
				aria-hidden="true"
			></span>
		</div>
	);
};
