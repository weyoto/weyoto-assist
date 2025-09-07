import ChatBox from "@/components/ChatBox";
import React from "react";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex flex-col">
      <main className=" overflow-y-auto pb-48 sm:px-[10.8125rem]">
        {children}
      </main>

      <ChatBox />
    </section>
  );
};

export default BusinessLayout;
