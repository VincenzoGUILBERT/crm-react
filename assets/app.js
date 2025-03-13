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

const root = createRoot(document.getElementById("app"));
root.render(
	<HashRouter>
		<Navbar />
		<main className="container pt-5">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/customers" element={<CustomersPage />} />
				<Route path="/invoices" element={<InvoicesPage />} />
			</Routes>
		</main>
	</HashRouter>
);
