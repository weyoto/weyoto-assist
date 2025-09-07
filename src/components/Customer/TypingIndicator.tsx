"use client";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
