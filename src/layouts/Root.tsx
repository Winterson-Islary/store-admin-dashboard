import { GetSelf } from "@/http/client";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
	const authStore = useAuthStore();
	const selfQuery = useQuery({
		queryKey: ["whoami"],
		queryFn: GetSelf,
		retry: (failureCount: number, error) => {
			if (error instanceof AxiosError && error.response?.status === 401) {
				return false;
			}
			return failureCount < 3;
		},
	});

	useEffect(() => {
		if (selfQuery.data) {
			authStore.setUser(selfQuery.data ?? null);
		}
	}, [selfQuery.data, authStore.setUser]);

	if (selfQuery.isLoading) {
		return <div>Loading...</div>;
	}
	return <Outlet />;
};

export default Root;
