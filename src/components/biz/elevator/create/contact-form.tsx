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

export const phoneSchema = z.object({
  distinct: z.coerce.number().int().positive(),
  phone_number: z.coerce.number().int().positive(),
});

export function ContactForm() {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="phone"
      render={() => {
        return (
          <div>
            <FormLabel>Contact</FormLabel>
            <div className="flex mt-2 gap-2">
              <FormField
                control={form.control}
                name="phone.distinct"
                render={({ field }) => {
                  return (
                    <FormItem className="w-16">
                      <FormControl>
                        <Input
                          placeholder="shadcn"
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
                name="phone.phone_number"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
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
      }}
    />
  );
}
