import Dashboard from "@/layouts/Dashboard";
import { Categories } from "@/pages/Categories";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/login/login";
import { createBrowserRouter } from "react-router-dom";
import NoAuth from "./layouts/NoAuth";
import Root from "./layouts/Root";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <Dashboard />,
				children: [
					{
						path: "",
						element: <HomePage />,
					},
					{
						path: "/categories",
						element: <Categories />,
					},
				],
			},

			{
				path: "/auth",
				element: <NoAuth />,
				children: [
					{
						path: "/auth/login",
						element: <LoginPage />,
					},
				],
			},
		],
	},
]);
