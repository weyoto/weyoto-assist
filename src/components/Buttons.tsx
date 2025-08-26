"use client";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const Buttons = ({
  text,
  handlePress,
  disabled,
  isLoading,
}: {
  text: string;
  handlePress: () => void;
  disabled: boolean;
  isLoading: boolean;
}) => {
  return (
    <Button
      onClick={handlePress}
      disabled={disabled || isLoading}
      className={`w-full h-[2.75rem] text-lg rounded-md ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : text}
    </Button>
  );
};

export default Buttons;
