import fetch from "isomorphic-unfetch";
import { API } from "../../exports/config.js";
import { serialize } from "cookie";

export default async (req, res) => {
	const { type } = req.query;
	const resp = await fetch(`${API}/auth/${type}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(req.body),
	});

	const options = {
		httpOnly: true,
		maxAge: 432000000,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: true,
	};
	const token = await resp.json();

	res.setHeader("Set-Cookie", serialize("token", token, options));
	res.json({ msg: "ok" });
};
