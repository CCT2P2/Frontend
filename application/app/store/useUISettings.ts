// app/store/useUISettings.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UISettings {
	bg: number;
	blur: boolean;
	setBg: (bg: number) => void;
	setBlur: (blur: boolean) => void;
	padding: number;
	paddingButton: number;
}

export const useUISettings = create<UISettings>()(
	persist(
		(set) => ({
			bg: 1,
			blur: true,
			padding: 5,
			paddingButton: 2,
			setBg: (bg) =>
				set((state) => ({
					bg,
					blur: bg === 0 ? false : state.blur,
				})),
			setBlur: (blur) =>
				set((state) => ({
					bg: blur ? 1 : state.bg,
					blur,
				})),
		}),
		{
			name: "ui-settings", // name of the item in storage
		},
	),
);
