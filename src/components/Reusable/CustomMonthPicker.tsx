import { Calendar } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const monthOptions = [
  { bn: "জানুয়ারি", en: "Jan" },
  { bn: "ফেব্রুয়ারি", en: "Feb" },
  { bn: "মার্চ", en: "Mar" },
  { bn: "এপ্রিল", en: "Apr" },
  { bn: "মে", en: "May" },
  { bn: "জুন", en: "Jun" },
  { bn: "জুলাই", en: "Jul" },
  { bn: "অগাস্ট", en: "Aug" },
  { bn: "সেপ্টেম্বর", en: "Sep" },
  { bn: "অক্টোবর", en: "Oct" },
  { bn: "নভেম্বর", en: "Nov" },
  { bn: "ডিসেম্বর", en: "Dec" },
];

interface CustomMonthPickerProps {
  value?: string;
  setMonth: (value: string) => void;
  locale?: "bn" | "en";
  minYear?: number;
}

const CustomMonthPicker: React.FC<CustomMonthPickerProps> = ({
  value,
  setMonth,
  locale = "en",
  minYear = 2000,
}) => {
  const today = new Date();
  const initialDate = value ? new Date(`${value}-01`) : today;

  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [showYear, setShowYear] = useState(selectedYear);
  const [open, setOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (monthIndex: number) => {
    const maxMonth =
      selectedYear === today.getFullYear() ? today.getMonth() : monthIndex;
    const finalMonth = Math.min(monthIndex, maxMonth);

    const backendValue = `${selectedYear}-${String(finalMonth + 1).padStart(2, "0")}`;
    setSelectedMonth(finalMonth);
    setMonth(backendValue);
    setShowYear(selectedYear);
    setOpen(false);
  };

  const handlePrevYear = () => {
    if (selectedYear > minYear) setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    if (selectedYear < today.getFullYear()) setSelectedYear(selectedYear + 1);
  };

  return (
    <div className="relative max-w-sm font-sans" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border px-5 py-2  w-[280px] flex items-center justify-between rounded-sm"
      >
        <span className="font-medium  text-gray-800">
          {monthOptions[selectedMonth][locale]} - {showYear}
        </span>
        <Calendar size={20} />
      </button>

      {open && (
        <div className="absolute z-30 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4 animate-dropdown">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handlePrevYear}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              ←
            </button>
            <span className="text-gray-700 font-semibold text-lg">
              {selectedYear}
            </span>
            <button
              type="button"
              onClick={handleNextYear}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              →
            </button>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            {monthOptions.map((month, idx) => {
              const isDisabled =
                selectedYear === today.getFullYear() && idx > today.getMonth();
              const isCurrentMonth =
                today.getFullYear() === selectedYear &&
                today.getMonth() === idx;

              return (
                <button
                  key={month.en}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  disabled={isDisabled}
                  className={` uppercase
    px-3 py-3 text-[14px] rounded-lg font-semibold transition
    ${
      isDisabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : idx === selectedMonth
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100 text-gray-800 hover:bg-blue-100"
    }
    ${isCurrentMonth ? "border border-blue-400" : ""}
  `}
                >
                  {month[locale]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes dropdown {
            0% { opacity: 0; transform: translateY(-5px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-dropdown {
            animation: dropdown 0.25s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default CustomMonthPicker;
