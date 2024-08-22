import type { SelfData, UserLoginData } from "@/lib/types";
import axios from "axios";
import { login, whoami } from "./api";

export const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

//* HELPER FUNCTIONS

export const LoginUser = async (Data: UserLoginData) => {
	//TODO: SERVER CALL LOGIC
	const { data } = await login(Data);
	return data;
};
export const GetSelf = async () => {
	const { data } = await whoami();
	return data as SelfData;
};
