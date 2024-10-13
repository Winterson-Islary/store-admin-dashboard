import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { GetTenants } from "@/http/client";
import type { TenantFilterParams, Tenants } from "@/lib/types";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const RestaurantList = ({
	pageState,
	filterParams,
}: {
	pageState: { curPage: number; perPage: number };
	filterParams: { search: string };
}) => {
	const debounceSearch = useDebounce(filterParams);
	const { User } = useAuthStore();
	if (User === null) {
		return <Navigate to="/auth/login" replace />;
	}
	if (User.role !== "admin" && User.role !== "super") {
		return <Navigate to="/" replace />;
	}
	const tenantQuery = useQuery({
		queryKey: ["tenantQuery", debounceSearch],
		queryFn: () => {
			const tempState = {
				curPage: pageState.curPage,
				perPage: pageState.perPage,
				search:
					debounceSearch.search && debounceSearch.search !== ""
						? debounceSearch.search
						: undefined,
			};
			const temp = Object.keys(tempState).reduce(
				(acc, key) => {
					if (
						tempState[key as keyof TenantFilterParams] ===
							undefined ||
						tempState[key as keyof TenantFilterParams] === ""
					) {
						return acc;
					}
					acc[key] = tempState[key as keyof TenantFilterParams];
					return acc;
				},
				{} as Record<string, string | number | undefined>,
			);
			const queryString = new URLSearchParams(
				temp as unknown as Record<string, string>,
			).toString();
			return GetTenants(queryString);
		},
	});
	if (tenantQuery.isLoading) {
		return (
			<div className="h-screen flex  justify-center">
				<p className="text-2xl mt-20">Loading...</p>
			</div>
		);
	}
	const tenantsData: Tenants[] = !tenantQuery.isError
		? tenantQuery.data.data
		: [];
	console.log(tenantsData[0]);
	return (
		<div>
			<section className=" 2xl:w-[70%] mx-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Registered On </TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{tenantQuery.isLoading ? (
							<TableRow>
								<TableCell>Loading....</TableCell>
							</TableRow>
						) : (
							tenantsData.map((tenant) => (
								<TableRow key={tenant.id}>
									<TableCell>{tenant.id}</TableCell>
									<TableCell>{tenant.name}</TableCell>
									<TableCell>{tenant.address}</TableCell>
									<TableCell>
										{
											tenant.createdAt
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
		</div>
	);
};

export default RestaurantList;
