import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import InvoicesApi from "../services/InvoicesApi";
import { Link } from "react-router-dom";

const InvoicesPage = (props) => {
	const [invoices, setInvoices] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");

	const formatDate = (str) => moment(str).format("DD/MM/YYYY");
	const statusClasses = {
		PAID: "success",
		SENT: "primary",
		CANCELLED: "danger",
	};
	const statusLabel = {
		PAID: "payée",
		SENT: "envoyée",
		CANCELLED: "annulée",
	};

	useEffect(() => {
		InvoicesApi.findAll()
			.then((data) => setInvoices(data))
			.catch((error) => console.log(error.response));
	}, []);

	const handleDelete = async (id) => {
		const originalInvoices = [...invoices];
		setInvoices(invoices.filter((invoice) => invoice.id !== id));

		try {
			await InvoicesApi.delete(id);
		} catch (error) {
			setInvoices(originalInvoices);
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

	const filteredInvoices = invoices.filter(
		(i) =>
			i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
			i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
			i.amount.toString().startsWith(search.toLowerCase()) ||
			statusLabel[i.status].toLowerCase().includes(search.toLowerCase())
	);

	const paginatedInvoices = Pagination.getData(
		filteredInvoices,
		currentPage,
		itemsPerPage
	);

	return (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<h1>Factures</h1>
				<Link className="btn btn-primary" to="/invoices/new">
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
						<th>Numéro</th>
						<th>Client</th>
						<th className="text-center">Date</th>
						<th className="text-center">Statut</th>
						<th className="text-center">Montant</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{paginatedInvoices.map((invoice) => (
						<tr key={invoice.id} className="table-light">
							<td>{invoice.chrono}</td>
							<td>
								{invoice.customer.firstName}{" "}
								{invoice.customer.lastName}
							</td>
							<td className="text-center">
								{formatDate(invoice.sentAt)}
							</td>
							<td className="text-center">
								<span
									className={
										"badge badge-" +
										statusClasses[invoice.status]
									}
								>
									{invoice.status}
								</span>
							</td>
							<td className="text-center">
								{invoice.amount.toLocaleString()} $
							</td>
							<td>
								<Link
									to={"/invoices/" + invoice.id}
									className="btn btn-primary mr-2"
								>
									Editer
								</Link>
								<button
									onClick={() => handleDelete(invoice.id)}
									className="btn btn-outline-danger"
								>
									Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{itemsPerPage < filteredInvoices.length && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					length={filteredInvoices.length}
					onPageChange={handleCurrentPage}
				/>
			)}
		</>
	);
};

export default InvoicesPage;
