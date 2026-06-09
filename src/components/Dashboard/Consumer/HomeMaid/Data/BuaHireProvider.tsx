"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { BuaHireRequest, mockMonthlyPayments, mockRequests, MonthlyPayment } from "./MockData";

interface BuaHireContextType {
  requests: BuaHireRequest[];
  monthlyPayments: MonthlyPayment[];
  addRequest: (request: Omit<BuaHireRequest, "id" | "createdAt">) => string;
  updateRequest: (id: string, updates: Partial<BuaHireRequest>) => void;
  addMonthlyPayment: (payment: Omit<MonthlyPayment, "id">) => void;
  payInstallment: (requestId: string, installmentId: string) => void;
  payMonthly: (paymentId: string) => void;
  getActiveRequest: () => BuaHireRequest | undefined;
}

const BuaHireContext = createContext<BuaHireContextType | null>(null);

export function BuaHireProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<BuaHireRequest[]>(mockRequests);
  const [monthlyPayments, setMonthlyPayments] =
    useState<MonthlyPayment[]>(mockMonthlyPayments);

  const addRequest = (request: Omit<BuaHireRequest, "id" | "createdAt">) => {
    const id = `req-${Date.now()}`;
    setRequests((prev) => [
      ...prev,
      { ...request, id, createdAt: new Date().toISOString() },
    ]);
    return id;
  };

  const updateRequest = (id: string, updates: Partial<BuaHireRequest>) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    );
  };

  const addMonthlyPayment = (payment: Omit<MonthlyPayment, "id">) => {
    setMonthlyPayments((prev) => [
      ...prev,
      { ...payment, id: `mp-${Date.now()}` },
    ]);
  };

  const payInstallment = (requestId: string, installmentId: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          advancePayment: {
            ...req.advancePayment,
            installments: req.advancePayment.installments.map((inst) =>
              inst.id === installmentId
                ? {
                    ...inst,
                    status: "paid",
                    paidDate: new Date().toISOString().split("T")[0],
                  }
                : inst,
            ),
          },
        };
      }),
    );
  };

  const payMonthly = (paymentId: string) => {
    setMonthlyPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? {
              ...p,
              status: "paid",
              paidDate: new Date().toISOString().split("T")[0],
            }
          : p,
      ),
    );
  };

  const getActiveRequest = () =>
    requests.find((r) => r.status === "assigned" || r.status === "active");

  return (
    <BuaHireContext.Provider
      value={{
        requests,
        monthlyPayments,
        addRequest,
        updateRequest,
        addMonthlyPayment,
        payInstallment,
        payMonthly,
        getActiveRequest,
      }}
    >
      {children}
    </BuaHireContext.Provider>
  );
}

export function useBuaHire() {
  const ctx = useContext(BuaHireContext);
  if (!ctx) {
    throw new Error("useBuaHire must be used inside BuaHireProvider");
  }
  return ctx;
}
