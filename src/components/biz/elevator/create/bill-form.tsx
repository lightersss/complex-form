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

export const billSchema = z.object({
  billAddress: z.string().trim().nonempty({}),
});

export default function BillForm() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const [isSame, setIsSame] = useState(true);

  const { watch, setValue, trigger } = form;

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      if (name !== "companyAddress" || !isSame) return;
      setValue("billAddress", data.companyAddress ?? "");
      trigger("billAddress");
    });

    return unsubscribe;
  }, [watch, setValue, trigger, isSame]);

  return (
    <div className="mt-4">
      <FormField
        control={form.control}
        name="billAddress"
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
                      checked={isSame}
                      onCheckedChange={(v) => {
                        if (v === true) {
                          form.setValue(
                            "billAddress",
                            form.getValues("companyAddress")
                          );
                        } else {
                          form.setValue("billAddress", "");
                        }
                        setIsSame(v === "indeterminate" ? false : v);
                      }}
                    />
                  </FormControl>
                </div>
                <FormControl>
                  <Input
                    placeholder={
                      isSame
                        ? "This will changed with company address"
                        : "Enter your bill address"
                    }
                    {...field}
                    disabled={isSame}
                  />
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
