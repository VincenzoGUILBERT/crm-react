/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import { createRoot } from "react-dom/client";
import "./styles/app.css";

const root = createRoot(document.getElementById("app"));
root.render(<h1>Hello, world</h1>);
