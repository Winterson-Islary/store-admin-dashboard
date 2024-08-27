import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { List } from "lucide-react";
import { Link } from "react-router-dom";

export const Users = () => {
	return (
		<div>
			<Breadcrumb className="p-5">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/">Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/users">Users</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<main className="px-5">
				<section className=" xl:w-[70%] mx-auto">
					<CardHeader className="px-0">
						<CardTitle className="flex gap-2 items-center uppercase">
							{" "}
							<List height={20} width={20} />
							<span>Users List</span>
						</CardTitle>
						<CardDescription>
							List of registered users
						</CardDescription>
					</CardHeader>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Username</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Registration Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>RAHUL</TableCell>
								<TableCell>ACTIVE</TableCell>
								<TableCell>ADMIN</TableCell>
								<TableCell>admin@gmail.com</TableCell>
								<TableCell>20 July, 2024</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</section>
			</main>
		</div>
	);
};