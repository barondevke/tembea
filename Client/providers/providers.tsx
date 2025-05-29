// components/Providers.jsx
"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ChildrenType } from "@/types/types";
import { AuthProvider } from "@/components/auth-provider";
import ReduxProvider from "./redux-provider";

export function Providers({ children }: ChildrenType) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Provider store={store}>
          <ReduxProvider>{children}</ReduxProvider>
        </Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}