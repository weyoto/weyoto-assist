import React from "react";
import { Button } from "./ui/button";

const Buttons = ({ text }: { text: string }) => {
  return (
    <Button className="w-full h-[2.75rem] text-lg rounded-md">{text}</Button>
  );
};

export default Buttons;
