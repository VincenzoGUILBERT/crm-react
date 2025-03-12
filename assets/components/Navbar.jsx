import React from "react";

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					CRM
				</a>
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
							<a className="nav-link" href="#">
								CLients
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Factures
							</a>
						</li>
					</ul>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<a href="#" className="btn btn-outline-primary">
								Connexion
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="btn">
								Inscription
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="btn btn-outline-danger">
								Déconnexion
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
