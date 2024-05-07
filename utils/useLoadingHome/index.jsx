import { create } from "zustand";

const useLoadingHome = create((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));

export default useLoadingHome;