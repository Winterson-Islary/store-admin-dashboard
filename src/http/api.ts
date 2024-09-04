import type { CreateUserData, UserLoginData } from "@/lib/types";
import { api } from "./client";

export const login = async (Data: UserLoginData) =>
	api.post("/auth/login", Data);
export const getUsers = async () => api.get("/users");
export const whoami = async () => api.get("/auth/whoami");
export const logout = async () => api.post("/auth/logout");
export const createUser = async (user: CreateUserData) =>
	api.post("/users", user);
export const getTenants = async () => api.get("/tenants/getAll");
