//import { BusinessDoc } from "@/types/BusinessDocsType";
import { StateCreator } from "zustand";

export type BusinessSetupSliceState = {
  setupName: string;
  setupDescription: string;
  isSettingUp: boolean;
};

export type BusinessSetupSliceAction = {
  setSetupName: (setupName: string) => void;
  setSetupDescription: (setupDescription: string) => void;
  setIsSettingUp: (isSettingUp: boolean) => void;
};

const initialState: BusinessSetupSliceState = {
  setupName: "",
  setupDescription: "",
  isSettingUp: false,
};

export const createBusinessSetupSlice: StateCreator<
  BusinessSetupSliceState & BusinessSetupSliceAction
> = (set) => ({
  ...initialState,
  setSetupName: (setupName) => set({ setupName }),
  setSetupDescription: (setupDescription) => set({ setupDescription }),
  setIsSettingUp: (isSettingUp) => set({ isSettingUp }),
});
