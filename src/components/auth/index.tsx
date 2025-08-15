"use client";
import React from "react";
import VerifyEmail from "./VerifyEmail";
import { useBoundStore } from "@/store/store";
import GetStarted from "./GetStarted";

const Index = () => {
  const isPage = useBoundStore((state) => state.isPage);
  if (isPage == "sign-in") {
    return <GetStarted />;
  }
  if (isPage == "verifyEmail") {
    return <VerifyEmail />;
  }
  return <GetStarted />;
};

export default Index;
