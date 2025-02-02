import { ELEVATOR_TYPE_ENUM } from "@/src/constants/elevator-type";
import { getCountryCallingCode, Country } from "react-phone-number-input";
import { z } from "zod";
import { billSchema } from "./bill-form";
import { elevatorDetailSchema } from "./elevator-detail/elevator-detail";

const basicSchema = z
  .object({
    companyName: z.string().trim().nonempty({}),
    companyAddress: z.string().trim().nonempty({}),
    phoneCode: z
      .string()
      .transform((v) => `+${getCountryCallingCode(v as Country)}`),
    phoneNumber: z
      .string()
      .min(1)
      .regex(/^\d+$/, { message: "Only accept numers" }),
  })
  .merge(billSchema);

export const formSchema = z.discriminatedUnion("productType", [
  basicSchema.merge(elevatorDetailSchema).merge(
    z.object({
      productType: z.literal(ELEVATOR_TYPE_ENUM.PASSAGER_ELEVATOR, {}),
    })
  ),
  basicSchema.merge(
    z.object({
      productType: z.literal(ELEVATOR_TYPE_ENUM.MOVING_WALKWAY, {}),
    })
  ),
  basicSchema.merge(
    z.object({
      productType: z.literal(ELEVATOR_TYPE_ENUM.ESCALATOR, {}),
    })
  ),
]);
