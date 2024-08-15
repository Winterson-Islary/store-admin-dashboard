import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const root: HTMLElement | null = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}
