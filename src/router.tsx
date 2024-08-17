import { createBrowserRouter } from "react-router-dom";
import { Categories } from "./pages/Categories";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/categories",
		element: <Categories />,
	},
	{
		path: "/auth/login",
		element: <LoginPage />,
	},
]);
