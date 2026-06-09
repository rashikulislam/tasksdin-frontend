"use client";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FaSpinner } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  error?: FieldError;
  isLoading?: boolean;
}

export const CustomDropdown = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select option",
  options,
  required,
  error,
  errorMessage,
  isLoading = false,
}: CustomDropdownProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: errorMessage }}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          {label && (
            <Label className="pb-1 lg:pb-0.5 flex items-center">
              {label}
              <span className="text-red-600">{required ? "*" : ""}</span>
            </Label>
          )}

          <Select value={field.value || ""} onValueChange={field.onChange}>
            <SelectTrigger
              className={`bg-white text-gray-900 cursor-pointer border border-gray-300 rounded-lg ${
                error ? "border-red-600 border-2" : ""
              }`}
            >
              <SelectValue
                placeholder={
                  <span className="text-gray-400">{placeholder}</span>
                }
              />
            </SelectTrigger>

            <SelectContent className="bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300 z-[9999]">
              {isLoading ? (
                <div className="flex items-center justify-center py-5">
                  <FaSpinner className="animate-spin" size={24} />
                </div>
              ) : (
                <div>
                  {options.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-pointer"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </div>
              )}
            </SelectContent>
          </Select>

          {fieldState.error && (
            <p className="text-red-600 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};
