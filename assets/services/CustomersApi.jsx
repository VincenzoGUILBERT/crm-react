import axios from "axios";
import { CUSTOMERS_API } from "../config";

function find(id) {
	return axios
		.get(CUSTOMERS_API + "/" + id)
		.then((response) => response.data);
}

function findAll() {
	return axios.get(CUSTOMERS_API).then((response) => response.data.member);
}

function create(customer) {
	return axios.post(CUSTOMERS_API, customer);
}

function update(id, customer) {
	return axios.patch(CUSTOMERS_API + "/" + id, customer, {
		headers: {
			"Content-Type": "application/merge-patch+json",
		},
	});
}

function deleteCustomer(id) {
	return axios.delete(CUSTOMERS_API + "/" + id);
}

export default {
	find,
	findAll,
	create,
	update,
	delete: deleteCustomer,
};
