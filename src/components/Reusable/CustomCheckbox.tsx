"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

type CustomCheckboxProps = {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string; // the text shown next to checkbox
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  label,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
