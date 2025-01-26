import { CreateableCombobox } from "@/src/components/creatable-combobox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import {
  ELEVATOR_TYPE_ENUM,
  ELEVATOR_TYPE_MAP,
} from "@/src/constants/elevator-type";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "..";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import useElevatorOptions from "./useElevatorOptions";

export const elevatorDetailSchema = z.object({
  load: z
    .number()
    .min(200, "Load must be at least 200")
    .max(10000, "Load must be at most 10000"),
  width: z
    .number()
    .min(1000, "Width must be at least 1000")
    .max(2000, "Width must be at most 2000"),
  depth: z
    .number()
    .min(1000, "Depth must be at least 1000")
    .max(2500, "Depth must be at most 2500"),
});

const ElevatorDetail = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const productType = form.watch("productType");

  const { widthOptions, loadOptions, depthOptions } = useElevatorOptions();

  return (
    <>
      <FormField
        control={form.control}
        name="productType"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(v) => field.onChange(+v)}
                  value={field.value ? field.value.toString() : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose the elevator type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(ELEVATOR_TYPE_MAP).map(([v, k]) => {
                      return (
                        <SelectItem value={v} key={v}>
                          {k}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {productType === ELEVATOR_TYPE_ENUM.PASSAGER_ELEVATOR && (
        <>
          <FormField
            control={form.control}
            name="load"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>load ( KG )</FormLabel>
                  <FormControl>
                    <div>
                      <CreateableCombobox
                        options={loadOptions}
                        popoverTriggerPlaceholder="Choose the elevator load"
                        inputProps={{
                          placeholder: "custom, 200 - 10000",
                          type: "number",
                          min: 200,
                          max: 10000,
                        }}
                        {...field}
                        onChange={(e) => {
                          field.onChange(+e);
                        }}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>width ( mm )</FormLabel>
                  <FormControl>
                    <div>
                      <CreateableCombobox
                        options={widthOptions}
                        popoverTriggerPlaceholder="Choose the elevator width"
                        inputProps={{
                          placeholder: "custom, 1000 - 2000",
                          type: "number",
                          min: 1000,
                          max: 2000,
                        }}
                        {...field}
                        onChange={(e) => {
                          field.onChange(+e);
                        }}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="depth"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>depth ( mm )</FormLabel>
                  <FormControl>
                    <div>
                      <CreateableCombobox
                        options={depthOptions}
                        popoverTriggerPlaceholder="Choose the elevator depth"
                        inputProps={{
                          placeholder: "custom, 1000 - 2500",
                          type: "number",
                          min: 1000,
                          max: 2500,
                        }}
                        {...field}
                        onChange={(e) => {
                          field.onChange(+e);
                        }}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      )}
    </>
  );
};

export default ElevatorDetail;
