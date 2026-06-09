"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldError, Control, Controller } from "react-hook-form";

type TCustomSelect = {
  name: string;
  label: string;
  required?: boolean;
  options: { label: string; value: string }[];
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

const CustomSelect = ({
  name,
  label,
  options,
  error,
  control,
  required,
}: TCustomSelect) => {
  return (
    <div>
      <h1 className="font-normal text-[16px]  flex items-center">
        {label}
        <span className="text-red-600">{required ? "*" : ""}</span>
      </h1>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex items-center gap-2 pt-1 lg:pt-2"
          >
            {options.map((option, idx) => {
              const id = `${name}-${idx}`;
              return (
                <label
                  key={option.value}
                  htmlFor={id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={id} />
                  {option.label}
                </label>
              );
            })}
          </RadioGroup>
        )}
      />

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
