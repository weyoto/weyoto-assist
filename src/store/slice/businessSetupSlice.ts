//import { BusinessDoc } from "@/types/BusinessDocsType";
import { StateCreator } from "zustand";

export interface ChatMessageType {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export type BusinessSetupSliceState = {
  setupName: string;
  setupDescription: string;
  isSettingUp: boolean;

  chatMessages: ChatMessageType[];
  isBusinessBotThinking: boolean;
};

export type BusinessSetupSliceAction = {
  setSetupName: (setupName: string) => void;
  setSetupDescription: (setupDescription: string) => void;
  setIsSettingUp: (isSettingUp: boolean) => void;
  setChatMessages: (chatMessages: ChatMessageType[]) => void;
  addChatMessage: (msg: ChatMessageType) => void;
  setIsBusinessBotThinking: (isBusinessBotThinking: boolean) => void;
};

const initialState: BusinessSetupSliceState = {
  setupName: "",
  setupDescription: "",
  isSettingUp: false,
  chatMessages: [],
  isBusinessBotThinking: false,
};

export const createBusinessSetupSlice: StateCreator<
  BusinessSetupSliceState & BusinessSetupSliceAction
> = (set) => ({
  ...initialState,
  setSetupName: (setupName) => set({ setupName }),
  setSetupDescription: (setupDescription) => set({ setupDescription }),
  setIsSettingUp: (isSettingUp) => set({ isSettingUp }),
  setChatMessages: (chatMessages) => set({ chatMessages }),
  addChatMessage: (msg) =>
    set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  setIsBusinessBotThinking: (isBusinessBotThinking) =>
    set({ isBusinessBotThinking }),
});
