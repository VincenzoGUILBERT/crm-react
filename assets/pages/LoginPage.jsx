import React, { useContext, useState } from "react";
import AuthApi from "../services/AuthApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";

const LoginPage = (props) => {
	const navigate = useNavigate();

	const { setIsAuthenticated } = useContext(AuthContext);

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
			setIsAuthenticated(true);
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
				<Field
					name="username"
					label="Email"
					value={credentials.username}
					onChange={handleChange}
					type="email"
					placeholder="Adresse mail"
					error={error}
				/>
				<Field
					name="password"
					label="Mot de passe"
					value={credentials.password}
					onChange={handleChange}
					type="password"
					placeholder="mot de passe"
					error={error}
				/>
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
