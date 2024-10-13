import type {
	CreateUserData,
	OriginalRequest,
	SelfData,
	UserLoginData,
} from "@/lib/types";
import { useAuthStore } from "@/store";
import axios, { type AxiosError } from "axios";
import { createUser, getTenants, getUsers, login, whoami } from "./api";

const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Intercept response for handling 401 status code.
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const _originalRequest: OriginalRequest | undefined = error.config; // e.config preserves the 'Request' that failed.
		const _originalHeaders = { ..._originalRequest?.headers };
		if (error.response?.status === 401 && !_originalRequest?.isRetry) {
			try {
				if (_originalRequest) {
					_originalRequest.isRetry = true;
				}
				await RefreshToken();
				return api.request({
					..._originalRequest,
					headers: _originalHeaders,
				});
			} catch (err) {
				console.error("Error while refreshing token");
				console.error(err);
				useAuthStore.getState().logout();
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	},
);
//* HELPER FUNCTIONS

const RefreshToken = async () => {
	await axios.post(
		`${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
		{},
		{ withCredentials: true },
	);
};
const LoginUser = async (Data: UserLoginData) => {
	const { data } = await login(Data);
	return data;
};
const GetSelf = async () => {
	const { data } = await whoami();
	return data as SelfData;
};

const GetUsers = async (queryString: string) => {
	const { data } = await getUsers(queryString);
	return data;
};

const CreateUser = async (user: CreateUserData) => {
	await createUser(user);
	return;
};

const GetTenants = async (queryString: string) => {
	const { data } = await getTenants(queryString);
	return data;
};
export { api, LoginUser, GetSelf, GetUsers, CreateUser, GetTenants };
