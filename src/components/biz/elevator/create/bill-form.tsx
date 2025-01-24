import { Checkbox } from "@/src/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from ".";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";

export const bill_schema = z.object({
  bill_address: z.string().trim().nonempty({
    message: "bill address could not be empty",
  }),
  // use_company_address: z.boolean(),
});

export default function BillForm() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const [is_same, set_is_same] = useState(true);

  const { watch, setValue, trigger } = form;

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      if (name !== "company_address" || !is_same) return;
      setValue("bill_address", data.company_address ?? "");
      trigger("bill_address");
    });

    return unsubscribe;
  }, [watch, setValue, trigger, is_same]);

  return (
    <div className="mt-4">
      <FormField
        control={form.control}
        name="bill_address"
        render={({ field }) => {
          return (
            <>
              <FormItem>
                <FormLabel>Bill Address</FormLabel>
                <div className="flex gap-5 items-center">
                  <FormLabel className="text-sm text-foreground font-normal">
                    use company address
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={is_same}
                      onCheckedChange={(v) => {
                        if (v === true) {
                          form.setValue(
                            "bill_address",
                            form.getValues("company_address")
                          );
                        } else {
                          form.setValue("bill_address", "");
                        }
                        set_is_same(v === "indeterminate" ? false : v);
                      }}
                    />
                  </FormControl>
                </div>
                <FormControl className={cn(is_same && "hidden")}>
                  <Input placeholder="enter your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          );
        }}
      />
    </div>
  );
}
