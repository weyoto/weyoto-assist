"use client";

//import { useState } from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { viewBusinessDetails } from "@/networking/endpoints/ViewBusinessDetails";
import { viewBusinessProfile } from "@/networking/endpoints/ViewBusinessProfile";
import { viewBusinessInquiries } from "@/networking/endpoints/ViewBuinessInquiries";
import { toast } from "sonner";
import { viewUser } from "@/networking/endpoints/viewUser";
import { viewFiles } from "@/networking/endpoints/viewFiles";
import { UploadedFile } from "@/types/BusinessDocsType";
import { useBoundStore } from "@/store/store";
import BusinessChatDisplay from "../Business/BusinessChatDisplay";

export default function BusinessDashboard() {
  const router = useRouter();
  const chatMessages = useBoundStore((state) => state.chatMessages);
  const goToProfile = () => {
    router.push("/profile");
  };

  const results = useQueries({
    queries: [
      { queryKey: ["businessProfile"], queryFn: viewBusinessProfile },
      { queryKey: ["businessInquiries"], queryFn: viewBusinessInquiries },
      { queryKey: ["businessDetails"], queryFn: viewBusinessDetails },
      { queryKey: ["userDetails"], queryFn: viewUser },
      { queryKey: ["uploadedFiles"], queryFn: viewFiles },
      // { queryKey: ["todos"], queryFn: fetchTodos },
    ],
  });

  const [
    businessProfile,
    businessInquiries,
    businessDetails,
    userDetails,
    uploadedFiles,
  ] = results;
  ///  console.log({ businessDetails: businessDetails.data });

  if (
    businessProfile.isLoading ||
    businessInquiries.isLoading ||
    businessDetails.isLoading
  )
    return "Loading...";

  if (
    businessProfile.error ||
    businessInquiries.error ||
    businessDetails.isError
  )
    return "An error has occurred: "; //+ error.message;

  // 📌 Function to copy /chat link to clipboard
  const handleCopyLink = async () => {
    try {
      const chatLink = `${window.location.origin}/chat/${businessProfile.data?.business.id}?u=${userDetails.data?.id}`;

      console.log({ chatLink });
      await navigator.clipboard.writeText(chatLink);
      toast.success("Link copied! 🎉"); // Optional toast notification
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    }
  };

  const serverFiles: UploadedFile[] = uploadedFiles.data?.[1]?.files || [];

  if (chatMessages?.length > 0) {
    return <BusinessChatDisplay />;
  }

  return (
    <div className="bg-white ">
      {/* <div className="bg-red-500 text-white text-center py-2 px-4">
        <p className="text-sm font-medium">
          Add business details to activate public link
        </p>
      </div> */}

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {/*   <Menu className="w-6 h-6 text-gray-600" /> */}
        <div onClick={goToProfile} className="flex items-center gap-2">
          <span className="text-lg font-medium text-gray-900">
            {businessProfile.data?.business.name}
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <Share onClick={handleCopyLink} className="w-6 h-6 text-gray-600" />
      </div>

      <div className="p-6 space-y-6 pb-32">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hi, {businessProfile.data?.business.name} 👋
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            I&apos;m your AI assistant, helping you answer your customer
            inquiries.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-[#EEEEEE] p-[1rem] rounded-2xl">
          <div className="space-y-2">
            <p className="text-gray-900 font-bold">
              You have {businessInquiries.data?.unanswered} answered inquiry
              this week!
            </p>
            <p className="text-gray-500 text-sm">
              • {businessInquiries.data?.count} inquiry at the moment
            </p>
          </div>
          {/* Customer Inquiries Section */}
          <div className="bg-[#E3E3E3] rounded-lg p-4 space-y-2 mt-[0.5rem]">
            <h3 className="font-bold text-gray-900">
              Customer inquiries appear here
            </h3>
          </div>{" "}
          <button className="p-[0.5rem] border border-black rounded-md mt-[0.625rem]">
            View All inquiries
          </button>
        </div>

        {/* Business Details Section */}
        <div className="space-y-4 bg-[#EEEEEE] p-[1rem] rounded-2xl">
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">
              You have {businessDetails.data?.details?.length} business details
              & {serverFiles.length} docs
            </p>
            <p className="text-gray-500 text-sm">
              To get smarter, I need to know more about your business.
            </p>
          </div>
          <Button
            onClick={() => router.push(`/business/add-details`)}
            className="p-[0.5rem] border border-black rounded-md mt-[0.625rem]"
            variant="secondary"
          >
            Add business details
          </Button>
        </div>

        {/* Action Buttons */}
      </div>
    </div>
  );
}
