import React from "react";
import { Button } from "./ui/button";

const Buttons = ({
  text,
  handlePress,
}: {
  text: string;
  handlePress: () => void;
}) => {
  return (
    <Button
      onClick={handlePress}
      className="w-full h-[2.75rem] text-lg rounded-md"
    >
      {text}
    </Button>
  );
};

export default Buttons;
