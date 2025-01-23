"use client";

import { Button } from "@/src/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contact_schema, ContactForm } from "./contact-form";
import BillForm, { bill_schema } from "./bill-form";
import { ELEVATOR_TYPE_ENUM } from "./contants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { SelectComponent } from "@/src/components/ReactSelect";

export const formSchema = z
  .object({
    company_name: z.string().trim().nonempty({
      message: "company name could not be empty",
    }),
    company_address: z.string().trim().nonempty({
      message: "company address could not be empty",
    }),

    product_type: z.nativeEnum(ELEVATOR_TYPE_ENUM),
  })
  .merge(contact_schema)
  .merge(bill_schema);

export function CreateElevatorForm({ res }: { res: number[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_address: "",
      phone_distinct: undefined,
      phone_number: undefined,
      is_same_as_company_address: false,
      bill_address: "",
      product_type: ELEVATOR_TYPE_ENUM.ESCALATOR,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="input your company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ContactForm />
        <FormField
          control={form.control}
          name="company_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Input placeholder="input your company address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <BillForm />{" "}
        <FormField
          control={form.control}
          name="product_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <SelectComponent
                createAble
                {...field}
                value={field.value}
                options={[
                  { value: "Full Time", label: "Full Time" },
                  { value: "Part Time", label: "Part Time" },
                  { value: "Intern", label: "Intern" },
                  { value: "Temporary", label: "Temporary" },
                  { value: "Contractor", label: "Contractor" },
                  { value: "Volunteer", label: "Volunteer" },
                  { value: "Freelance", label: "Freelance" },
                ]}
                onChange={field.onChange}
                placeholder="Select Skills"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="product_type"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Product Type </FormLabel>
                <Select
                  onValueChange={(v) => {
                    field.onChange(parseInt(v));
                  }}
                  defaultValue={field.value + ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {res.map((v) => (
                      <SelectItem value={v + ""} key={v}>
                        {v}
                      </SelectItem>
                    ))}
                    <SelectItem value={"custom"}>{"custom"}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
