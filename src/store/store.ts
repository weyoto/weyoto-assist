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
import {
  BusinessSetupSliceAction,
  BusinessSetupSliceState,
  createBusinessSetupSlice,
} from "./slice/businessSetupSlice";

type StoreState = AuthSliceState &
  AddBusinessDetailsSliceState &
  BusinessSetupSliceState;

type StoreActions = AuthSliceAction &
  AddBusinessDetailsSliceAction &
  BusinessSetupSliceAction;

export const useBoundStore = create<StoreState & StoreActions>()((...a) => ({
  ...createAuthSlice(...a),
  ...createAddBusinessDetailsSliceState(...a),
  ...createBusinessSetupSlice(...a),
}));
