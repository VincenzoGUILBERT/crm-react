import axios from "axios";
import { jwtDecode } from "jwt-decode";

function setAxiosToken(token) {
	axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setUp() {
	const token = window.localStorage.getItem("authToken");
	if (token) {
		const jwtData = jwtDecode(token);
		if (jwtData.exp * 1000 > new Date().getTime()) {
			setAxiosToken(token);
		}
	}
}

function isAuthenticated() {
	const token = window.localStorage.getItem("authToken");
	if (token) {
		const jwtData = jwtDecode(token);
		return jwtData.exp * 1000 > new Date().getTime();
	}
	return false;
}

function register(user) {
	return axios.post("http://127.0.0.1:8000/api/users", user);
}

function authenticate(credentials) {
	return axios
		.post("http://127.0.0.1:8000/api/login_check", credentials)
		.then((response) => response.data.token)
		.then((token) => {
			window.localStorage.setItem("authToken", token);
			setAxiosToken(token);
		});
}

function logout() {
	window.localStorage.removeItem("authToken");
	delete axios.defaults.headers["Authorization"];
}

export default {
	isAuthenticated,
	register,
	authenticate,
	logout,
	setUp,
};
