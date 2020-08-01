import Router from "next/router";
module.exports = async (query) => {
	const res = await fetch(`/api/signout`, {
		credentials: "include",
	});
	if (res.ok) {
		Router.push("/login");
	}
};
