import { serialize } from "cookie";

export default async (req, res) => {
	const options = {
		httpOnly: true,
		maxAge: 1,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: true,
	};

	res.setHeader("Set-Cookie", serialize("token", "", options));
	res.json({ msg: "ok" });
};
