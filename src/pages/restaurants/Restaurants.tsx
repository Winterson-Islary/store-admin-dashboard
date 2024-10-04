import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { List } from "lucide-react";
import { Link } from "react-router-dom";
import RestaurantFilter from "./RestaurantFilter";

export const Restaurants = () => {
	return (
		<>
			<header className="flex flex-col justify-between p-5">
				<Breadcrumb className="">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/">Dashboard</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/restaurants">Restaurants</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<CardHeader className="px-0">
					<CardTitle className="flex gap-2 items-center uppercase">
						{" "}
						<List height={20} width={20} />
						<span>Users List</span>
					</CardTitle>

					<CardDescription>List of registered users</CardDescription>
				</CardHeader>
			</header>
			<main className="md:px-5">
				<RestaurantFilter />
				<h2>Welcome to Restaurants Page</h2>
			</main>
		</>
	);
};
