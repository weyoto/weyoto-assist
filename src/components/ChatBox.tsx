"use client";
import React from "react";
import { Button } from "./ui/button";
import { Check, Send, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useBoundStore } from "@/store/store";
import { UploadedFile } from "@/types/BusinessDocsType";
import { addBusinessDetails } from "@/networking/endpoints/addBusinessDetails";
import { toast } from "sonner";
import Spinner from "./Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "@/networking/endpoints/uploadFile";
import { businessInquiry } from "@/networking/endpoints/businessInquiry";
import { ChatMessageType } from "@/store/slice/businessSetupSlice";

/* interface BusinessDoc {
  id: string;
  name: string;
  type: "pdf" | "docx" | "doc";
} */

const ChatBox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const chatText = useBoundStore((state) => state.chatText);
  const setChatText = useBoundStore((state) => state.setChatText);
  const setBusinessDetails = useBoundStore((state) => state.setBusinessDetails);
  const businessDetails = useBoundStore((state) => state.businessDetails);
  const tempBusinessDocs = useBoundStore((state) => state.tempBusinessDocs);
  const addChatMessage = useBoundStore((state) => state.addChatMessage);
  const setIsBusinessBotThinking = useBoundStore(
    (state) => state.setIsBusinessBotThinking
  );

  const setTempBusinessDocs = useBoundStore(
    (state) => state.setTempBusinessDocs
  );
  const setIsAddingBusinessDetails = useBoundStore(
    (state) => state.setIsAddingDetails
  );
  const isAddingDetails = useBoundStore((state) => state.isAddingDetails);

  /*  const [docs, setDocs] = useState<BusinessDoc[]>([
    { id: "1", name: "Lisa's Cakes pricing doc.pdf", type: "pdf" },
    { id: "2", name: "Lisa's Cakes contact details.docx", type: "docx" },
  ]); */

  //const [selectedFile, setSelectedFile] = useState(null);

  const isAddDetailsPage = pathname == "/business/add-details";

  /*   const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSendMessage = () => {
    console.log("Sending message:", chatText);
    setChatText("");
  }; */

  const handleAddBusinessDetails = async () => {
    try {
      if (!isAddDetailsPage) {
        const userMessage: ChatMessageType = {
          id: Date.now().toString(),
          text: chatText,
          isUser: true,
          timestamp: new Date(),
        };
        // Add user message to chat
        addChatMessage(userMessage);
        const currentMessage = chatText;
        setChatText("");
        setIsBusinessBotThinking(true);
        const result = await businessInquiry(currentMessage);

        // Add AI response to chat
        if (result?.reply) {
          const aiMessage: ChatMessageType = {
            id: (Date.now() + 1).toString(),
            text: result.reply,
            isUser: false,
            timestamp: new Date(),
          };
          addChatMessage(aiMessage);
          return;
        }
      }
      setIsAddingBusinessDetails(true);
      const result = await addBusinessDetails(chatText);

      if (!result) return;
      setBusinessDetails([
        ...businessDetails,
        {
          value: chatText,
          label: null,
          created_at: Date.now().toString(),
          id: Date.now().toString(),
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ["businessDetails"] });
      setChatText("");
    } catch {
      toast.error("An error occured");
    } finally {
      setIsAddingBusinessDetails(false);
      setIsBusinessBotThinking(false);
    }
  };

  const placeholder = isAddDetailsPage
    ? "Type something like: “We operate in Lagos"
    : "Ask your assistant anything";

  const SendIcon = isAddDetailsPage ? Check : Send;
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
  const handleUploadDocs = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf,.doc,.docx";

    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const fileArray = Array.from(files);

        // Show loading state by adding temp docs
        const tempDocs: UploadedFile[] = fileArray.map((file, index) => ({
          id: Date.now().toString() + index,
          filename: file.name,
          filetype: file.name.endsWith(".pdf") ? "pdf" : "docx",
          file: file,
          embedded_at: Date.now().toString() + index,
          //filename: string;Date.now().toString() + index,
          //filetype: "pdf" | "docx" | string; // Extend if needed
          // id: number | string;
          num_chunks: 16,
          parsed_at: Date.now().toString(),
          status: "embedded",
          uploaded_at: Date.now().toString(),
          //url: URL.createObjectURL(file),
        }));

        setTempBusinessDocs([...tempBusinessDocs, ...tempDocs]);

        // Upload files to server
        const uploadResult = await uploadFile(fileArray[0]);

        if (uploadResult) {
          // Clear temp docs and refresh the files list
          setTempBusinessDocs([]);
          // Invalidate queries to refresh the files from server
          queryClient.invalidateQueries({ queryKey: ["uploadedFiles"] });
        } else {
          // Remove temp docs if upload failed
          setTempBusinessDocs(tempBusinessDocs);
        }
      }
    };

    input.click();
  };

  //console.log({ tempBusinessDocs: tempBusinessDocs[0]?.file });

  return (
    <div className="fixed bottom-0 sm:left-[10.8125rem] sm:right-[10.8125rem]  left-5 right-5 bg-white overflow-y-auto ">
      {/*  <div className="flex gap-2 mb-[1rem]">
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
      </div> */}
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
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between p-4">
          <Button
            onClick={handleUploadDocs}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-black"
            variant="secondary"
          >
            <Upload className="w-4 h-4" />
            Upload docs
          </Button>
          {/*   <Input
            className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-black"
            type="file"
            onEnded={() => console.log("uploaded")}
            placeholder=" Upload docs"
          /> */}
          <Button
            onClick={() => router.push(`/business/add-details`)}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-black"
            variant="secondary"
          >
            Add business details
          </Button>
          <Button
            onClick={handleAddBusinessDetails}
            size="sm"
            className="bg-[#D9D9D9] p-[0.5rem] rounded-full text-gray-700 hover:bg-gray-200 "
            variant="secondary"
          >
            {isAddingDetails ? (
              <Spinner />
            ) : (
              <SendIcon size={16} className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
