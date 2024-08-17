import { z } from "zod";

const signInSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(8, {
		message: "Password must be of at least 8 characters.",
	}),
	remember: z.boolean().optional(),
});

export default signInSchema;
