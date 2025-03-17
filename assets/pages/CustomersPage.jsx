import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersApi from "../services/CustomersApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CustomersPage = (props) => {
	const [customers, setCustomers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");

	useEffect(() => {
		CustomersApi.findAll()
			.then((data) => setCustomers(data))
			.catch((error) => toast.error("impossible de charger les clients"));
	}, []);

	const handleDelete = async (id) => {
		const originalCustomers = [...customers];
		setCustomers(customers.filter((customer) => customer.id !== id));

		try {
			await CustomersApi.delete(id);
		} catch (error) {
			setCustomers(originalCustomers);
			toast.error("Une erreur est survenue");
		}
	};

	const handleCurrentPage = (page) => {
		setCurrentPage(page);
	};

	const handleSearch = ({ currentTarget }) => {
		setSearch(currentTarget.value);
		setCurrentPage(1);
	};

	const itemsPerPage = 10;

	const filteredCustomers = customers.filter(
		(c) =>
			c.firstName.toLowerCase().includes(search.toLowerCase()) ||
			c.lastName.toLowerCase().includes(search.toLowerCase()) ||
			c.email.toLowerCase().includes(search.toLowerCase()) ||
			c.company?.toLowerCase().includes(search.toLowerCase())
	);

	const paginatedCustomers = Pagination.getData(
		filteredCustomers,
		currentPage,
		itemsPerPage
	);

	return (
		<>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1>Clients</h1>
				<Link to="/customers/new" className="btn btn-primary">
					Nouveau
				</Link>
			</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Rechercher"
					onChange={handleSearch}
					value={search}
				/>
			</div>
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
								<Link to={"/customers/" + customer.id}>
									{customer.firstName} {customer.lastName}
								</Link>
							</td>
							<td>{customer.email}</td>
							<td>{customer.company}</td>
							<td>{customer.invoices.length}</td>
							<td>{customer.totalAmount.toLocaleString()} $</td>
							<td>
								<Link to={"/customers/" + customer.id}>
									Editer
								</Link>
								<button
									onClick={() => handleDelete(customer.id)}
									className="btn btn-outline-danger ml-3"
								>
									Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{itemsPerPage < filteredCustomers.length && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					length={filteredCustomers.length}
					onPageChange={handleCurrentPage}
				/>
			)}
		</>
	);
};

export default CustomersPage;
