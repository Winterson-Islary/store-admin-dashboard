import { useAuthStore } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const NoAuth = () => {
	const { User } = useAuthStore();
	const location = useLocation();
	if (User !== null) {
		const returnTo =
			new URLSearchParams(location.search).get("returnTo") || "/";
		return <Navigate to={returnTo} replace />;
	}
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default NoAuth;
