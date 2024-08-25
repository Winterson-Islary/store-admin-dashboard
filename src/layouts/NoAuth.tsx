import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const NoAuth = () => {
	const { User } = useAuthStore();
	if (User !== null) {
		return <Navigate to="/" replace={true} />;
	}
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default NoAuth;
