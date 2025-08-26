import React from "react";
import { Input } from "@/components/ui/input";

const Inputs = ({
  placeholder,
  value,
  setValue,
}: {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-[2.75rem]"
      placeholder={placeholder}
    />
  );
};

export default Inputs;
