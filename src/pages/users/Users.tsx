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
import { GetUsers } from "@/http/client";
import type { UsersData } from "@/lib/types";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { List } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import UsersFilter from "./usersFilter";

export const Users = () => {
	const { User } = useAuthStore();
	if (User === null) {
		return <Navigate to="/auth/login" replace />;
	}
	if (User.role !== "admin" && User.role !== "super") {
		return <Navigate to="/" replace />;
	}
	const userQuery = useQuery({
		queryKey: ["users"],
		queryFn: GetUsers,
	});
	if (userQuery.isLoading) {
		return <div>Loading...</div>;
	}
	const usersData: UsersData[] = !userQuery.isError
		? userQuery.data.users
		: [];
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
					<UsersFilter />
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
							{usersData.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.name}</TableCell>
									<TableCell>
										{user.isActive ? "ACTIVE" : "INACTIVE"}
									</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										{
											user.createdAt
												.toString()
												.split("T")[0]
										}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</section>
			</main>
		</div>
	);
};
