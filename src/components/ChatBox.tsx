"use client";
import React from "react";
import { Button } from "./ui/button";
import { Check, Send, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useBoundStore } from "@/store/store";
import { BusinessDoc } from "@/types/BusinessDocsType";

/* interface BusinessDoc {
  id: string;
  name: string;
  type: "pdf" | "docx" | "doc";
} */

const ChatBox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const chatText = useBoundStore((state) => state.chatText);
  const setChatText = useBoundStore((state) => state.setChatText);
  const setIsBusinessDetails = useBoundStore(
    (state) => state.setBusinessDetails
  );
  const tempBusinessDocs = useBoundStore((state) => state.tempBusinessDocs);

  const setTempBusinessDocs = useBoundStore(
    (state) => state.setTempBusinessDocs
  );

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

  const addBusinessDetails = () => {
    setIsBusinessDetails(chatText);
    setChatText("");
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
  const handleUploadDocs = () => {
    // Simulate file upload
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf,.doc,.docx";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach((file, index) => {
          const url = URL.createObjectURL(file);
          const newDoc: BusinessDoc = {
            id: Date.now().toString() + index,
            name: file.name,
            type: file.name.endsWith(".pdf") ? "pdf" : "docx",
            file: file,
            url: url,
          };
          setTempBusinessDocs([...tempBusinessDocs, newDoc]);
        });
      }
    };
    input.click();
  };

  console.log({ tempBusinessDocs });

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
            onClick={addBusinessDetails}
            size="sm"
            className="bg-[#D9D9D9] p-[0.5rem] rounded-full text-gray-700 hover:bg-gray-200 "
            variant="secondary"
          >
            <SendIcon size={16} className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
