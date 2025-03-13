import React, { useState } from "react";
import AuthApi from "../services/AuthApi";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const [error, setError] = useState("");

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;
		setCredentials({ ...credentials, [name]: value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await AuthApi.authenticate(credentials);
			onLogin(true);
			setError("");
			navigate("/customers");
		} catch (error) {
			setError("Informations incorrectes");
		}
	};

	return (
		<>
			<h1>Connexion</h1>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Email</label>
					<input
						value={credentials.username}
						onChange={handleChange}
						id="username"
						type="email"
						name="username"
						className={"form-control" + (error && " is-invalid")}
					/>
					{error && <p className="invalid-feedback">{error}</p>}
				</div>
				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input
						value={credentials.password}
						onChange={handleChange}
						id="password"
						type="password"
						name="password"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-primary">
						Connexion
					</button>
				</div>
			</form>
		</>
	);
};

export default LoginPage;
