import { z } from "zod";

export const UserLoginDataSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	remember: z.boolean().default(false),
});
