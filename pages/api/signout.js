import { serialize } from "cookie";
import { API } from "../../exports/config.js";

export default async (req, res) => {
	const { token } = req.query;

	const options = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: true,
	};

	const resp = await fetch(`${API}/auth/signout`, {
		method: "post",
		headers: {
			"auth-token": token,
		},
	});

	if (resp.ok) {
		res.setHeader("Set-Cookie", serialize("token", "", options));
		res.json({ msg: "ok" });
	} else {
		res.status(400).json({ msg: "couldn't sign out" });
	}
};
