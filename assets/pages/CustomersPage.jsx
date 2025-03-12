import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

const CustomersPage = (props) => {
	const [customers, setCustomers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		axios
			.get("http://127.0.0.1:8000/api/customers")
			.then((response) => response.data.member)
			.then((data) => setCustomers(data))
			.catch((error) => console.log(error.response));
	}, []);

	const handleDelete = (id) => {
		const originalCustomers = [...customers];
		setCustomers(customers.filter((customer) => customer.id !== id));

		axios
			.delete("http://127.0.0.1:8000/api/customers/" + id)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				setCustomers(originalCustomers);
				console.log(error.response);
			});
	};

	const handleCurrentPage = (page) => {
		setCurrentPage(page);
	};

	const itemsPerPage = 10;
	const paginatedCustomers = Pagination.getData(
		customers,
		currentPage,
		itemsPerPage
	);

	return (
		<>
			<table className="table-hover">
				<thead>
					<tr className="table-light">
						<th>Id</th>
						<th>Client</th>
						<th>Email</th>
						<th>Entreprise</th>
						<th>Factures</th>
						<th>Montant total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{paginatedCustomers.map((customer) => (
						<tr key={customer.id} className="table-light">
							<td>{customer.id}</td>
							<td>
								{customer.firstName} {customer.lastName}
							</td>
							<td>{customer.email}</td>
							<td>{customer.company}</td>
							<td>{customer.invoices.length}</td>
							<td>{customer.totalAmount.toLocaleString()} $</td>
							<td>
								<button
									onClick={() => handleDelete(customer.id)}
									className="btn btn-outline-danger"
								>
									Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Pagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				length={customers.length}
				onPageChange={handleCurrentPage}
			/>
		</>
	);
};

export default CustomersPage;
