import Router from "next/router";
module.exports = async (query = "", token = "") => {
	const res = await fetch(`/api/signout?token=${token}`, {
		credentials: "include",
	});

	if (res.ok) {
		Router.push(`/login?${query}`);
	} else {
		console.log("couldn't sign out");
	}
};
