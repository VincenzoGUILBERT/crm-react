import axios from "axios";

function find(id) {
	return axios
		.get("http://127.0.0.1:8000/api/customers/" + id)
		.then((response) => response.data);
}

function findAll() {
	return axios
		.get("http://127.0.0.1:8000/api/customers")
		.then((response) => response.data.member);
}

function create(customer) {
	return axios.post("http://127.0.0.1:8000/api/customers", customer);
}

function update(id, customer) {
	return axios.patch("http://127.0.0.1:8000/api/customers/" + id, customer, {
		headers: {
			"Content-Type": "application/merge-patch+json",
		},
	});
}

function deleteCustomer(id) {
	return axios.delete("http://127.0.0.1:8000/api/customers/" + id);
}

export default {
	find,
	findAll,
	create,
	update,
	delete: deleteCustomer,
};
