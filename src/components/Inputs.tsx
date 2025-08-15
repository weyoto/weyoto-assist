import React from "react";
import { Input } from "@/components/ui/input";

const Inputs = ({ placeholder }: { placeholder: string }) => {
  return <Input className="h-[2.75rem]" placeholder={placeholder} />;
};

export default Inputs;
