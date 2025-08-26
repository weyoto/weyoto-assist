"use client";

import { useState } from "react";
import { Menu, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
//import Inputs from "./Inputs";
import Buttons from "./Buttons";

export default function BusinessOnboarding() {
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  const handleSaveBusinessName = () => {
    // Handle saving business name
    console.log("Saving business name:", businessName);
  };

  const handleSaveBusinessDescription = () => {
    // Handle saving business description
    console.log("Saving business description:", businessDescription);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Menu className="w-6 h-6 text-gray-600" />
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-gray-900">
            Lisa&apos;s Cakes
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <Share className="w-6 h-6 text-gray-600" />
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hi, Welcome 👋
          </h1>
          <p className="text-gray-600 leading-relaxed">
            I&apos;m your AI assistant for helping you answer your customer
            inquiries.
          </p>
        </div>

        {/* Business Name Section */}
        <div className="space-y-4 bg-[#EEEEEE] rounded-3xl p-[1rem]">
          <div className="space-y-2">
            <h2 className="text-lg   font-bold">
              Let&apos;s get started, what&apos;s the name of your business?
            </h2>
            <p className="text-sm text-gray-500">
              • This is needed to register your business
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-white h-[2.75rem]"
            />

            {/* <Inputs placeholder="Enter business name" /> */}
            {/*  <Button
              onClick={handleSaveBusinessName}
              className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              variant="secondary"
            >
              Save business name
            </Button> */}
            <div className="w-1/2">
              <Buttons
                handlePress={handleSaveBusinessName}
                disabled
                isLoading={false}
                text="Save business name"
              />
            </div>
          </div>
        </div>

        {/* Business Description Section */}
        <div className="space-y-4 bg-[#EEEEEE] rounded-3xl p-[1rem]">
          <div className="space-y-2">
            <h2 className="text-base   font-bold">
              Please provide a short description of what your business does.
            </h2>
            <p className="text-sm text-gray-500">
              • This helps me respond better
            </p>
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder="Describe your business..."
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              className="w-full min-h-[100px] resize-none"
            />
            <Button
              onClick={handleSaveBusinessDescription}
              //  className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              //variant="secondary"
            >
              Save business description
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          This AI assistant is dedicated entry for your business using the name
          you provided.
        </p>
      </div>
    </div>
  );
}
