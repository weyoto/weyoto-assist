import Image from "next/image";
import React from "react";
import Inputs from "../Inputs";
import Buttons from "../Buttons";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const handlePress = () => {
    router.push("/");
  };
  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center gap-[0.75rem] mb-[2rem]">
        <Image width={48} height={48} alt="logo" src={"/logo.svg"} />
        <h1 className="font-bold text-2xl">We emailed you a code</h1>
        <div className="text-center ">
          <p>Enter the verification code sent to:</p>
          <h4>ehigieedoma@youremail.com</h4>
        </div>
      </div>

      <div className="mb-6">
        <p>Enter six-digits code</p>
        <Inputs placeholder="******" />
      </div>

      <div className="gap-5 flex flex-col">
        <Buttons handlePress={handlePress} text="Verify" />
        <p className="text-center">
          Didnt get your code? <span>Send a new code</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
