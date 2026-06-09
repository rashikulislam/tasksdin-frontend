"use client";
import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "../ThemeProvider/theme-provider";
import { AlertProvider } from "../Reusable/AlertModal";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AlertProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AlertProvider>
    </Provider>
  );
};

export default Providers;
