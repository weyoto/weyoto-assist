import { useBoundStore } from "@/store/store";
import React from "react";
import TypingIndicator from "../Customer/TypingIndicator";

const BusinessChatDisplay = () => {
  const chatMessages = useBoundStore((state) => state.chatMessages);
  const isBusinessBotThinking = useBoundStore(
    (state) => state.isBusinessBotThinking
  );

  console.log({ chatMessages });
  return (
    <div className="max-h-96 overflow-y-auto p-4 space-y-4 border-t border-gray-100">
      {chatMessages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.isUser
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
        </div>
      ))}

      {isBusinessBotThinking && <TypingIndicator />}
    </div>
  );
};

export default BusinessChatDisplay;
