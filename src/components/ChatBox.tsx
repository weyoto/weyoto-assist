"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Send, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const ChatBox = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-0 left-5 right-5 bg-white ">
      <div className="flex gap-2 mb-[1rem]">
        <Button
          className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
          variant="secondary"
        >
          Audit my business plan
        </Button>
        <Button
          className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
          variant="secondary"
        >
          Write content for me
        </Button>
        <Button
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm px-3"
          variant="secondary"
        >
          Wri...
        </Button>
      </div>
      {/* Message Input */}
      <div className="p-4 border-b border-gray-100 bg-[#F5F5F5] border-t border-gray-100 rounded-2xl">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Ask your assistant anything"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-0"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between p-4">
          <Button
            className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-black"
            variant="secondary"
          >
            <Upload className="w-4 h-4" />
            Upload docs
          </Button>
          <Button
            onClick={() => router.push(`/business/add-details`)}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-black"
            variant="secondary"
          >
            Add business details
          </Button>
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-[#D9D9D9] p-[0.5rem] rounded-full text-gray-700 hover:bg-gray-200 "
            variant="secondary"
          >
            <Send size={16} className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
