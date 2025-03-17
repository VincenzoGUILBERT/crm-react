import axios from "axios";
import { INVOICES_API } from "../config";

function find(id) {
	return axios.get(INVOICES_API + "/" + id).then((response) => response.data);
}

function findAll() {
	return axios.get(INVOICES_API).then((response) => response.data.member);
}

function create(invoice) {
	axios.post(INVOICES_API, {
		...invoice,
		customer: `/api/customers/${invoice.customer}`,
		amount: parseFloat(invoice.amount),
	});
}

function update(id, invoice) {
	return axios.patch(
		INVOICES_API + "/" + id,
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
	return axios.delete(INVOICES_API + "/" + id);
}

export default {
	find,
	findAll,
	create,
	update,
	delete: deleteInvoices,
};
