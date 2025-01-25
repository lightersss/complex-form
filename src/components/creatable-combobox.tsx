"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { useState } from "react";
// import { isNil } from "../lib/isNil";
import { Input } from "./ui/input";

type CreateableComboboxProps = {
  options: { label: React.ReactNode; value: string | number }[];
  onChange: (v: string | number) => void;
  value: string | number;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  popoverTriggerPlaceholder?: React.ReactNode;
};

export function CreateableCombobox(props: CreateableComboboxProps) {
  const {
    options,
    inputProps = {},
    popoverTriggerPlaceholder = null,
    value,
    onChange,
  } = props;

  const [open, setOpen] = React.useState(false);

  const possibleOptions = options.find((option) => option.value == value);

  const [inputValue, setInputValue] = useState(possibleOptions ? "" : value);

  const labelInTrigger = possibleOptions
    ? possibleOptions.label
    : !value
    ? popoverTriggerPlaceholder
    : value;

  const isInputInOptions = options.find((option) => option.value == inputValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] justify-between"
        >
          {labelInTrigger}
          <ChevronsUpDown className="opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <div className="flex">
            <Input
              className="m-2 grow"
              {...inputProps}
              onInput={(e) => {
                setInputValue((e.target as HTMLInputElement).value);
              }}
            />
          </div>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value as string}
                  value={option.value as string}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    onChange(currentValue);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup
              heading="custom"
              className={!!isInputInOptions || !inputValue ? "!hidden" : ""}
            >
              <CommandItem
                value={inputValue as string}
                onSelect={(currentValue) => {
                  setOpen(false);
                  onChange(currentValue);
                }}
              >
                {inputValue}
                <Check
                  className={cn(
                    "ml-auto",
                    value === inputValue ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
