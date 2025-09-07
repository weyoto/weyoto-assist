import Image from "next/image";
import React, { useState } from "react";
import Buttons from "../Buttons";
import Inputs from "../Inputs";
import { useBoundStore } from "@/store/store";
import { requestCode } from "@/networking/endpoints/requestCode";

const GetStarted = () => {
  const setIsPage = useBoundStore((state) => state.setIsPage);
  const loginEmail = useBoundStore((state) => state.email);
  const setLoginEmail = useBoundStore((state) => state.setEmail);
  const [isLoading, setIsLoading] = useState(false);
  const handlPress = async () => {
    try {
      setIsLoading(true);
      const result = await requestCode(loginEmail);

      if (!result) return;

      setIsPage("verifyEmail");
    } catch {
    } finally {
      setIsLoading(false);
    }

    //console.log({ result });
    //
  };

  return (
    <div className="p-6 sm:w-1/2 sm:mx-auto">
      <nav className="gap-[0.75rem] flex flex-col mb-6">
        <Image width={48} height={48} alt="logo" src={"/logo.svg"} />

        <h1 className="font-bold text-2xl">Sign in to get started</h1>
      </nav>

      <div className="gap-[0.5rem]">
        <p>Your email</p>
        <Inputs
          value={loginEmail}
          setValue={setLoginEmail}
          placeholder="Ex. ehigieedoma@yourmail.com"
        />
      </div>

      <div className="bottom-10 absolute right-6 left-6 sm:w-1/2 sm:mx-auto ">
        <p className="text-center">
          By proceeding you agree with our{" "}
          <span>Terms of use and Privacy policy</span>
        </p>
        <Buttons
          disabled={!loginEmail}
          handlePress={handlPress}
          text="Continue"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default GetStarted;
