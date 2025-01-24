import { CreateableCombobox } from "@/src/components/creatable-combobox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import {
  ELEVATOR_TYPE,
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

export const elevator_detail_schema = z.object({
  product_type: z.number(),
  load: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  depth: z.number().optional(),
});

const ElevatorDetail = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const [product_type] = form.watch(["product_type"]);

  const { widthOptions, loadOptions, depthOptions } = useElevatorOptions();

  console.log(product_type);
  return (
    <>
      <FormField
        control={form.control}
        name="product_type"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>product_type</FormLabel>
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
      {
        <>
          <FormField
            control={form.control}
            name="load"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>load( KG )</FormLabel>
                  <FormControl>
                    <div>
                      <CreateableCombobox
                        options={loadOptions}
                        inputProps={{
                          placeholder: "custom",
                          type: "number",
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
                  <FormLabel>width(mm)</FormLabel>
                  <FormControl>
                    <div>
                      <CreateableCombobox
                        options={widthOptions}
                        inputProps={{
                          placeholder: "custom",
                          type: "number",
                        }}
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
                  <FormLabel>depth(mm)</FormLabel>
                  <FormControl>
                    <div>
                      <CreateableCombobox
                        options={depthOptions}
                        inputProps={{
                          placeholder: "custom",
                          type: "number",
                        }}
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
      }
    </>
  );
};

export default ElevatorDetail;
