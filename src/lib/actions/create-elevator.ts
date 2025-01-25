"use server";

import { formSchema } from "@/src/components/biz/elevator/create/form-schema";
import { z } from "zod";

export const createElevator = async (
  elevator_dao: z.infer<typeof formSchema>
) => {
  console.log("server:", elevator_dao);
};
