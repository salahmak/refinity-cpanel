import Router from "next/router";
module.exports = async (query = "signedOut=true") => {
	const res = await fetch(`/api/signout`, {
		credentials: "include",
	});
	if (res.ok) {
		Router.push(`/login?${query}`);
	}
};
