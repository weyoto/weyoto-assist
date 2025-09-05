"use client";

import { ArrowLeft, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BusinessProfile() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <Button
          onClick={goBack}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full">
          <span className="text-sm font-medium text-gray-700">
            Lisa&apos;s Cakes
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Business Profile
        </h1>

        {/* Business Name Section */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-medium text-gray-700">
            Your business name
          </h2>
          <div className="bg-gray-200 p-4 rounded-lg">
            <span className="text-gray-900 font-medium">Lisa&apos;s Cakes</span>
          </div>
          <Button
            variant="outline"
            className="text-gray-600 border-gray-300 bg-transparent"
          >
            Change business name
          </Button>
        </div>

        {/* Business Description Section */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-medium text-gray-700">
            Your business description
          </h2>
          <div className="bg-gray-200 p-4 rounded-lg">
            <span className="text-gray-900">
              We sell cakes & pastries to school canteens
            </span>
          </div>
          <Button
            variant="outline"
            className="text-gray-600 border-gray-300 bg-transparent"
          >
            Change business description
          </Button>
        </div>

        {/* Storage Usage Section */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            You&apos;ve used{" "}
            <span className="text-purple-600 font-medium">10%</span> of your
            file upload storage
          </p>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "10%" }}
              ></div>
            </div>
          </div>

          {/* Storage Details */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>5mb</span>
            <span>25mb</span>
          </div>

          {/* Upgrade Button */}
          <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg px-6 py-2">
            Upgrade your plan
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
}
