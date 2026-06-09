"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type FC,
} from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

// --- Types ---
type AlertType = "success" | "warning" | "error";

interface AlertProps {
  type: AlertType;
  title: string;
  description?: string;
}

interface ConfirmProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface AlertContextType {
  showAlert: (alert: AlertProps) => void;
  hideAlert: () => void;
  showConfirm: (confirm: ConfirmProps) => void;
  hideConfirm: () => void;
}

// --- Context ---
const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [confirm, setConfirm] = useState<ConfirmProps | null>(null);

  return (
    <AlertContext.Provider
      value={{
        showAlert: setAlert,
        hideAlert: () => setAlert(null),
        showConfirm: setConfirm,
        hideConfirm: () => setConfirm(null),
      }}
    >
      {children}
      {alert && <GlobalAlert alert={alert} onClose={() => setAlert(null)} />}
      {confirm && (
        <ConfirmModal confirm={confirm} onClose={() => setConfirm(null)} />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};

// --- Shared Modal Wrapper ---
const ModalWrapper: FC<{
  children: ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl
                   p-8 relative animate-[fadeScale_.25s_ease-out]"
      >
        {children}
      </div>
    </div>
  );
};

// --- Global Alert ---
const GlobalAlert: FC<{ alert: AlertProps; onClose: () => void }> = ({
  alert,
  onClose,
}) => {
  const iconMap = {
    success: <FaCheckCircle className="text-green-600 w-14 h-14" />,
    warning: <FaExclamationTriangle className="text-yellow-500 w-14 h-14" />,
    error: <FaTimesCircle className="text-red-600 w-14 h-14" />,
  };

  return (
    <ModalWrapper onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600  cursor-pointer"
      >
        <FaXmark size={22} />
      </button>

      <div className="flex flex-col items-center gap-4 text-center">
        {iconMap[alert.type]}
        <h2 className="text-lg font-semibold text-gray-900">{alert.title}</h2>
        {alert.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {alert.description}
          </p>
        )}
      </div>
    </ModalWrapper>
  );
};

// --- Confirm Modal ---
const ConfirmModal: FC<{
  confirm: ConfirmProps;
  onClose: () => void;
}> = ({ confirm, onClose }) => {
  const confirmAction = () => {
    confirm.onConfirm();
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-semibold text-gray-900 text-center">
        {confirm.title}
      </h2>

      {confirm.description && (
        <p className="mt-3 text-sm text-gray-600 text-center">
          {confirm.description}
        </p>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-gray-100
                     text-gray-700 hover:bg-gray-200 transition cursor-pointer"
        >
          {confirm.cancelText || "Cancel"}
        </button>

        <button
          onClick={confirmAction}
          className="px-5 py-2 rounded-lg bg-[#2B2B51]
                     text-white hover:bg-[#0E1E32] transition cursor-pointer"
        >
          {confirm.confirmText || "Confirm"}
        </button>
      </div>
    </ModalWrapper>
  );
};
// showConfirm({
//       title: "আপনি কি নিশ্চিত?",
//       description: "এই অ্যাকশনটি ফিরে নেওয়া যাবে না।",
//       confirmText: "হ্যাঁ, ডিলেট করো",
//       cancelText: "বাতিল",
//       onConfirm: async () => {
//         try {
//           // if (result?.success) {
//           //   return showAlert({
//           //     type: "success",
//           //     title: "অ্যাকাউন্ট সফলভাবে ডিলেট হয়েছে!",
//           //   });
//           // }
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//           return showAlert({
//             type: "error",
//             title: error?.data?.message || "দুঃখিত সার্ভারে ত্রুটি হয়েছে",
//           });
//         }
//       },
//     });
