import type { InternalAxiosRequestConfig } from "axios";
import { z } from "zod";

export type TPageStateChange = {
	curPage: number;
	perPage: number;
	user?: string;
	role?: string;
	isActive?: boolean;
};
export type PaginationData = {
	curPage: number;
	perPage: number;
	count: number;
};
export type TenantFilterParams = {
	curPage: number;
	perPage: number;
	search?: string;
};
export type FilterParams = {
	user?: string;
	role?: string;
	isActive?: boolean;
};
const UserLoginDataSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	remember: z.boolean().default(false),
});

const TenantSchema = z.object({
	id: z.number(),
	name: z.string().max(100),
	address: z.string().max(255),
	createdAt: z.number(),
	updatedAt: z.number(),
});
const UsersSchema = z.object({
	id: z.number(),
	role: z.string(),
	name: z.string(),
	email: z.string().email(),
	tenant: TenantSchema.optional(),
	createdAt: z.number(),
	isActive: z.boolean(),
});
export const CreateUserSchema = z.object({
	name: z
		.string()
		.min(1, "Name cannot be empty")
		.max(100, "Name cannot be more than 100 characters long"),
	role: z.enum(["customer", "admin", "manager"]).default("customer"),
	password: z.string().min(8, "Password must be of at least 8 characters"),
	email: z.string().email(),
	tenantId: z.string().optional(),
});
const SelfDataSchema = z.object({
	id: z.number(),
	role: z.string(),
	name: z.string(),
	tenant: TenantSchema.optional(),
});

export type UserLoginData = z.infer<typeof UserLoginDataSchema>;
export type SelfData = z.infer<typeof SelfDataSchema>;
export type UsersData = z.infer<typeof UsersSchema>;
export type Tenants = z.infer<typeof TenantSchema>;
export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type OriginalRequest =
	| ({ isRetry?: boolean } & InternalAxiosRequestConfig)
	| undefined;
