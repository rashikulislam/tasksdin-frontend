/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Controller, Control } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type CustomDateInputProps = {
  name: string;
  control: Control<any>;
  placeholder?: string;
  rules?: any;
};

const CustomDateInput = ({
  name,
  control,
  placeholder = "তারিখ নির্বাচন করুন",
  rules,
}: CustomDateInputProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={`w-full flex items-center justify-between py-3 px-4 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white  ${
                  fieldState.error
                    ? "border-red-500 border-2"
                    : "border-gray-300 dark:border-gray-700 border"
                }`}
              >
                {field.value ? (
                  <span className="text-[16px]">
                    {format(field.value, "dd/MM/yyyy")}
                  </span>
                ) : (
                  <span className="text-gray-400 ">{placeholder}</span>
                )}

                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={8}
              className="w-auto p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
            >
              <DayPicker
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (date) {
                    field.onChange(date);
                    setOpen(false);
                  }
                }}
                className="w-full"
                modifiersClassNames={{
                  selected: "bg-blue-500 text-white rounded-full",
                  today: "border border-blue-500 rounded-full",
                  disabled: "text-gray-300",
                }}
              />
            </PopoverContent>
          </Popover>

          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default CustomDateInput;
