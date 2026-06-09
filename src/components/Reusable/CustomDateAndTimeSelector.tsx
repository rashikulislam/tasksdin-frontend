/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getMinTime } from "@/utils/getMinTime";

interface CustomDateTimePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any;
  showTime?: boolean;
  required?: boolean;
}

export const CustomDateAndTimeSelector = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select date & time",
  rules,
  showTime = false,
  required,
}: CustomDateTimePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col w-full">
          {label && (
            <Label className="pb-1 lg:pb-0.5 flex items-center">
              {label}
              <span className="text-red-600">{required ? "*" : ""}</span>
            </Label>
          )}

          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: any) => field.onChange(date)}
            showTimeSelect={showTime}
            timeIntervals={15}
            timeFormat="hh:mm aa"
            timeCaption="Time"
            dateFormat={showTime ? "dd/MM/yyyy hh:mm aa" : "dd/MM/yyyy"}
            minDate={new Date()}
            minTime={getMinTime(field.value)}
            maxTime={(() => {
              const end = new Date();
              end.setHours(19, 0, 0, 0);
              return end;
            })()}
            placeholderText={placeholder}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring transition-colors duration-200  ${
              fieldState.error
                ? "border-red-500 border-2 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300 "
            }`}
            popperClassName="z-50"
            customInput={
              <button
                type="button"
                className={`w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border rounded-lg transition-colors duration-200 ${
                  fieldState.error
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300 "
                }`}
              >
                <span className={!field.value ? "text-gray-400" : ""}>
                  {field.value
                    ? showTime
                      ? new Date(field.value).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : new Date(field.value).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                    : placeholder}
                </span>

                <Calendar className="ml-2 h-5 w-5 text-gray-400" />
              </button>
            }
          />

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
