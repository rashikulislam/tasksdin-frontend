import React, { useState } from "react";
import { Input } from "../ui/input";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Eye, EyeOff } from "lucide-react";

type TCustomInput = {
  name: string;
  placeholder: string;
  label?: string;
  required?: boolean;
  type?: string;
  errorMessage?: string;
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
};
const CustomInput = ({
  name,
  placeholder,
  required,
  type,
  label,
  error,
  errorMessage,
  register,
}: TCustomInput) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      {label && (
        <Label className="pb-1 lg:pb-0.5 flex items-center">
          {label}
          <span className="text-red-600">{required ? "*" : ""}</span>
        </Label>
      )}
      <div className="relative">
        <Input
          type={inputType}
          id={name}
          className={`w-full py-5 px-5 ${isPassword ? "pr-12" : ""} rounded-lg bg-gray-white border focus:outline-none  transition-colors  ${
            error
              ? "border-red-500 border-2"
              : "border-gray-200 focus:ring-2 ring-blue-500  placeholder:text-sm md:placeholder:text-[15px]"
          } `}
          placeholder={placeholder}
          {...register(name, { required })}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm pt-0.5">{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
