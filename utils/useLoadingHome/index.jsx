import { create } from "zustand";

const useLoadingHome = create((set) => ({
	loading: false,
	setLoading: (value) => set({ loading: value }),
}));

export default useLoadingHome;
