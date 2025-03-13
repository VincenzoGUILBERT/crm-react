import React from "react";
import AuthApi from "../services/AuthApi";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		AuthApi.logout();
		onLogout(false);
		navigate("/");
	};

	return (
		<nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					CRM
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarColor02"
					aria-controls="navbarColor02"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarColor02">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to="/customers">
								CLients
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/invoices">
								Factures
							</NavLink>
						</li>
					</ul>
					<ul className="navbar-nav ml-auto">
						{!isAuthenticated ? (
							<>
								<li className="nav-item">
									<NavLink
										to="/login"
										className="btn btn-outline-primary"
									>
										Connexion
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="btn" to="/register">
										Inscription
									</NavLink>
								</li>
							</>
						) : (
							<li className="nav-item">
								<button
									onClick={handleLogout}
									className="btn btn-outline-danger"
								>
									Déconnexion
								</button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
