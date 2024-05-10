import { create } from "zustand";

export const useAction = create((set) => ({
    swipe: "",
	swipeLeft: () => set({ swipe: "left" }),
	swipeRight: () => set({ swipe: "right" }),
}));
