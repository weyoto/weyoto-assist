import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomerChatBox from "./CustomerChatBox";
import { useBoundStore } from "@/store/store";
import ChatPageWelcomeDisplay from "./ChatPageWelcomeDisplay";
import TypingIndicator from "./TypingIndicator";

export default function ChatPage() {
  const messages = useBoundStore((state) => state.messages);
  const isMessageSending = useBoundStore((state) => state.isMessageSending);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-center pt-8 pb-6">
        <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
          Lisa&apos;s Cakes
        </div>
      </div>

      {messages ? (
        <div className="flex-1 px-6 pb-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gray-200 text-gray-800 rounded-br-md"
                      : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          {isMessageSending && <TypingIndicator />}
        </div>
      ) : (
        <ChatPageWelcomeDisplay />
      )}

      {/* Chat Avatar */}
      <div className="px-6 pb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/bakery-assistant-avatar.jpg" />
          <AvatarFallback className="bg-gray-300 text-gray-600">
            LC
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Spacer to push input to bottom */}
      <div className="flex-1" />

      <CustomerChatBox />
    </div>
  );
}
