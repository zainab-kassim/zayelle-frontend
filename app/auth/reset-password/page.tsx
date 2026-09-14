'use client';
import { Suspense } from "react";
import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm";
import PageLoader from "@/components/ui/PageLoader";

export default function page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[300px]">
        <PageLoader label="Loading" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
