//export const API = "https://refinity-backend.herokuapp.com";
export const API =
	process.env.NODE_ENV === "production"
		? "https://refinity-api.herokuapp.com"
		: "http://localhost:3001";
