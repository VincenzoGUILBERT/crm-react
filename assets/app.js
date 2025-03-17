/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
// import "./styles/app.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthApi from "./services/AuthApi";
import { useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthContext from "./contexts/AuthContext";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
	AuthApi.setUp();
	const [isAuthenticated, setIsAuthenticated] = useState(
		AuthApi.isAuthenticated()
	);

	const contextValue = {
		isAuthenticated,
		setIsAuthenticated,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			<HashRouter>
				<Navbar />
				<main className="container pt-5">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route element={<ProtectedRoutes />}>
							<Route
								path="/customers/:id"
								element={<CustomerPage />}
							/>
							<Route
								path="/customers"
								element={<CustomersPage />}
							/>
							<Route
								path="/invoices/:id"
								element={<InvoicePage />}
							/>
							<Route
								path="/invoices"
								element={<InvoicesPage />}
							/>
						</Route>
					</Routes>
				</main>
			</HashRouter>
			<ToastContainer position="bottom-right" />
		</AuthContext.Provider>
	);
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
