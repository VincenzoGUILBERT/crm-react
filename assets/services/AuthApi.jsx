import axios from "axios";
import CustomersApi from "./CustomersApi";

function authenticate(credentials) {
	return axios
		.post("http://127.0.0.1:8000/api/login_check", credentials)
		.then((response) => response.data.token)
		.then((token) => {
			window.localStorage.setItem("authToken", token);
			axios.defaults.headers["Authorization"] = "Bearer " + token;
		});
}

function logout() {
	window.localStorage.removeItem("authToken");
	delete axios.defaults.headers["Authorization"];
	CustomersApi.findAll().then(console.log);
}

export default {
	authenticate,
	logout,
};
