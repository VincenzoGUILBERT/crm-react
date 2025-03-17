import React, { useEffect, useState } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomersApi from "../services/CustomersApi";
import axios from "axios";
import InvoicesApi from "../services/InvoicesApi";
import { toast } from "react-toastify";

const InvoicePage = (props) => {
	const invoiceObject = {
		amount: "",
		customer: "",
		status: "",
	};

	const navigate = useNavigate();
	const { id } = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const [invoice, setInvoice] = useState(invoiceObject);
	const [errors, setErrors] = useState(invoiceObject);
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		CustomersApi.findAll()
			.then((data) => {
				setCustomers(data);
				if (!invoice.customer && id === "new") {
					setInvoice({
						...invoice,
						customer: data[0].id,
						status: "SENT",
					});
				}
			})
			.catch((error) => toast.error("Impossible de charger les clients"));
	}, []);

	const fetchInvoice = async (id) => {
		try {
			const { amount, status, customer } = await InvoicesApi.find(id);
			setInvoice({ amount, status, customer: customer.id });
		} catch (error) {
			toast.error("Impossible de charger la facture");
		}
	};

	useEffect(() => {
		if (id !== "new") {
			setIsEditing(true);
			fetchInvoice(id);
		}
	}, [id]);

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setInvoice({ ...invoice, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (isEditing) {
				await InvoicesApi.update(id, invoice);
				toast.success("Facture modifiée");
			} else {
				await InvoicesApi.create(invoice);
				toast.success("Facture crée");
				navigate("/invoices");
			}
		} catch ({ response }) {
			const { violations } = response.data;
			if (violations) {
				const apiErrors = {};
				violations.forEach(({ propertyPath, message }) => {
					apiErrors[propertyPath] = message;
				});

				setErrors(apiErrors);
			}
		}
	};

	return (
		<>
			{isEditing ? (
				<h1>Modifier la facture</h1>
			) : (
				<h1>Créer une facture</h1>
			)}

			<form onSubmit={handleSubmit}>
				<Field
					name="amount"
					type="number"
					placeholder="Montant de la facture"
					label="Montant"
					onChange={handleChange}
					value={invoice.amount}
					error={errors.amount}
				/>
				<Select
					name="customer"
					label="client"
					onChange={handleChange}
					value={invoice.customer}
					error={errors.customer}
				>
					{customers.map((customer) => (
						<option key={customer.id} value={customer.id}>
							{customer.firstName} {customer.lastName}
						</option>
					))}
				</Select>
				<Select
					name="status"
					label="Statut"
					onChange={handleChange}
					value={invoice.status}
					error={errors.status}
				>
					<option value="SENT">Envoyée</option>
					<option value="PAID">Payée</option>
					<option value="CANCELLED">Annulée</option>
				</Select>
				<div className="form-group">
					<button type="submit" className="btn btn-primary mr-3">
						Ajouter
					</button>
					<Link to="/invoices">Retour aux factures</Link>
				</div>
			</form>
		</>
	);
};

export default InvoicePage;
