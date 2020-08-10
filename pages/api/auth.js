import fetch from "isomorphic-unfetch";
import { API } from "../../exports/config.js";
import { serialize } from "cookie";

export default async (req, res) => {
	const { type } = req.query;
	try {
		const resp = await fetch(`${API}/auth/${type}`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req.body),
		});

		const options = {
			httpOnly: true,
			maxAge: 432000,
			secure: process.env.NODE_ENV === "production",
			path: "/",
		};

		if (!resp.ok) return res.status(resp.status).json(await resp.json());

		const token = await resp.json();

		res.setHeader("Set-Cookie", serialize("token", token, options));
		res.json({ msg: "ok" });
	} catch {
		res.status(500).json({ msg: "there was an error while authenticating" });
	}
};
