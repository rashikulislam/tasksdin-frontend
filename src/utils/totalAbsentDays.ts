import { calculateDaysBetween } from "./calculateDaysBetween";

interface DaysBetween {
  bn: string;
  en: number;
}

export const getTotalAbsentDays = <
  T extends { start_date: string; end_date?: string },
>(
  absences: T[],
): DaysBetween => {
  if (!absences || absences.length === 0) {
    return { bn: "০", en: 0 };
  }

  const total = absences.reduce((sum, absence) => {
    const days = calculateDaysBetween(absence.start_date, absence.end_date);
    return sum + days.en;
  }, 0);

  return {
    bn: total
      .toString()
      .replace(
        /\d/g,
        (d) => ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"][parseInt(d)],
      ),
    en: total,
  };
};
