import { StateCreator } from "zustand";

export type AuthSliceState = {
  gitPat: string;
  email: string;
  isPage: "sign-in" | "verifyEmail";
  code: string;
};

export type AuthSliceAction = {
  setgitPat: (gitPat: string) => void;
  connectSliceReset: () => void;
  setEmail: (email: string) => void;

  setIsPage: (value: "sign-in" | "verifyEmail") => void;
  setCode: (code: string) => void;
  verifyCodeSliceReset: () => void;
  getStartedReset: () => void;
};

const initialState: AuthSliceState = {
  gitPat: "",
  email: "",
  isPage: "sign-in",
  code: "",
};

export const createAuthSlice: StateCreator<AuthSliceState & AuthSliceAction> = (
  set
) => ({
  ...initialState,
  setgitPat: (gitPat) => set({ gitPat }),
  connectSliceReset: () => set(initialState),
  setEmail: (email) => set({ email }),

  setIsPage: (isPage) => set({ isPage }),

  setCode: (code) => set({ code }),
  verifyCodeSliceReset: () => set(initialState),
  getStartedReset: () => set(initialState),
});
