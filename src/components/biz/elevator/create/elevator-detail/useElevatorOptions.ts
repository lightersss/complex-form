import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "..";

const WIDTH_OPTIONS = [
  {
    value: 1100,
    label: "1100",
    match: {
      load: [630],
    },
  },
  {
    value: 1200,
    label: "1200",
    match: {
      load: [1000, 1250],
    },
  },
  {
    value: 1600,
    label: "1600",
    match: {
      load: [1250],
    },
  },
];

const LOAD_OPTIONS = [
  { value: 630, label: "630" },
  { value: 1000, label: "1000" },
  { value: 1250, label: "1250" },
];

const DEPTH_OPTIONS = [
  {
    value: 1400,
    label: "1400",
    match: [
      {
        width: null,
        load: 630,
      },
      {
        width: 1600,
        load: 1250,
      },
    ],
  },
  {
    value: 2100,
    label: "2100",
    match: [
      {
        load: 1000,
        width: null,
      },
      {
        load: 1250,
        width: 1200,
      },
    ],
  },
];

const useElevatorOptions = () => {
  const { watch, trigger, setValue } =
    useFormContext<z.infer<typeof formSchema>>();

  const [widthOptions, setWidthOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const [depthOptions, setDepthOptions] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      if (name === "load") {
        //width
        const available_width = WIDTH_OPTIONS.filter((option) => {
          return option.match["load"].includes(+(data.load ?? 0));
        }).map(({ label, value }) => ({
          value,
          label,
        }));
        setWidthOptions(available_width);

        let currentWidth = data.width;
        if (
          !available_width.map(({ value }) => value).includes(currentWidth ?? 0)
        ) {
          setValue("width", available_width?.[0]?.value);
          currentWidth = available_width?.[0]?.value;
        }

        //depth
        const available_depth = DEPTH_OPTIONS.filter((option) => {
          const match = option.match.find((matchItem) => {
            if (matchItem.width) {
              return (
                matchItem.width === currentWidth && matchItem.load === data.load
              );
            }
            return matchItem.load === data.load;
          });
          return match;
        }).map(({ label, value }) => ({
          value,
          label,
        }));
        setDepthOptions(available_depth);
        let currentDepth = data.depth;
        if (
          !available_depth.map(({ value }) => value).includes(currentDepth ?? 0)
        ) {
          setValue("depth", available_depth?.[0]?.value);
        }
      }

      if (name === "width") {
        const currentWidth = data.width;
        const available_depth = DEPTH_OPTIONS.filter((option) => {
          const match = option.match.find((matchItem) => {
            if (matchItem.width) {
              return (
                matchItem.width === currentWidth && matchItem.load === data.load
              );
            }
            return matchItem.load === data.load;
          });
          return match;
        }).map(({ label, value }) => ({
          value,
          label,
        }));
        setDepthOptions(available_depth);
        let currentDepth = data.depth;
        if (
          !available_depth.map(({ value }) => value).includes(currentDepth ?? 0)
        ) {
          setValue("depth", available_depth?.[0]?.value);
        }
      }
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
