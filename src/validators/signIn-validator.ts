import { z } from "zod";

const signInSchema = z.object({
	email: z.string().email({ message: "Enter a valid email address" }),
	password: z.string().min(8, {
		message: "Password must be of at least 8 characters.",
	}),
	remember: z.boolean().default(false),
});

export default signInSchema;
