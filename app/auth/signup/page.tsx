'use client';
import { Suspense } from 'react'
import SignUpForm from '@/components/forms/auth/SignupForm'
import StretchBarLoader from '@/components/ui/StretchBarLoader'

export default function page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[300px]">
        <StretchBarLoader width={140} label="Loading signup" />
      </div>
    }>
      <SignUpForm />
    </Suspense>
  )
}
