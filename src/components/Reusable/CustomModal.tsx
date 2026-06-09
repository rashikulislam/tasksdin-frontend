import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalWidth = "sm" | "md" | "lg" | "xl" | "full";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: ModalWidth;
};

const widthClasses: Record<ModalWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-5xl",
};

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  width = "md",
}: CustomModalProps) => {
  // 🔒 body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-2">
      {/* Modal Wrapper */}
      <div
        className={`
          w-full ${widthClasses[width]}
          bg-white dark:bg-gray-900
          rounded-lg shadow-xl
          max-h-[90vh]
          overflow-hidden
          relative
        `}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 bg-white dark:bg-gray-900 rounded-t-lg">
          <h2 className="text-xl font-semibold tracking-tight text-gray-600 dark:text-gray-100">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-xl hover:opacity-70"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Body (scroll here) */}
        <div className="p-2 max-h-[calc(80vh-56px)] lg:max-h-[calc(90vh-56px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomModal;
