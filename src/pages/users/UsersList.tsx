import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { GetUsers } from "@/http/client";
import type { TPageStateChange, UsersData } from "@/lib/types";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { List } from "lucide-react";
import { Navigate } from "react-router-dom";
import UserPagination from "./UserPagination";

const UsersList = ({
	pageState,
	setPageState,
}: {
	pageState: TPageStateChange;
	setPageState: React.Dispatch<React.SetStateAction<TPageStateChange>>;
}) => {
	const debounceSearch = useDebounce(pageState);
	const { User } = useAuthStore();
	if (User === null) {
		return <Navigate to="/auth/login" replace />;
	}
	if (User.role !== "admin" && User.role !== "super") {
		return <Navigate to="/" replace />;
	}
	const userQuery = useQuery({
		queryKey: ["users", debounceSearch],
		queryFn: () => {
			const temp = Object.keys(debounceSearch).reduce(
				(acc, key) => {
					if (
						debounceSearch[key as keyof TPageStateChange] ===
							undefined ||
						debounceSearch[key as keyof TPageStateChange] === ""
					) {
						return acc;
					}
					acc[key] = debounceSearch[key as keyof TPageStateChange];
					return acc;
				},
				{} as Record<string, string | boolean | number | undefined>,
			);
			const queryString = new URLSearchParams(
				//! USE BETTER CONVERSION METHOD
				temp as unknown as Record<string, string>,
			).toString();
			console.log(queryString);
			return GetUsers(queryString);
		},
	});
	if (userQuery.isLoading) {
		return (
			<div className="h-screen flex  justify-center">
				<p className="text-2xl mt-20">Loading...</p>
			</div>
		);
	}

	console.log(userQuery.data);
	const usersData: UsersData[] = !userQuery.isError
		? userQuery.data.users
		: [];
	return (
		<main>
			<div className="px-5">
				<section className=" 2xl:w-[70%] mx-auto">
					<header className="flex justify-between">
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
						<section>
							{userQuery.isError && (
								<div>{userQuery.error.message}</div>
							)}
						</section>
					</header>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Username</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Tenant</TableHead>
								<TableHead>Registration Date</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{userQuery.isLoading ? (
								<TableRow>
									<TableCell>Loading....</TableCell>
								</TableRow>
							) : (
								usersData.map((user) => (
									<TableRow key={user.id}>
										<TableCell>{user.name}</TableCell>

										<TableCell>
											{user.isActive
												? "ACTIVE"
												: "INACTIVE"}
										</TableCell>
										<TableCell>{user.role}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>
											{user.tenant?.name}
										</TableCell>
										<TableCell>
											{
												user.createdAt

													.toString()

													.split("T")[0]
											}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</section>
			</div>{" "}
			<section className="mt-5">
				<UserPagination
					usersData={userQuery.data}
					setPageState={setPageState}
				/>
			</section>
		</main>
	);
};

export default UsersList;
