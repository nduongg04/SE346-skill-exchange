import { create } from "zustand";

const useKeyboardShow = create((set) => ({
	keyboardShow: false,
	setKeyboardShow: (value) => {
        console.log(value);
        set({ keyboardShow: value });
    }})
);

export default useKeyboardShow;
