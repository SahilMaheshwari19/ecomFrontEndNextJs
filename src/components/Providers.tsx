"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <Navbar />
        {children}
        <Toaster richColors position="top-center" />
      </Provider>
    </ThemeProvider>
  );
}
