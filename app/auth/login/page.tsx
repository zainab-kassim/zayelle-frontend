'use client';
import LoginForm from "@/components/forms/auth/LoginForm";
import {Suspense, useEffect } from "react";
import { toast } from "sonner";
import PageLoader from "@/components/ui/PageLoader";

export default function page() {
  useEffect(() => {
    if (window.location.search.includes('session=expired')) {
      toast.error('Session timed out. Please login again.');
    }
  }, []);

  return (
   <Suspense fallback={
      <div className="flex items-center justify-center min-h-[300px]">
        <PageLoader label="Loading login" />
      </div>
    }>
      <LoginForm />
    </Suspense>

  )
}
