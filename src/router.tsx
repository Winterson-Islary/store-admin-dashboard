import Dashboard from "@/layouts/Dashboard";
import Home from "@/pages/Home";
import { Products } from "@/pages/Products";
import LoginPage from "@/pages/login/login";
import { createBrowserRouter } from "react-router-dom";
import NoAuth from "./layouts/NoAuth";
import Root from "./layouts/Root";
import { Promos } from "./pages/Promos";
import { Restaurants } from "./pages/Restaurants";
import { Users } from "./pages/users/Users";

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
						path: "/users",
						element: <Users />,
					},
					{
						path: "/promos",
						element: <Promos />,
					},
					{
						path: "/restaurants",
						element: <Restaurants />,
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
