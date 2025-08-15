import { create } from "zustand";
import {
  AuthSliceAction,
  AuthSliceState,
  createAuthSlice,
} from "./slice/authSlice";

type StoreState = AuthSliceState;

type StoreActions = AuthSliceAction;
export const useBoundStore = create<StoreState & StoreActions>()((...a) => ({
  ...createAuthSlice(...a),
}));
