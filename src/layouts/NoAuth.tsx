import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const NoAuth = () => {
	const { User } = useAuthStore();
	if (User !== null) {
		return <Navigate to="/" replace={true} />;
	}
	return (
		<div>
			<h1>NO AUTH</h1>
			<Outlet />
		</div>
	);
};

export default NoAuth;
