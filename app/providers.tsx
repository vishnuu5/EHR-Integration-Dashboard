"use client";

import type React from "react";
import { AuthProvider } from "@/lib/auth/auth-context";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
