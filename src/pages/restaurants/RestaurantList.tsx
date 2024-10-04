import { useDebounce } from "@/hooks/useDebounce";
import { getTenants } from "@/http/api";
import type { TenantFilterParams } from "@/lib/types";
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
			return getTenants(queryString);
		},
	});
	return <div>Restaurant List</div>;
};

export default RestaurantList;
