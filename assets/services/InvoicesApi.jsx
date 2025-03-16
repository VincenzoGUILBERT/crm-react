import axios from "axios";

function find(id) {
	return axios
		.get("http://127.0.0.1:8000/api/invoices/" + id)
		.then((response) => response.data);
}

function findAll() {
	return axios
		.get("http://127.0.0.1:8000/api/invoices")
		.then((response) => response.data.member);
}

function create(invoice) {
	axios.post("http://127.0.0.1:8000/api/invoices", {
		...invoice,
		customer: `/api/customers/${invoice.customer}`,
		amount: parseFloat(invoice.amount),
	});
}

function update(id, invoice) {
	return axios.patch(
		"http://127.0.0.1:8000/api/invoices/" + id,
		{
			...invoice,
			customer: `/api/customers/${invoice.customer}`,
			amount: parseFloat(invoice.amount),
		},
		{
			headers: {
				"Content-Type": "application/merge-patch+json",
			},
		}
	);
}

function deleteInvoices(id) {
	return axios.delete("http://127.0.0.1:8000/api/invoices/" + id);
}

export default {
	find,
	findAll,
	create,
	update,
	delete: deleteInvoices,
};
