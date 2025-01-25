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

const getCurrentValue = (available: { value: number }[], current: number) => {
  if (!available.map(({ value }) => value).includes(current ?? 0)) {
    return available?.[0]?.value;
  }
  return current;
};

const useElevatorOptions = () => {
  const { watch, trigger, setValue } =
    useFormContext<z.infer<typeof formSchema>>();

  const [widthOptions, setWidthOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const [depthOptions, setDepthOptions] = useState<
    { label: string; value: number }[]
  >([]);

  // 通用的获取可用选项函数

  // 通用的更新值函数

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      if ((name !== "load" && name !== "width") || !("width" in data)) return;
      let currentWidth = data.width;
      if (name === "load") {
        const availableWidth = getAvailableOptions(WIDTH_OPTIONS, {
          load: data.load,
        });
        setWidthOptions(availableWidth);
        currentWidth = getCurrentValue(availableWidth, data.width ?? 0);
        setValue("width", currentWidth);
        trigger("width");
      }

      //width变化
      const availableDepth = getAvailableOptions(DEPTH_OPTIONS, {
        width: currentWidth,
        load: data.load,
      });
      setDepthOptions(availableDepth);
      const currentDepth = getCurrentValue(availableDepth, data.depth ?? 0);
      setValue("depth", currentDepth);
      trigger("depth");
    });

    return unsubscribe;
  }, [watch, trigger, setValue]);

  return {
    widthOptions,
    loadOptions: LOAD_OPTIONS,
    depthOptions,
  };
};

export default useElevatorOptions;
