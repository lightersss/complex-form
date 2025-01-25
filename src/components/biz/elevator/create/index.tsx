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
import BillForm from "./bill-form";
import ElevatorDetail from "./elevator-detail/elevator-detail";
import { ContactForm } from "./contact-form";
import { ELEVATOR_TYPE_ENUM } from "@/src/constants/elevator-type";
import { createElevator } from "@/src/lib/actions/create-elevator";
import { formSchema } from "./form-schema";

export function CreateElevatorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      companyName: "",
      companyAddress: "",
      billAddress: "",
      productType: ELEVATOR_TYPE_ENUM.ESCALATOR,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createElevator(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ContactForm />
        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your company address" {...field} />
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
export { formSchema };
