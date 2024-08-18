import { z } from "zod";

const UserLoginDataSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	remember: z.boolean().default(false),
});

export type UserLoginData = z.infer<typeof UserLoginDataSchema>;
