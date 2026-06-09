import moment from "moment";
import "moment/locale/bn";

moment.locale("bn");

// Helper function to convert English digits to Bengali digits
const toBanglaNumber = (num: number): string => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((d) => banglaDigits[parseInt(d)])
    .join("");
};

interface DaysBetween {
  bn: string;
  en: number;
}

// Calculate days between start and end date, return both Bengali & English as object
export const calculateDaysBetween = (
  startDate: string,
  endDate?: string,
): DaysBetween => {
  if (!startDate) return { bn: toBanglaNumber(0), en: 0 };

  const start = moment(startDate, "YYYY-MM-DD");

  // If endDate is missing or same as startDate, count 1 day
  if (!endDate || moment(endDate, "YYYY-MM-DD").isSame(start, "day")) {
    return { bn: toBanglaNumber(1), en: 1 };
  }

  const end = moment(endDate, "YYYY-MM-DD");
  const daysDiff = end.diff(start, "days") + 1;
  const finalDays = daysDiff > 0 ? daysDiff : 1;

  return { bn: toBanglaNumber(finalDays), en: finalDays };
};
