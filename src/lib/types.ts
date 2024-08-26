import type { InternalAxiosRequestConfig } from "axios";
import { z } from "zod";

const UserLoginDataSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	remember: z.boolean().default(false),
});

const TenantSchema = z.object({
	id: z.number(),
	name: z.string().max(100),
	address: z.string().max(255),
	createdAt: z.number(),
	updatedAt: z.number(),
});
const SelfDataSchema = z.object({
	id: z.number(),
	role: z.string(),
	name: z.string(),
	tenant: TenantSchema.optional(),
});

export type UserLoginData = z.infer<typeof UserLoginDataSchema>;
export type SelfData = z.infer<typeof SelfDataSchema>;

export type OriginalRequest =
	| ({ isRetry?: boolean } & InternalAxiosRequestConfig)
	| undefined;
