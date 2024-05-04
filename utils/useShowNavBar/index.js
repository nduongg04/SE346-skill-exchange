import { create } from "zustand";

const useShowNavBar = create((set) => ({
    showNavBar: true,
    setShowNavBar: (showNavBar) => set({ showNavBar }),
}));

export default useShowNavBar;