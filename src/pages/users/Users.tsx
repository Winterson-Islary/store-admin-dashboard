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
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserPagination from "./UserPagination";
import UsersFilter from "./UsersFilter";

export const Users = () => {
	const [pageState, setPageState] = useState({
		curPage: 1,
		perPage: 5,
	});
	console.log(pageState);
	const { User } = useAuthStore();
	if (User === null) {
		return <Navigate to="/auth/login" replace />;
	}
	if (User.role !== "admin" && User.role !== "super") {
		return <Navigate to="/" replace />;
	}
	const userQuery = useQuery({
		queryKey: ["users", pageState],
		queryFn: () => {
			const queryString = new URLSearchParams(
				//! USE BETTER CONVERSION METHOD
				pageState as unknown as Record<string, string>,
			).toString();
			return GetUsers(queryString);
		},
	});
	if (userQuery.isLoading) {
		return <div>Loading...</div>;
	}
	console.log(userQuery.data);
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
				<section className=" 2xl:w-[70%] mx-auto">
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
					<UsersFilter
						onFilterChange={(filterName, value) => {
							console.log(filterName, value);
						}}
					/>
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
			<section className="mt-5">
				<UserPagination
					usersData={userQuery.data}
					setPageState={setPageState}
				/>
			</section>
		</div>
	);
};
