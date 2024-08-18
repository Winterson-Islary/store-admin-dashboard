import type { UserLoginData } from "@/lib/types";
import { api } from "./client";

export const login = async (Data: UserLoginData) =>
	api.post("/auth/login", Data);
