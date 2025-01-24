"use client";

import * as React from "react";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { SelectGroup } from "@radix-ui/react-select";

type CreateableComboboxProps = {
  options: { label: React.ReactNode; value: string | number }[];
  onChange: (v: string | number) => void;
  value: string | number;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  inputToValueFormat: (inputValue: string | number) => string | number;
};

export function CreateableSelect(props: CreateableComboboxProps) {
  const {
    options,
    inputProps = {},
    value,
    onChange,
    inputToValueFormat = (v) => v,
  } = props;

  const possibleOptions = options.find((option) => option.value === value);

  const [inputValue, setInputValue] = useState(possibleOptions ? "" : value);

  return (
    <Select
      value={value as string}
      onValueChange={(v: string) => {
        onChange(v);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="px-2">
        <Input
          {...inputProps}
          className={cn("my-1", inputProps.className)}
          value={inputValue}
          onChange={(e) =>
            setInputValue(inputToValueFormat(e.target.value) || "")
          }
        />
        <SelectGroup>
          {options.map(({ label, value }) => {
            return (
              <SelectItem
                //hack了有点
                role={undefined}
                tabIndex={undefined}
                key={value}
                value={value as string}
              >
                {label}
              </SelectItem>
            );
          })}
        </SelectGroup>
        {!options.map(({ value }) => value).includes(inputValue as string) &&
          !!inputValue && (
            <SelectItem value={inputValue as string}>{inputValue}</SelectItem>
          )}
      </SelectContent>
    </Select>
  );
}
