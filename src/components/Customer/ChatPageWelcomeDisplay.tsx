import React from "react";
import { Button } from "../ui/button";
import { Clock, CreditCard, MapPin, Menu } from "lucide-react";

const ChatPageWelcomeDisplay = () => {
  return (
    <div>
      {/* Welcome Section */}
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3 text-balance">
          Welcome to Lisa&apos;s Cakes 👋
        </h1>
        <p className="text-gray-600 leading-relaxed">
          I&apos;m the AI assistant, providing answers to your inquiries about
          Lisa&apos;s Cakes.
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            className="h-auto py-4 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 justify-start gap-3 rounded-xl"
          >
            <Clock className="h-5 w-5" />
            <span className="text-sm">Opening hours</span>
          </Button>

          <Button
            variant="secondary"
            className="h-auto py-4 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 justify-start gap-3 rounded-xl"
          >
            <MapPin className="h-5 w-5" />
            <span className="text-sm">Location</span>
          </Button>

          <Button
            variant="secondary"
            className="h-auto py-4 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 justify-start gap-3 rounded-xl"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-sm">Payment methods</span>
          </Button>

          <Button
            variant="secondary"
            className="h-auto py-4 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 justify-start gap-3 rounded-xl"
          >
            <Menu className="h-5 w-5" />
            <span className="text-sm">Menu items</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPageWelcomeDisplay;
