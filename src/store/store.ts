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
import {
  createCustomerChatSlice,
  CustomerChatSliceAction,
  CustomerChatSliceState,
} from "./slice/customerChatSlice";

type StoreState = AuthSliceState &
  AddBusinessDetailsSliceState &
  BusinessSetupSliceState &
  CustomerChatSliceState;

type StoreActions = AuthSliceAction &
  AddBusinessDetailsSliceAction &
  BusinessSetupSliceAction &
  CustomerChatSliceAction;

export const useBoundStore = create<StoreState & StoreActions>()((...a) => ({
  ...createAuthSlice(...a),
  ...createAddBusinessDetailsSliceState(...a),
  ...createBusinessSetupSlice(...a),
  ...createCustomerChatSlice(...a),
}));
