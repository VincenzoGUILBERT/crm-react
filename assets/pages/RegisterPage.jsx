import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../services/AuthApi";
import { toast } from "react-toastify";

const RegisterPage = (props) => {
	const userObject = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfirm: "",
	};

	const navigate = useNavigate();
	const [user, setUser] = useState(userObject);
	const [errors, setErrors] = useState(userObject);

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await AuthApi.register(user);
			setErrors({});
			toast.success("Vous pouvez vous connecter");
			navigate("/login");
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
			<h1>Inscription</h1>

			<form onSubmit={handleSubmit}>
				<Field
					name="firstName"
					label="Prénom"
					placeholder="Prénom"
					value={user.firstName}
					onChange={handleChange}
					error={errors.firstName}
				/>
				<Field
					name="lastName"
					label="Nom de famille"
					placeholder="Nom de famille"
					value={user.lastName}
					onChange={handleChange}
					error={errors.lastName}
				/>
				<Field
					name="email"
					label="Email"
					type="email"
					placeholder="Adresse mail"
					value={user.email}
					onChange={handleChange}
					error={errors.email}
				/>
				<Field
					name="password"
					label="Mot de passe"
					placeholder="Mot de passe"
					type="password"
					value={user.password}
					onChange={handleChange}
					error={errors.password}
				/>
				<Field
					name="confirmPassword"
					label="Confirmer votre mot de passe"
					placeholder="Confirmer votre mot de passe"
					type="password"
					value={user.confirmPassword}
					onChange={handleChange}
					error={errors.confirmPassword}
				/>
				<div className="form-group">
					<button type="submit" className="btn btn-primary">
						Envoyer
					</button>
					<Link to="/login">déjà inscrit ?</Link>
				</div>
			</form>
		</>
	);
};

export default RegisterPage;
