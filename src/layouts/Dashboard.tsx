import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const Dashboard = () => {
	const { User } = useAuthStore();
	if (User === null) {
		return <Navigate to="/auth/login" replace={true} />;
	}
	return (
		<div>
			<h1>Dashboard</h1>
			<Outlet />
		</div>
	);
};

export default Dashboard;
