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
import React from "react";
import { cn } from "@/src/lib/utils";

export function ContactForm() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const { error: phone_distinct_error } = form.getFieldState("phone_distinct");
  const { error: phone_number_error } = form.getFieldState("phone_number");
  return (
    <div className="mt-4 space-y-2">
      <FormLabel
        className={cn(
          (phone_distinct_error || phone_number_error) && "text-destructive"
        )}
      >
        Contact
      </FormLabel>
      <div className="flex gap-2 ">
        <FormField
          control={form.control}
          name="phone_distinct"
          render={({ field }) => {
            return (
              <>
                <FormItem className="w-16">
                  <FormControl>
                    <Input
                      placeholder="phone distinct"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => {
            return (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="phone number"
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
      {(phone_distinct_error || phone_number_error) && (
        <FormMessage>
          {(phone_distinct_error || phone_number_error)?.message}
        </FormMessage>
      )}
    </div>
  );
}
