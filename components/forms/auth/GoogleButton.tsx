'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInWithGoogle } from '@/services/auth.service';

// Google Identity Services attaches itself to window.google once the
// gsi/client script loads; it ships no types.
declare global {
  interface Window {
    google?: any;
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const initGoogle = () => {
    // bail until the script has loaded and the target div is mounted
    if (initialized.current || !window.google || !buttonRef.current) return;

    if (!CLIENT_ID) {
      console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: async ({ credential }: { credential: string }) => {
        try {
          const res = await signInWithGoogle(credential);
          localStorage.setItem('fullName', res.user.fullName);
          localStorage.setItem('email', res.user.email);
          toast.success(`Welcome, ${res.user.fullName}!`);
          router.push('/');
        } catch {
          toast.error('Google sign-in failed. Please try again.');
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
      width: 320,
    });

    initialized.current = true;
  };

  // covers the case where the script was already cached and onLoad won't fire
  useEffect(() => {
    initGoogle();
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initGoogle}
      />
      <div ref={buttonRef} className="flex justify-center" />
    </>
  );
}
