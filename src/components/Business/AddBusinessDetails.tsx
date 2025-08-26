import React from "react";

const AddBusinessDetails = () => {
  return (
    <div className="bg-white gap-[5rem] p-6 ">
      {/* Welcome Section */}

      <div className="space-y-2 ">
        <h1 className="text-2xl font-semibold text-gray-900">
          Business details & docs
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          You’ve added 0 business details & 0 docs
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col gap-[5rem] mt-[0.875rem]">
        <div className="space-y-2">
          <p className="text-gray-900 font-bold">
            Business details{" "}
            <span className="text-gray-500 text-sm">Tap to edit</span>
          </p>
        </div>

        {/* Business Details Section */}
        <div>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Business docs</p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
    </div>
  );
};

export default AddBusinessDetails;
