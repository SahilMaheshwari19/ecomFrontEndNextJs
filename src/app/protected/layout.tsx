// src/app/(protected)/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { decodeToken } from "react-jwt"; // or your JWT decoder

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      const decoded = decodeToken(token);
      if (!decoded) {
        router.push("/login");
      }
    }
  }, [token, router]);

  return (
    <>
      <Navbar />
      <Toaster />
      {children}
    </>
  );
}
