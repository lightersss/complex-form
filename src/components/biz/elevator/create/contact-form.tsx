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
import { CountrySelect } from "@/src/components/country-select";
import { Country } from "react-phone-number-input";
import { COUNTRY_CODES } from "@/src/data/country-codes";

export function ContactForm() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const { error: phoneCodeError } = form.getFieldState("phoneCode");
  const { error: phoneNumberError } = form.getFieldState("phoneNumber");

  useEffect(() => {
    const initCountry = async () => {
      const response = await fetch("https://ipapi.co/json");
      try {
        const json = await response.json();
        form.setValue("phoneCode", json.country_code);
      } catch {
        form.setValue("phoneCode", "US");
        console.error("get country error");
      }
    };
    initCountry();
  }, []);

  return (
    <div className="mt-4 space-y-2">
      <FormLabel
        className={cn(
          (phoneNumberError || phoneCodeError) && "text-destructive"
        )}
      >
        Contact
      </FormLabel>
      <div className="flex gap-2 ">
        <FormField
          control={form.control}
          name="phoneCode"
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
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>
      {(phoneCodeError || phoneNumberError) && (
        <FormMessage>
          {(phoneCodeError || phoneNumberError)?.message}
        </FormMessage>
      )}
    </div>
  );
}
