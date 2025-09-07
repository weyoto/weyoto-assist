"use client";
import React from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { useParams, usePathname } from "next/navigation";
import { useBoundStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

import { startThread } from "@/networking/endpoints/customerChatEndpoints/startThread";
import { message } from "@/networking/endpoints/customerChatEndpoints/mesage";
import { toast } from "sonner";

/* interface BusinessDoc {
  id: string;
  name: string;
  type: "pdf" | "docx" | "doc";
} */

const CustomerChatBox = () => {
  const { businessId } = useParams<{ businessId: string }>();

  const threadId = useBoundStore((state) => state.threadId);
  const setThreadId = useBoundStore((state) => state.setThreadId);
  const pathname = usePathname();

  const uParams = useSearchParams();
  const chatText = useBoundStore((state) => state.chatText);
  const setChatText = useBoundStore((state) => state.setChatText);
  const addMessage = useBoundStore((state) => state.addMessage);
  const isMessageSending = useBoundStore((state) => state.isMessageSending);
  const setIsMessageSending = useBoundStore(
    (state) => state.setIsMessageSending
  );
  const idParams = uParams.get("u");

  const isAddDetailsPage = pathname == "/business/add-details";

  /*   const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }; */
  console.log({ threadId, idParams });
  const handleSendMessage = async () => {
    try {
      setIsMessageSending(true);

      addMessage({
        content: chatText,
        role: "user",
        timestamp: Date.now().toString(),
      });
      // const userMessage = chatText;
      setChatText(""); // Clear input immediately after adding to messages
      let currentThreadId = threadId;
      if (!currentThreadId && idParams) {
        const threadResult = await startThread(businessId);

        if (!threadResult?.thread_id) return;

        currentThreadId = threadResult.thread_id;
        setThreadId(currentThreadId);
      }
      if (currentThreadId && idParams) {
        const result = await message(currentThreadId, idParams, chatText);

        if (!result) return null;
        addMessage({
          content: result.reply,
          role: "ai",
          timestamp: Date.now().toString(),
        });
      }
    } catch {
      toast.error("something went wrong");
    } finally {
      setIsMessageSending(false);
    }
  };

  const placeholder = isAddDetailsPage
    ? "Type something like: “We operate in Lagos"
    : "Ask your assistant anything";

  // const SendIcon = isAddDetailsPage ? Check : Send;
  /*   const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // 'file' is the field name your backend expects

    try {
      const response = await fetch("/api/upload", {
        // Replace with your actual upload endpoint
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        // Handle successful upload (e.g., clear selected file, update UI)
      } else {
        alert("File upload failed.");
        // Handle upload error
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred during upload.");
    }
  };
 */
  console.log({ threadId });
  return (
    <div className=" overflow-y-auto bg-white ">
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
            placeholder={placeholder}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            className="flex-1 border-0"
          />
          <Button
            disabled={isMessageSending || !chatText.trim()}
            onClick={handleSendMessage}
            size="sm"
            className="bg-[#D9D9D9] p-[0.5rem] rounded-full text-gray-700 hover:bg-gray-200 "
            variant="secondary"
          >
            <Send size={16} className="w-6 h-6" />
          </Button>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between p-4">
          {/*   <Input
            className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-black"
            type="file"
            onEnded={() => console.log("uploaded")}
            placeholder=" Upload docs"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerChatBox;
