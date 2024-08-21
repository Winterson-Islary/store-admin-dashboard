import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { SelfData } from "./lib/types";

interface IAuth {
	User: null | SelfData;
	setUser: (user: SelfData | null) => void;
	logout: () => void;
}
export const useAuthStore = create<IAuth>()(
	devtools((set) => ({
		User: null,
		setUser: (user: SelfData | null) => set({ User: user }),
		logout: () => set({ User: null }),
	})),
);
