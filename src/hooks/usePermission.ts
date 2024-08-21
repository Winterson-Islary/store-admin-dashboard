import type { SelfData } from "@/lib/types";

export const usePermission = () => {
	const allowedRoles = ["admin", "super", "manager"];
	const _hasPermission = (user: SelfData | null) => {
		if (user) {
			return allowedRoles.includes(user.role);
		}
		return false;
	};

	return {
		isAllowed: _hasPermission,
	};
};
