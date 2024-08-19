import { z } from "zod";

const UserLoginDataSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	remember: z.boolean().default(false),
});

const SelfDataSchema = z.object({
	id: z.number(),
	role: z.string(),
	name: z.string(),
});

export type UserLoginData = z.infer<typeof UserLoginDataSchema>;
export type SelfData = z.infer<typeof SelfDataSchema>;
