import ChatBox from "@/components/ChatBox";
import React from "react";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <main>{children}</main>
      <div>
        <ChatBox />
      </div>
    </section>
  );
};

export default BusinessLayout;
