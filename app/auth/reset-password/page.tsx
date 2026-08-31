'use client';
import { Suspense } from "react";
import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm";
import StretchBarLoader from "@/components/ui/StretchBarLoader";

export default function page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[300px]">
        <StretchBarLoader width={140} label="Loading" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
