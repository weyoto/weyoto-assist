"use client";

import { useState } from "react";
import { Menu, Share, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-red-500 text-white text-center py-2 px-4">
        <p className="text-sm font-medium">
          Add business details to activate public link
        </p>
      </div>

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

      <div className="p-6 space-y-6 pb-32">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hi, Lisa&apos;s Cakes 👋
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
              You have 0 answered inquiry this week!
            </p>
            <p className="text-gray-500 text-sm">• 0 inquiry at the moment</p>
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
              You have 0 business details & docs
            </p>
            <p className="text-gray-500 text-sm">
              To get smarter, I need to know more about your business.
            </p>
          </div>
          <Button
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
