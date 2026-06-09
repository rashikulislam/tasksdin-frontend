import { Moon, Sun, Sunset } from "lucide-react";

export type TCookingTimeValue =
  | "morning"
  | "noon"
  | "night"
  | "morning_noon"
  | "morning_night"
  | "noon_night"
  | "all";

export type TFormValues = {
  people: number;
  timesPerDay: "1" | "2" | "3";
  cookingTime: TCookingTimeValue;
  cookingTimeDetail?: Record<"morning" | "noon" | "night", string>;
  morningCookingTime: string;
  noonCookingTime: string;
  nightCookingTime: string;
  clothWashing: string;
  clothWashingAmount: number;
  cleaningToilet: string;
  cleaningToiletAmount: number;
  address: string;
  childAge: number;
  totalBill: number;
  childcareHour: number;
  childCareAmount: number;
  startingDate: Date;
  paymentDate: string;
  consumerName: string;
  consumerPhoneNumber: string;
  freeTrailDate: Date;
  trailTime: string;
};

// 👇 cooking frequency options
export const cookingPerDayOptions = [
  { label: "১ বার", value: "1" },
  { label: "২ বার", value: "2" },
  { label: "৩ বার", value: "3" },
];

export const cookingOptions: Record<
  "1" | "2" | "3",
  { label: string; value: TCookingTimeValue }[]
> = {
  "1": [
    { label: "সকাল", value: "morning" },
    { label: "দুপুর", value: "noon" },
    { label: "রাত", value: "night" },
  ],
  "2": [
    { label: "সকাল ও দুপুর", value: "morning_noon" },
    { label: "সকাল ও রাত", value: "morning_night" },
    { label: "দুপুর ও রাত", value: "noon_night" },
  ],
  "3": [{ label: "সকাল, দুপুর ও রাত", value: "all" }],
};

const morningTimeOptions = [
  "৭:০০ AM",
  "৭:৩০ AM",
  "৮:০০ AM",
  "৮:৩০ AM",
  "৯:০০ AM",
  "৯:৩০ AM",
].map((t) => ({ label: t, value: t }));

const noonTimeOptions = [
  "১০:০০ AM",
  "১০:৩০ AM",
  "১১:০০ AM",
  "১১:৩০ AM",
  "১২:০০ PM",
  "১২:৩০ PM",
  "১:০০ PM",
].map((t) => ({ label: t, value: t }));

const nightTimeOptions = [
  "৪:০০ PM",
  "৫:০০ PM",
  "৬:০০ PM",
  "৭:০০ PM",
  "৮:০০ PM",
].map((t) => ({ label: t, value: t }));

export const timeOptionsMap = {
  morning: morningTimeOptions,
  noon: noonTimeOptions,
  night: nightTimeOptions,
};

export const getSelectedTimes = (cookingTimes: TCookingTimeValue) => {
  if (cookingTimes === "all") return ["morning", "noon", "night"] as const;
  return cookingTimes.split("_") as Array<"morning" | "noon" | "night">;
};

// STEP 2
type ServiceOption = {
  key: string; // state key
  label: string; // checkbox label
  type: "radio" | "select"; // input type when enabled
  options?: { label: string; value: string }[]; // for radio/select
  calculation?: (value: string) => string; // dynamic price info
  multiple?: boolean; // if multiple dropdowns (like cooking)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showIf?: (context: any) => boolean; // conditionally show
};

export const otherServices: ServiceOption[] = [
  {
    key: "clothesWashing",
    label: "কাপড় ধোয়া লাগবে?",
    type: "radio",
    options: [
      { label: "১ বার", value: "1" },
      { label: "২ বার", value: "2" },
      { label: "৪ বার", value: "4" },
    ],
    calculation: (v) => (v === "2" ? "৳৩৫০/জন যোগ হবে" : "৳৫০০/জন যোগ হবে"),
  },
  {
    key: "toiletCleaning",
    label: "টয়লেট পরিষ্কার লাগবে?",
    type: "radio",
    options: [
      { label: "২ বার", value: "2" },
      { label: "৪ বার", value: "4" },
    ],
    calculation: (v) => (v === "2" ? "৳৫০০ যোগ হবে" : "৳১,০০০ যোগ হবে"),
  },
  {
    key: "childCare",
    label: "শিশু যত্ন লাগবে?",
    type: "select",
    multiple: false,
    options: Array.from({ length: 10 }, (_, i) => ({
      label: `${i + 1} বছর`,
      value: `${i + 1}`,
    })),
    showIf: (context) => context.familyType === "family",
    calculation: (hours: string) =>
      `৳${parseInt(hours) * 500} যোগ হবে (৳৫০০/ঘণ্টা)`,
  },
  {
    key: "elderlyCare",
    label: "বয়স্ক সেবা লাগবে?",
    type: "radio",
    showIf: (context) => context.familyType === "family",
  },
];

export const washingFrequencyOptions = [
  { label: "১ বার", value: "1" },
  { label: "২ বার", value: "2" },
  { label: "৩ বার", value: "3" },
  { label: "৪ বার", value: "4" },
];

export const childAgeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => ({
  label: `${age} বছর`,
  value: age.toString(),
}));

export const childCareHoursOptions = [1, 2, 3, 4, 5, 6].map((h) => ({
  label: `${h} ঘণ্টা`,
  value: h.toString(),
}));

export const monthDateOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((date) => ({
  label: `প্রতি মাসের ${date} তারিখ`,
  value: date.toString(),
}));

export const trialOptions = [
  {
    value: "morning",
    label: "সকাল",
    icon: Sun,
  },
  {
    value: "afternoon",
    label: "দুপুর",
    icon: Sunset,
  },
  {
    value: "night",
    label: "রাত",
    icon: Moon,
  },
];
