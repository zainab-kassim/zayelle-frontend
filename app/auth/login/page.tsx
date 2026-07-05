'use client';
import LoginForm from "@/components/forms/auth/LoginForm";
import {Suspense, useEffect } from "react";
import { toast } from "sonner";

export default function page() {
  useEffect(() => {
    // In your Login.tsx useEffect
    if (window.location.search.includes('session=expired')) {
      toast.error('Session timed out. Please login again.');
    }
  }, []);

  return (
   <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>

  )
}
