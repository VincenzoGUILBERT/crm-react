import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { LOGIN_API, USERS_API } from "../config";

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
	return axios.post(USERS_API, user);
}

function authenticate(credentials) {
	return axios
		.post(LOGIN_API, credentials)
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
