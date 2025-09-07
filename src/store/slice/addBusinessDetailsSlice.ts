import { businessDetails } from "@/types/BusinessDetailsType";
import { UploadedFile } from "@/types/BusinessDocsType";
import { StateCreator } from "zustand";

export type AddBusinessDetailsSliceState = {
  tempBusinessDocs: UploadedFile[];
  chatText: string;
  businessDetails: businessDetails[];
  isEditingDetails: boolean;
  tempDetails: string;
  isAddingDetails: boolean;
  newDetails: string;
  editingDetailId: string | null;
  editingValue: string;
};

export type AddBusinessDetailsSliceAction = {
  setTempBusinessDocs: (tempBusinessDocs: UploadedFile[]) => void;
  setChatText: (chatText: string) => void;
  setBusinessDetails: (businessDetails: businessDetails[]) => void;
  setIsEditingDetails: (isEditingDetails: boolean) => void;
  setTempDetails: (tempDetails: string) => void;
  setIsAddingDetails: (isAddingDetails: boolean) => void;

  setNewDetails: (newDetails: string) => void;
  setEditingDetailId: (editingDetailId: string | null) => void;
  setEditingValue: (editingValue: string) => void;
};

const initialState: AddBusinessDetailsSliceState = {
  tempBusinessDocs: [],
  chatText: "",
  businessDetails: [],
  isEditingDetails: false,
  tempDetails: "",
  isAddingDetails: false,
  newDetails: "",
  editingDetailId: null,
  editingValue: "",
};

export const createAddBusinessDetailsSliceState: StateCreator<
  AddBusinessDetailsSliceState & AddBusinessDetailsSliceAction
> = (set) => ({
  ...initialState,
  setTempBusinessDocs: (tempBusinessDocs) => set({ tempBusinessDocs }),
  setChatText: (chatText) => set({ chatText }),
  setBusinessDetails: (businessDetails) => set({ businessDetails }),
  setIsEditingDetails: (isEditingDetails) => set({ isEditingDetails }),
  setTempDetails: (tempDetails) => set({ tempDetails }),
  setIsAddingDetails: (isAddingDetails) => set({ isAddingDetails }),
  setNewDetails: (newDetails) => set({ newDetails }),
  setEditingDetailId: (editingDetailId) => set({ editingDetailId }),
  setEditingValue: (editingValue) => set({ editingValue }),
  //connectSliceReset: () => set(initialState),
  /*  setEmail: (email) => set({ email }),

  setIsPage: (isPage) => set({ isPage }),

  setCode: (code) => set({ code }),
  verifyCodeSliceReset: () => set(initialState),
  getStartedReset: () => set(initialState), */
});
