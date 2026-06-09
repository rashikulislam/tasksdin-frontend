/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type TCustomTextArea = {
  name: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  errorMessage?: string;
  label?: string;
  row?: number;
  maxWords?: number;
};

const CustomTextArea = ({
  name,
  placeholder,
  register,
  required = false,
  error,
  errorMessage,
  label,
  row = 4,
  maxWords = 300,
}: TCustomTextArea) => {
  const [wordError, setWordError] = useState(false);
  const [length, setLength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (value.length > maxWords) {
      value = value.slice(0, maxWords); // trim extra letters
      setWordError(true);
    } else {
      setWordError(false);
    }

    setLength(value.length);
    e.target.value = value;
  };

  const remaining = Math.max(maxWords - length, 0);

  return (
    <div>
      {label && (
        <Label className="pb-1 lg:pb-0.5 flex items-center">
          <span>{label}</span>
          <span className="text-red-600">{required ? "*" : ""}</span>
        </Label>
      )}

      <div className="relative">
        <textarea
          rows={row}
          id={name}
          placeholder={placeholder}
          className={`w-full py-2.5 px-3 rounded-lg bg-gray-white border focus:outline-none transition-colors ${
            error || wordError
              ? "border-red-500 border-2"
              : "border-gray-200 focus:ring-2 ring-blue-500"
          }`}
          {...register(name, { required })}
          onChange={handleChange}
        />

        <p className="text-gray-500 text-sm pt-0.5 absolute right-3 bottom-3">
          সর্বাধিক {remaining} অক্ষর
        </p>
      </div>

      {error && <p className="text-red-500 text-sm pt-0.5">{errorMessage}</p>}
    </div>
  );
};

export default CustomTextArea;
