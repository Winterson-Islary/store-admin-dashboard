import Dashboard from "@/layouts/Dashboard";
import Home from "@/pages/Home";
import { Products } from "@/pages/Products";
import LoginPage from "@/pages/login/login";
import { createBrowserRouter } from "react-router-dom";
import NoAuth from "./layouts/NoAuth";
import Root from "./layouts/Root";
import { Orders } from "./pages/Orders";
import { Promos } from "./pages/Promos";
import { Sales } from "./pages/Sales";

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
						element: <Home />,
					},
					{
						path: "/products",
						element: <Products />,
					},
					{
						path: "/Orders",
						element: <Orders />,
					},
					{
						path: "/Promos",
						element: <Promos />,
					},
					{
						path: "/Sales",
						element: <Sales />,
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
