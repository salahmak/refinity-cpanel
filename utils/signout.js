import Router from "next/router";
module.exports = async () => {
	const res = await fetch(`/api/signout`, {
		credentials: "include",
	});
	if (res.ok) {
		Router.push("/login");
	}
};
