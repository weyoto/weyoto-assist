import { MessagesType } from "@/types/MessagesType";
import { StateCreator } from "zustand";

export type CustomerChatSliceState = {
  customerChatText: string;
  threadId: string | null;
  isMessageSending: boolean;
  isBotReplying: boolean;
  messages: MessagesType | null;
};

export type CustomerChatSliceAction = {
  setCustomerChatText: (chatText: string) => void;
  setThreadId: (value: string | null) => void;
  setIsMessageSending: (value: boolean) => void;
  setIsBotReplying: (value: boolean) => void;
  addMessage: (message: {
    content: string;
    role: "user" | "ai";
    timestamp: string;
  }) => void;
  setMessages: (messages: MessagesType) => void;
};

const initialState: CustomerChatSliceState = {
  customerChatText: "",
  threadId: null,
  isMessageSending: false,
  isBotReplying: false,
  messages: null,
};

export const createCustomerChatSlice: StateCreator<
  CustomerChatSliceState & CustomerChatSliceAction
> = (set) => ({
  ...initialState,

  setCustomerChatText: (customerChatText) => set({ customerChatText }),
  setThreadId: (threadId) => set({ threadId }),
  setIsMessageSending: (isMessageSending) => set({ isMessageSending }),
  setIsBotReplying: (isBotReplying) => set({ isBotReplying }),
  addMessage: (message) =>
    set((state) => {
      // If there are no messages yet, initialize a new structure
      if (!state.messages) {
        return {
          messages: {
            created_at: new Date().toISOString(),
            lead_email: null,
            thread_id: state.threadId || "",
            title: "",
            messages: [message],
          },
        };
      }

      // Otherwise, append the new message
      return {
        messages: {
          ...state.messages,
          messages: [...state.messages.messages, message],
        },
      };
    }),
  setMessages: (messages) => set({ messages }),

  //connectSliceReset: () => set(initialState),
  /*  setEmail: (email) => set({ email }),

  setIsPage: (isPage) => set({ isPage }),

  setCode: (code) => set({ code }),
  verifyCodeSliceReset: () => set(initialState),
  getStartedReset: () => set(initialState), */
});
