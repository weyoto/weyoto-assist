import ChatBox from "@/components/ChatBox";
import React from "react";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <main>{children}</main>
      <div className=" overflow-y-auto">
        <ChatBox />
      </div>
    </section>
  );
};

export default BusinessLayout;
