export const WIDTH_OPTIONS = [
  {
    value: 1100,
    label: "1100",
    match: [
      {
        load: 630,
      },
    ],
  },
  {
    value: 1200,
    label: "1200",
    match: [
      {
        load: 1000,
      },
      {
        load: 1250,
      },
    ],
  },
  {
    value: 1600,
    label: "1600",
    match: [
      {
        load: 1250,
      },
    ],
  },
];

export const LOAD_OPTIONS = [
  { value: 630, label: "630" },
  { value: 1000, label: "1000" },
  { value: 1250, label: "1250" },
];

export const DEPTH_OPTIONS = [
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
