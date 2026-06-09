/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from "react-hook-form";

type TCustomInput2 = {
  type: "text" | "email" | "number" | "password";
  name: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  errorMessage?: string;
};

const CustomInput2 = ({
  type,
  name,
  placeholder,
  register,
  required = false,
  error,
  errorMessage,
}: TCustomInput2) => {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          id={name}
          className={`w-full py-2.5 px-5  rounded-lg bg-gray-white border focus:outline-none  transition-colors  ${
            error
              ? "border-red-500 border-2"
              : "border-gray-200 focus:ring-2 ring-blue-500"
          } `}
          placeholder={placeholder}
          {...register(name, { required })}
        />
      </div>
      {error && <p className="text-red-500 text-sm pt-0.5">{errorMessage}</p>}
    </div>
  );
};

export default CustomInput2;
