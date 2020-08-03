export default ({ alert }) => {
	return (
		<div className={`alert alert-${alert.variant ? alert.variant : "danger"}`} role="alert">
			<span>{`${alert.msg}`}</span>
		</div>
	);
};
