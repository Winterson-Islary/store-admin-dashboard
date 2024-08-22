import { GetSelf } from "@/http/client";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
	const authStore = useAuthStore();
	const selfQuery = useQuery({
		queryKey: ["whoami"],
		queryFn: GetSelf,
	});

	useEffect(() => {
		if (selfQuery.error) {
			console.log(selfQuery.error);
		}
		if (selfQuery.data) {
			authStore.setUser(selfQuery.data ?? null);
		}
	}, [selfQuery.data, authStore.setUser, selfQuery.error]);

	if (selfQuery.isLoading) {
		return <div>Loading...</div>;
	}
	return <Outlet />;
};

export default Root;
