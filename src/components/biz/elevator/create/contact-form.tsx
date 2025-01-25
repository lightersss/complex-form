import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from ".";
import React, { useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { CountrySelect } from "@/src/components/phone-input";
import { Country } from "react-phone-number-input";
import { COUNTRY_CODES } from "@/src/data/country-codes";

export function ContactForm() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const { error: phoneDistinctError } = form.getFieldState("phoneDistinct");
  const { error: phoneNumberError } = form.getFieldState("phoneNumber");

  useEffect(() => {
    const initCountry = async () => {
      const response = await fetch("https://ipapi.co/json");
      try {
        const json = await response.json();
        form.setValue("phoneDistinct", json.country_code);
      } catch {
        form.setValue("phoneDistinct", "US");
        console.error("get country error");
      }
    };
    initCountry();
  }, []);

  return (
    <div className="mt-4 space-y-2">
      <FormLabel
        className={cn(
          (phoneNumberError || phoneDistinctError) && "text-destructive"
        )}
      >
        Contact
      </FormLabel>
      <div className="flex gap-2 ">
        <FormField
          control={form.control}
          name="phoneDistinct"
          render={({ field }) => {
            return (
              <>
                <FormItem className="w-16">
                  <FormControl>
                    <CountrySelect
                      value={field.value as Country}
                      options={COUNTRY_CODES}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => {
            return (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    value={field.value ?? ""}
                    type="number"
                    min={0}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>
      {(phoneDistinctError || phoneNumberError) && (
        <FormMessage>
          {(phoneDistinctError || phoneNumberError)?.message}
        </FormMessage>
      )}
    </div>
  );
}
