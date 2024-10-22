import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type TUserRole = "manager" | "admin" | "customer";
export function StringToRole(role: string): TUserRole {
	if (["manager", "admin", "customer"].includes(role)) {
		return role as TUserRole;
	}
	return "customer" as TUserRole;
}
