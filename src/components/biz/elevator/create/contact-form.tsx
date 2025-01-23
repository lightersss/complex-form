import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from ".";

export const contact_schema = z.object({
  phone_distinct: z.coerce.number().int().positive(),
  phone_number: z.coerce.number().int().positive(),
});

export function ContactForm() {
  const form = useFormContext<z.infer<typeof formSchema>>();
  return (
    <div>
      <FormLabel>Contact</FormLabel>
      <div className="flex mt-2 gap-2">
        <FormField
          control={form.control}
          name="phone_distinct"
          render={({ field }) => {
            return (
              <FormItem className="w-16">
                <FormControl>
                  <Input
                    placeholder="phone distinct"
                    {...field}
                    value={field.value ?? ""}
                    type="number"
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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
                    value={field.value ?? ""}
                    type="number"
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
      <FormDescription className="mt-2">
        This is your public display name.
      </FormDescription>
    </div>
  );
}
