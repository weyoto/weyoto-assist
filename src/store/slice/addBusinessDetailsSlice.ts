import { StateCreator } from "zustand";

export type AddBusinessDetailsSliceState = {
  businessDetails: string;
  isEditingDetails: boolean;
  tempDetails: string;
  isAddingDetails: boolean;
  newDetails: string;
};

export type AddBusinessDetailsSliceAction = {
  setBusinessDetails: (businessDetails: string) => void;
  setIsEditingDetails: (isEditingDetails: boolean) => void;
  setTempDetails: (tempDetails: string) => void;
  setIsAddingDetails: (isAddingDetails: boolean) => void;

  setNewDetails: (newDetails: string) => void;
};

const initialState: AddBusinessDetailsSliceState = {
  businessDetails: "",
  isEditingDetails: false,
  tempDetails: "",
  isAddingDetails: false,
  newDetails: "",
};

export const createAddBusinessDetailsSliceState: StateCreator<
  AddBusinessDetailsSliceState & AddBusinessDetailsSliceAction
> = (set) => ({
  ...initialState,
  setBusinessDetails: (businessDetails) => set({ businessDetails }),
  setIsEditingDetails: (isEditingDetails) => set({ isEditingDetails }),
  setTempDetails: (tempDetails) => set({ tempDetails }),
  setIsAddingDetails: (isAddingDetails) => set({ isAddingDetails }),
  setNewDetails: (newDetails) => set({ newDetails }),
  //connectSliceReset: () => set(initialState),
  /*  setEmail: (email) => set({ email }),

  setIsPage: (isPage) => set({ isPage }),

  setCode: (code) => set({ code }),
  verifyCodeSliceReset: () => set(initialState),
  getStartedReset: () => set(initialState), */
});
