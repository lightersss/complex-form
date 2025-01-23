import { Checkbox } from "@/src/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from ".";
import { Input } from "@/src/components/ui/input";

export const bill_schema = z.object({
  is_same_as_company_address: z.boolean(),
  bill_address: z.string().trim().nonempty({
    message: "bill address could not be empty",
  }),
});

export default function BillForm() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const is_same_as_company_address = form.watch("is_same_as_company_address");
  const company_address = form.watch("company_address");

  return (
    <div className="mt-4">
      <FormLabel>Bill Address</FormLabel>
      <FormField
        control={form.control}
        name="is_same_as_company_address"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-4 mt-2 mb-4">
              <FormLabel className="font-normal">use company address</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => {
                    if (v) {
                      form.setValue("bill_address", company_address);
                    } else {
                      form.setValue("bill_address", "");
                    }
                    field.onChange(v);
                  }}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bill_address"
        render={({ field }) => (
          <FormItem hidden={is_same_as_company_address}>
            <FormControl>
              <Input placeholder="enter your company name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
