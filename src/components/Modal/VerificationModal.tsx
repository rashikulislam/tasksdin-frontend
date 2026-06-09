import { useEffect } from "react";
import Link from "next/link";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose} // close on outside click
      />

      {/* Modal Card */}
      <div className="relative z-10 max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in scale-in duration-300">
        {/* Top Accent */}
        <div className="h-1 bg-gradient-to-r from-red-500 to-rose-600" />

        <div className="p-6 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Text */}
          <h3 className="text-xl font-semibold text-red-900 mb-2">
            অ্যাকাউন্ট যাচাই করুন
          </h3>
          <p className="text-red-700 text-sm md:text-base leading-relaxed">
            আপনার অ্যাকাউন্ট এখনো যাচাই করা হয়নি। সম্পূর্ণ সুবিধা পেতে দয়া করে
            যাচাই করুন।
          </p>

          {/* Action Button */}
          <Link href="/dashboard/general-provider/verification">
            <button className="mt-6 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md transition-transform transform hover:scale-105 active:scale-95">
              এখনই যাচাই করুন
            </button>
          </Link>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
