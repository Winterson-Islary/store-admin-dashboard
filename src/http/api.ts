import type { UserLoginData } from "@/lib/types";
import { api } from "./client";

export const login = async (Data: UserLoginData) =>
	api.post("/auth/login", Data);
export const whoami = async () => api.get("/auth/whoami");
