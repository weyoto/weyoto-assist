import Image from "next/image";
import React from "react";
import Buttons from "../Buttons";
import Inputs from "../Inputs";
import { useBoundStore } from "@/store/store";

const GetStarted = () => {
  const setIsPage = useBoundStore((state) => state.setIsPage);
  const handlPress = () => {
    setIsPage("verifyEmail");
  };
  return (
    <div className="p-6">
      <nav className="gap-[0.75rem] flex flex-col mb-6">
        <Image width={48} height={48} alt="logo" src={"/logo.svg"} />

        <h1 className="font-bold text-2xl">Sign in to get started</h1>
      </nav>

      <div className="gap-[0.5rem]">
        <p>Your email</p>
        <Inputs placeholder="Ex. ehigieedoma@yourmail.com" />
      </div>

      <div className="bottom-10 absolute right-6 left-6 ">
        <p className="text-center">
          By proceeding you agree with our{" "}
          <span>Terms of use and Privacy policy</span>
        </p>
        <Buttons handlePress={handlPress} text="Continue" />
      </div>
    </div>
  );
};

export default GetStarted;
