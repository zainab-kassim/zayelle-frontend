'use client';
import { Suspense } from 'react'
import SignUpForm from '@/components/forms/auth/SignupForm'
import PageLoader from '@/components/ui/PageLoader'

export default function page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[300px]">
        <PageLoader label="Loading signup" />
      </div>
    }>
      <SignUpForm />
    </Suspense>
  )
}
