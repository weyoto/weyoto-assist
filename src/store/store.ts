import { create } from "zustand";
import {
  AuthSliceAction,
  AuthSliceState,
  createAuthSlice,
} from "./slice/authSlice";
import {
  AddBusinessDetailsSliceAction,
  AddBusinessDetailsSliceState,
  createAddBusinessDetailsSliceState,
} from "./slice/addBusinessDetailsSlice";

type StoreState = AuthSliceState & AddBusinessDetailsSliceState;

type StoreActions = AuthSliceAction & AddBusinessDetailsSliceAction;
export const useBoundStore = create<StoreState & StoreActions>()((...a) => ({
  ...createAuthSlice(...a),
  ...createAddBusinessDetailsSliceState(...a),
}));
