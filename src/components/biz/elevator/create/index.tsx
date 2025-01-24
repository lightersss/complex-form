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
import { ContactForm } from "./contact-form";
import BillForm, { bill_schema } from "./bill-form";
import ElevatorDetail, {
  elevator_detail_schema,
} from "./elevator-detail/elevator-detail";

export const formSchema = z
  .object({
    company_name: z.string().trim().nonempty({
      message: "company name could not be empty",
    }),
    company_address: z.string().trim().nonempty({
      message: "company address could not be empty",
    }),
    phone_distinct: z.string({
      required_error: "选择区号",
    }),
    phone_number: z
      .number({
        required_error: "输入电话号码",
      })
      .int({ message: "电话号码需是整数" })
      .positive({ message: "电话号码需大于0" }),
  })
  .merge(bill_schema)
  .merge(elevator_detail_schema);

export function CreateElevatorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_address: "",
      phone_distinct: undefined,
      phone_number: undefined,
      bill_address: "",
      load: undefined,
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
        <BillForm />
        <ElevatorDetail />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
