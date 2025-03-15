import React, { useEffect, useState } from "react";
import Field from "../components/forms/Field";
import { useNavigate, useParams } from "react-router-dom";
import CustomersApi from "../services/CustomersApi";

const CustomerPage = (props) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const customerObject = {
		firstName: "",
		lastName: "",
		email: "",
		company: "",
	};

	const [isEditing, setIsEditing] = useState(false);
	const [customer, setCustomer] = useState(customerObject);
	const [errors, setErrors] = useState(customerObject);

	const fetchCustomer = async (id) => {
		try {
			const { firstName, lastName, email, company } =
				await CustomersApi.find(id);
			setCustomer({ firstName, lastName, email, company });
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		if (id !== "new") {
			setIsEditing(true);
			fetchCustomer(id);
		}
	}, [id]);

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setCustomer({ ...customer, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (isEditing) {
				await CustomersApi.update(id, customer);
			} else {
				await CustomersApi.create(customer);
				setErrors({});
				navigate("/customers");
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
			{isEditing ? <h1>edit</h1> : <h1>new</h1>}

			<form onSubmit={handleSubmit}>
				<Field
					name="firstName"
					label="Prénom"
					placeholder="Prénom"
					value={customer.firstName}
					onChange={handleChange}
					error={errors.firstName}
				/>
				<Field
					name="lastName"
					label="Nom de famille"
					placeholder="Nom de famille"
					value={customer.lastName}
					onChange={handleChange}
					error={errors.lastName}
				/>
				<Field
					name="email"
					label="Email"
					placeholder="adresse email"
					type="email"
					value={customer.email}
					onChange={handleChange}
					error={errors.email}
				/>
				<Field
					name="company"
					label="Entreprise"
					placeholder="Entreprise"
					value={customer.company}
					onChange={handleChange}
					error={errors.company}
				/>
				<div className="form-group">
					<button type="submit" className="btn btn-success">
						Ajouter
					</button>
				</div>
			</form>
		</>
	);
};

export default CustomerPage;
