import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "..";
import { DEPTH_OPTIONS, LOAD_OPTIONS, WIDTH_OPTIONS } from "./options";

const getAvailableOptions = (
  options: typeof WIDTH_OPTIONS | typeof DEPTH_OPTIONS,
  conditions: {
    width?: number | null | undefined;
    load?: number | null | undefined;
  }
) => {
  return options
    .filter((option) => {
      const match = option.match.find((matchItem) => {
        if ("width" in matchItem && matchItem.width) {
          return (
            matchItem.width === conditions.width &&
            matchItem.load === conditions.load
          );
        }
        return matchItem.load === conditions.load;
      });
      return match;
    })
    .map(({ label, value }) => ({
      value,
      label,
    }));
};

const getNextValue = (
  available: { value: number }[],
  current: number,
  allOptions: typeof WIDTH_OPTIONS | typeof DEPTH_OPTIONS
) => {
  if (available.map(({ value }) => value).includes(current ?? 0)) {
    return current;
  }

  if (current && !allOptions.map(({ value }) => value).includes(current ?? 0)) {
    return current;
  }

  return available[0]?.value;
};

const useElevatorOptions = () => {
  const { watch, trigger, setValue, resetField } =
    useFormContext<z.infer<typeof formSchema>>();

  const [widthOptions, setWidthOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const [depthOptions, setDepthOptions] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      if ((name !== "load" && name !== "width") || !("width" in data)) return;
      const currentWidth = data.width;
      if (name === "load") {
        const availableWidth = getAvailableOptions(WIDTH_OPTIONS, {
          load: data.load,
        });
        setWidthOptions(availableWidth);
        const nextWidth = getNextValue(
          availableWidth,
          data.width ?? 0,
          WIDTH_OPTIONS
        );
        if (nextWidth) {
          setValue("width", nextWidth);
          trigger("width");
        }
      }

      const availableDepth = getAvailableOptions(DEPTH_OPTIONS, {
        width: currentWidth,
        load: data.load,
      });
      setDepthOptions(availableDepth);
      const nextDepth = getNextValue(
        availableDepth,
        data.depth ?? 0,
        DEPTH_OPTIONS
      );

      if (nextDepth) {
        setValue("depth", nextDepth);
        trigger("depth");
      }
    });

    return unsubscribe;
  }, [watch, trigger, setValue, resetField]);

  return {
    widthOptions,
    loadOptions: LOAD_OPTIONS,
    depthOptions,
  };
};

export default useElevatorOptions;
